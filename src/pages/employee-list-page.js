import { LitElement, html, css } from 'lit';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import '../components/i18n-text.js';
import '../components/employee-list.js';

export class EmployeeListPage extends connect(store)(LitElement) {
  static styles = css`
    :host {
      display: block;
      margin: 0 auto;
      padding: 1rem;
    }
    
    .page-title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
  `;

  render() {
    return html`
      <ing-employee-list></ing-employee-list>
    `;
  }
}

customElements.define('ing-employee-list-page', EmployeeListPage); 