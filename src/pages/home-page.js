import { LitElement, html, css } from 'lit';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import '../components/employee-list.js';
import '../components/common/index.js';
import '../components/i18n-text.js';

export class HomePage extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    .welcome-banner {
      margin-bottom: 2rem;
      background-color: var(--primary-color, #ff6200);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 300;
    }

    p {
      font-size: 1.1rem;
      margin-top: 1rem;
      margin-bottom: 0;
      opacity: 0.9;
    }

    .employee-list-container {
      margin-top: 1rem;
    }
  `;

  render() {
    return html`
      <div class="home-page">
        <div class="welcome-banner">
          <h1><i18n-text key="welcomeToEMS"></i18n-text></h1>
          <p><i18n-text key="manageEmployeesText"></i18n-text></p>
        </div>
        
        <div class="employee-list-container">
          <ing-employee-list></ing-employee-list>
        </div>
      </div>
    `;
  }
}

customElements.define('ing-home-page', HomePage); 