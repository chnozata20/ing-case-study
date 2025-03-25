import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import '../pages/employee-list-page.js';
import '../pages/employee-form-page.js';
import '../pages/not-found-page.js';

// Ortak bileşenleri import et
import './common/index.js';

export class RouterOutlet extends LitElement {
  static properties = {
    router: { type: Object }
  };

  constructor() {
    super();
    this.router = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.router = new Router(this);
    this.router.setRoutes([
      {
        path: '/',
        component: 'ing-employee-list-page',
        action: () => {
          document.title = 'Çalışan Listesi - Çalışan Yönetim Sistemi';
        }
      },
      {
        path: '/add',
        component: 'ing-employee-form-page',
        action: () => {
          document.title = 'Yeni Çalışan Ekle - Çalışan Yönetim Sistemi';
        }
      },
      {
        path: '/edit/:id',
        component: 'ing-employee-form-page',
        action: (context) => {
          document.title = 'Çalışan Düzenle - Çalışan Yönetim Sistemi';
          return context;
        }
      },
      {
        path: '(.*)',
        component: 'ing-not-found-page',
        action: () => {
          document.title = 'Sayfa Bulunamadı - Çalışan Yönetim Sistemi';
        }
      }
    ]);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('ing-router-outlet', RouterOutlet); 