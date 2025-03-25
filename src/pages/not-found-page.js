import { LitElement, html, css } from 'lit';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import '../components/i18n-text.js';

export class NotFoundPage extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .not-found-container {
      padding: 3rem;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 5rem;
      margin: 0;
      color: var(--primary-color, #ff6200);
      font-weight: 700;
    }

    h2 {
      font-size: 2rem;
      margin-top: 1rem;
      margin-bottom: 2rem;
      color: #333;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: #666;
    }

    .home-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: var(--primary-color, #ff6200);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      transition: background-color 0.2s;
    }

    .home-button:hover {
      background-color: #e55a00;
    }
  `;

  render() {
    return html`
      <div class="not-found-container">
        <h1>404</h1>
        <h2><i18n-text key="pageNotFound"></i18n-text></h2>
        <p><i18n-text key="pageNotFoundText"></i18n-text></p>
        <a href="/" class="home-button"><i18n-text key="goToHome"></i18n-text></a>
      </div>
    `;
  }
}

customElements.define('ing-not-found-page', NotFoundPage); 