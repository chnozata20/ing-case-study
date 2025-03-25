import { LitElement, html, css } from 'lit';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import '../components/employee-form.js';
import '../components/i18n-text.js';

export class EmployeeFormPage extends connect(store)(LitElement) {
  static get properties() {
    return {
      id: { type: String },
      isEditMode: { type: Boolean },
      location: { type: Object }
    };
  }
  
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
    }

    .page-header {
      margin-bottom: 1.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      font-size: 1.8rem;
      margin: 0;
      color: var(--primary-color, #FF6600);
      font-weight: 700;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      margin-bottom: 1.25rem;
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .back-link:hover {
      color: var(--primary-color, #FF6600);
      background-color: rgba(255, 102, 0, 0.05);
    }

    svg {
      margin-right: 0.5rem;
      width: 16px;
      height: 16px;
    }
    
    .form-container {
      background: white;
      border-radius: 8px;
      padding: 2.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .form-container {
        padding: 1.5rem 1.25rem;
      }
    }
  `;

  constructor() {
    super();
    this.id = null;
    this.isEditMode = false;
    this.location = null;
  }

  connectedCallback() {
    super.connectedCallback();
    
    // URL parametrelerinden id'yi al
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    
    // /edit/1 şeklindeki URL için
    if (pathSegments.length > 2 && pathSegments[1] === 'edit') {
      this.id = pathSegments[2];
      this.isEditMode = true;
    }
  }

  stateChanged(state) {
    // Locale değişikliğini takip etmeye gerek yok, sayfa zaten yenilenecek
  }

  render() {
    return html`
      <div class="employee-form-page">
        <a href="/" class="back-link">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <i18n-text key="backToEmployees"></i18n-text>
        </a>
        
        <div class="page-header">
          <h1>
            ${this.isEditMode 
              ? html`<i18n-text key="editEmployee"></i18n-text>` 
              : html`<i18n-text key="addNewEmployee"></i18n-text>`}
          </h1>
        </div>
        
        <div class="form-container">
          <ing-employee-form .id=${this.id}></ing-employee-form>
        </div>
      </div>
    `;
  }
}

customElements.define('ing-employee-form-page', EmployeeFormPage); 