import { LitElement, html, css } from 'lit';
import { store } from './store/store.js';
import { connect } from './store/redux-mixin.js';
import './index.css';

// Router ve navbar
import './components/router-outlet.js';
import './components/navbar.js';

// Ortak bileşenleri yüklüyoruz
import './components/common/index.js';

// Sayfaları önceden yüklüyoruz
import './pages/home-page.js';
import './pages/employee-list-page.js';
import './pages/employee-form-page.js';
import './pages/not-found-page.js';

// Bileşenler
import './components/employee-list.js';
import './components/employee-form.js';
import './components/i18n-text.js';

export class App extends connect(store)(LitElement) {
  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 100%;
      margin: 0 auto;
      background-color: #F5F5F5;
    }

    main {
      flex-grow: 1;
      width: 100%;
    }
  `;

  render() {
    return html`
      <ing-navbar></ing-navbar>
      <main>
        <ing-router-outlet></ing-router-outlet>
      </main>
    `;
  }
}

customElements.define('ing-app', App); 