import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import '../components/i18n-text.js';
import '../components/language-selector.js';

export class Navbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      currentRoute: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1.5rem;
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        background-color: white;
        border-bottom: 1px solid #EAEAEA;
      }

      .navbar-left {
        display: flex;
        align-items: center;
        min-width: 0;
      } 

      .brand-container {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .logo {
        height: 45px;
        width: auto;
        flex-shrink: 0;
      }

      .brand-titles {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
      }

      .brand-title {
        font-size: 1.1rem;
        font-weight: var(--font-weight-bold, 700);
        color: #000;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .navbar-right {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .employees-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        color: var(--primary-color, #FF6600);
        font-size: var(--font-size-button, 14px);
        font-weight: var(--font-weight-medium, 500);
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.2s;
        cursor: pointer;
        background-color: white;
        border: 1px solid transparent;
        white-space: nowrap;
      }

      .employees-btn:hover {
        background-color: rgba(255, 102, 0, 0.08);
      }

      .add-new-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background-color: white;
        color: var(--primary-color, #FF6600);
        cursor: pointer;
        font-size: var(--font-size-button, 14px);
        font-weight: var(--font-weight-medium, 500);
        transition: all 0.2s;
        white-space: nowrap;
        opacity: 0.5;
        border: none;
      }

      .add-new-btn:hover {
        background-color: rgba(255, 102, 0, 0.08);
        border-color: rgba(255, 102, 0, 0.2);
        opacity: 1;
      }
      
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: var(--primary-color, #FF6600);
      }
      
      .fa, .fas, .fa-solid, .far, .fa-regular {
        font-size: 16px;
      }
      
      .add-new-btn .icon {
        color: var(--primary-color, #FF6600);
        opacity: 0.85;
      }
      
      .add-new-btn:hover .icon {
        opacity: 1;
      }
      
      @media (max-width: 768px) {
        .navbar {
          padding: 0.75rem 1rem;
        }
        
        .navbar-right {
          gap: 0.5rem;
        }
      }

      @media (max-width: 600px) {
        .employees-btn .text {
          display: none;
        }

        .employees-btn {
          padding: 0.5rem;
        }
        
        .add-new-btn .text {
          display: none;
        }
        
        .add-new-btn {
          padding: 0.5rem;
        }
      }

      @media (max-width: 400px) {
        .brand-title {
          font-size: 0.95rem;
        }
        
        .logo {
          height: 24px;
        }
      }
    `;
  }

  constructor() {
    super();
    this.currentRoute = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('vaadin-router-location-changed', () => {
      this.currentRoute = window.location.pathname;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('vaadin-router-location-changed', () => {
      this.currentRoute = window.location.pathname;
    });
  }

  _navigate(path, e) {
    e.preventDefault();
    Router.go(path);
  }

  render() {
    return html`
      <div class="navbar">
        <div class="navbar-left">
          <div class="brand-container">
            <img src="https://cdn.brandfetch.io/idNsVA30h5/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B" alt="ING Logo" class="logo">
            <div class="brand-titles">
              <span class="brand-title">ING</span>
            </div>
          </div>
        </div>
        
        <div class="navbar-right">
          <a 
            href="/" 
            class="employees-btn ${this.currentRoute === '/' ? 'active' : ''}"
            @click="${(e) => this._navigate('/', e)}"
            title="Employees"
          >
            <span class="icon">
              <svg viewBox="0 0 640 512" width="16" height="16" fill="currentColor">
                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352h117.4c73.6 0 133.3 59.7 133.3 133.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
              </svg>
            </span>
            <span class="text"><i18n-text key="employees"></i18n-text></span>
          </a>
          
          <button class="add-new-btn" @click="${() => Router.go('/add')}" title="Add New">
            <span class="icon">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
              </svg>
            </span>
            <span class="text"><i18n-text key="addNew"></i18n-text></span>
          </button>
          
          <ing-language-selector compact></ing-language-selector>
        </div>
      </div>
    `;
  }
}

customElements.define('ing-navbar', Navbar); 