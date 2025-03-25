import { LitElement, html, css } from 'lit';
import { tableStyles } from '../styles/table-styles.js';
import { ViewBaseMixin } from '../mixins/view-base-mixin.js';
import '../../../components/i18n-text.js';
import '../../../components/common/action-button.js';
import '../../../components/common/button.js';
import '../../../components/common/pagination.js';
import '../../../components/common/select-field.js';

// LitElement ile ViewBaseMixin'i birleştirerek tablo bileşenini oluşturuyoruz
export class EmployeeTableView extends ViewBaseMixin(LitElement) {
  static styles = tableStyles;

  // LitElement kullanırken html fonksiyonunu mixin içinde kullanabilmek için constructor'da atama yapıyoruz
  constructor() {
    super();
    this.html = html; // html fonksiyonunu mixin'e sağla
  }

  render() {
    // Tablo sütun tanımları
    const tableHeaders = [
      { id: 'select', label: html``, class: 'col-select' },
      { id: 'firstName', label: html`<i18n-text key="firstName"></i18n-text>`, class: 'col-firstName' },
      { id: 'lastName', label: html`<i18n-text key="lastName"></i18n-text>`, class: 'col-lastName' },
      { id: 'startDate', label: html`<i18n-text key="startDate"></i18n-text>`, class: 'col-startDate' },
      { id: 'birthDate', label: html`<i18n-text key="birthDate"></i18n-text>`, class: 'col-birthDate' },
      { id: 'phone', label: html`<i18n-text key="phone"></i18n-text>`, class: 'col-phone' },
      { id: 'email', label: html`<i18n-text key="email"></i18n-text>`, class: 'col-email' },
      { id: 'department', label: html`<i18n-text key="department"></i18n-text>`, class: 'col-department' },
      { id: 'position', label: html`<i18n-text key="position"></i18n-text>`, class: 'col-position' },
      { id: 'actions', label: html`<i18n-text key="actions"></i18n-text>`, class: 'col-actions' }
    ];
    
    // Özel hücre render fonksiyonları
    const customRenderers = {
      select: () => {
        return html`<div class="checkbox-cell"><input type="checkbox" /></div>`;
      },
      startDate: (employee) => {
        const date = new Date(employee.startDate);
        return html`<span style="font-size: var(--font-size-secondary, 12px); color: var(--text-color-light, #999999);">${date.toLocaleDateString()}</span>`;
      },
      birthDate: (employee) => {
        const date = new Date(employee.birthDate);
        return html`<span style="font-size: var(--font-size-secondary, 12px); color: var(--text-color-light, #999999);">${date.toLocaleDateString()}</span>`;
      },
      lastName: (employee) => {
        return html`<strong style="font-weight: var(--font-weight-bold, 700);">${employee.lastName}</strong>`;
      },
      email: (employee) => {
        return html`<span style="font-size: var(--font-size-secondary, 12px); color: var(--text-color-light, #999999);">${employee.email}</span>`;
      },
      phone: (employee) => {
        return html`<span style="font-size: var(--font-size-secondary, 12px); color: var(--text-color-light, #999999);">${employee.phone}</span>`;
      },
      actions: (employee) => {
        return html`
          <div class="row-actions">
            <ing-action-button
              type="edit"
              size="small"
              @click="${() => this._handleEditEmployee(employee)}"
              .icon=${html`
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              `}
            ></ing-action-button>
            
            <ing-action-button
              type="delete"
              size="small"
              @click="${() => this._handleDeleteEmployee(employee)}"
              .icon=${html`
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              `}
            ></ing-action-button>
          </div>
        `;
      }
    };

    if (this.employees.length === 0) {
      return html`
        <div class="data-table-wrapper">
          ${this._renderEmptyState()}
        </div>
      `;
    }
    
    return html`
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead class="data-table-header">
            <tr>
              ${tableHeaders.map(header => html`<th class="${header.class || ''}">${header.label}</th>`)}
            </tr>
          </thead>
          <tbody class="data-table-body">
            ${this.employees.map(employee => html`
              <tr>
                ${tableHeaders.map(header => {
                  const renderer = customRenderers[header.id];
                  if (renderer) {
                    return html`<td class="${header.class || ''}">${renderer(employee)}</td>`;
                  } else {
                    return html`<td class="${header.class || ''}">${employee[header.id] || '-'}</td>`;
                  }
                })}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
      
      ${this._renderPagination()}
    `;
  }
}

customElements.define('ing-employee-table-view', EmployeeTableView); 