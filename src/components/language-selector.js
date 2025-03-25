import { LitElement, html, css } from 'lit';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import { setLocale } from '../store/slices/localeSlice.js';

export class LanguageSelector extends connect(store)(LitElement) {
  static get properties() {
    return {
      locale: { type: String },
      isOpen: { type: Boolean },
      compact: { type: Boolean, reflect: true },
    };
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .language-container {
      position: relative;
    }

    .language-button {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 4px;
      transition: background-color 0.2s;
      font-size: 0.9rem;
      gap: 0.5rem;
    }
    
    .language-button:hover {
      background-color: #f2f2f2;
    }
    
    .flag {
      font-size: 1.2rem;
    }
    
    .arrow {
      font-size: 0.7rem;
      margin-left: 0.25rem;
      color: #666;
    }
    
    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      min-width: 150px;
      box-shadow: 0 3px 8px rgba(0,0,0,0.15);
      border-radius: 4px;
      margin-top: 0.5rem;
      z-index: 100;
      display: none;
    }
    
    .dropdown.open {
      display: block;
      animation: fadeIn 0.2s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .dropdown-item {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      cursor: pointer;
      transition: background-color 0.2s;
      gap: 0.5rem;
      font-size: var(--font-size-icon);
    }
    
    .dropdown-item:hover {
      background-color: #f5f5f5;
    }
    
    .dropdown-item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    .dropdown-item:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    
    /* Compact mod için stiller */
    :host([compact]) .language-button {
      padding: 6px;
    }
    
    :host([compact]) .language-button span:not(.flag) {
      display: none;
    }
  `;

  constructor() {
    super();
    this.locale = localStorage.getItem('locale') || 'en';
    this.isOpen = false;
    this.compact = false;
  }
  
  connectedCallback() {
    super.connectedCallback();
    // Dışarı tıklandığında menüyü kapat
    this._clickOutsideHandler = this._handleClickOutside.bind(this);
    document.addEventListener('click', this._clickOutsideHandler);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._clickOutsideHandler);
  }
  
  stateChanged(state) {
    if (state.locale && state.locale.locale !== this.locale) {
      this.locale = state.locale.locale;
    }
  }
  
  _toggleDropdown(e) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  
  _selectLanguage(locale, e) {
    e.stopPropagation();
    
    if (locale !== this.locale) {
      // localStorage'a dil ayarını kaydet
      localStorage.setItem('locale', locale);
      // Redux store'u güncelle
      store.dispatch(setLocale(locale));
      // HTML lang attribute'unu ayarla
      document.documentElement.lang = locale;
    }
    
    this.isOpen = false;
  }
  
  _handleClickOutside(e) {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.isOpen = false;
    }
  }

  render() {
    // Dil bayrak ve isim eşleştirmeleri
    const localeOptions = {
      'en': {flag: '🇬🇧', name: 'English'},
      'tr': {flag: '🇹🇷', name: 'Türkçe'},
    };
    
    const currentOption = localeOptions[this.locale] || localeOptions.en;
    
    return html`
      <div class="language-container">
        <button class="language-button" @click="${this._toggleDropdown}">
          <span class="flag">${currentOption.flag}</span>
          <span>${currentOption.name}</span>
          <span class="arrow">▼</span>
        </button>
        
        <div class="dropdown ${this.isOpen ? 'open' : ''}">
          ${Object.entries(localeOptions).map(([code, option]) => 
            html`
              <div 
                class="dropdown-item" 
                @click="${(e) => this._selectLanguage(code, e)}"
              >
                <span class="flag">${option.flag}</span>
                <span>${option.name}</span>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define('ing-language-selector', LanguageSelector); 