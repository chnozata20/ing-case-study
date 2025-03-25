import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';
import { translate } from '../../translations/index.js';
import '../../components/i18n-text.js';

export class FormField extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    type: { type: String }, // text, email, password, tel, date, number, select
    placeholder: { type: String },
    required: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    pattern: { type: String },
    minlength: { type: Number },
    maxlength: { type: Number },
    min: { type: String },
    max: { type: String },
    step: { type: String },
    error: { type: String },
    options: { type: Array } // select için options: [{ value: '1', label: 'Option 1' }]
  };

  static styles = css`
    :host {
      display: block;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    label {
      color: #333;
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    input, select, textarea {
      padding: 0.85rem 1rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      color: #333;
      background: white;
      transition: all 0.2s;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary-color, #FF6600);
      box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
    }

    input:hover, select:hover, textarea:hover {
      border-color: #bbb;
    }

    input:disabled, select:disabled, textarea:disabled {
      background-color: #f9f9f9;
      cursor: not-allowed;
      opacity: 0.7;
    }

    input.error, select.error, textarea.error {
      border-color: #dc3545;
    }

    input.error:focus, select.error:focus, textarea.error:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .error-message {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 0.35rem;
      font-weight: 500;
    }

    /* Webkit için tarih giriş alanı stilini düzeltme */
    input[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    input[type="date"]::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }

    /* Firefox için zorunlu alan yıldız stilini gizleme */
    input:required {
      box-shadow: none;
    }

    /* Select field styling */
    select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px;
      padding-right: 2.5rem;
    }

    select:focus {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FF6600' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    }
  `;

  constructor() {
    super();
    this.label = '';
    this.name = '';
    this.value = '';
    this.type = 'text';
    this.placeholder = '';
    this.required = false;
    this.disabled = false;
    this.readonly = false;
    this.pattern = '';
    this.minlength = null;
    this.maxlength = null;
    this.min = '';
    this.max = '';
    this.step = '';
    this.error = '';
    this.options = [];
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: true,
      composed: true
    }));
  }

  _handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: true,
      composed: true
    }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('blur', {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: true,
      composed: true
    }));
  }

  // Çeviri fonksiyonu
  _t(key) {
    return translate(key);
  }

  render() {
    return html`
      <div class="form-field">
        ${this.label ? html`<label for="${this.name}">
          ${this.isI18nKey(this.label) 
            ? html`<i18n-text key="${this.label}"></i18n-text>` 
            : this.label}${this.required ? ' *' : ''}
        </label>` : ''}
        
        ${this.type === 'select' 
          ? html`
            <select
              id="${this.name}"
              name="${this.name}"
              .value="${this.value}"
              ?required="${this.required}"
              ?disabled="${this.disabled}"
              class="${this.error ? 'error' : ''}"
              @change="${this._handleChange}"
              @blur="${this._handleBlur}"
            >
              <option value="" disabled selected>
                ${this.isI18nKey(this.placeholder) ? this._t(this.placeholder) : (this.placeholder || 'Seçiniz...')}
              </option>
              ${this.options.map(option => html`
                <option value="${option.value}" ?selected=${this.value === option.value}>
                  ${this.isI18nKey(option.label) ? this._t(option.label) : option.label}
                </option>
              `)}
            </select>
          `
          : html`
            <input
              id="${this.name}"
              name="${this.name}"
              type="${this.type}"
              .value="${this.value}"
              placeholder="${this.isI18nKey(this.placeholder) ? this._t(this.placeholder) : this.placeholder}"
              ?required="${this.required}"
              ?disabled="${this.disabled}"
              ?readonly="${this.readonly}"
              pattern="${this.pattern}"
              minlength="${this.minlength !== null ? this.minlength : ''}"
              maxlength="${this.maxlength !== null ? this.maxlength : ''}"
              min="${this.min}"
              max="${this.max}"
              step="${this.step}"
              class="${this.error ? 'error' : ''}"
              @input="${this._handleInput}"
              @change="${this._handleChange}"
              @blur="${this._handleBlur}"
            />
          `
        }
        
        ${this.error ? html`<div class="error-message">
          ${this.isI18nKey(this.error) 
            ? html`<i18n-text key="${this.error}"></i18n-text>` 
            : this.error}
        </div>` : ''}
        <slot></slot>
      </div>
    `;
  }

  isI18nKey(text) {
    // Çeviri anahtarı olup olmadığını kontrol et
    // Eğer metin bir anahtara benziyorsa (içinde boşluk yoksa ve özel karakter içermiyorsa)
    // ve 50 karakterden kısaysa, çeviri anahtarı olarak kabul et
    return typeof text === 'string' && 
           text.length <= 50 && 
           !/\s/.test(text) && 
           /^[a-zA-Z0-9_]+$/.test(text);
  }
}

customElements.define('ing-form-field', FormField); 