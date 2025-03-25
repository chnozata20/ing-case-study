import { LitElement, html, css } from 'lit';
import { gridStyles } from '../styles/grid-styles.js';
import { ViewBaseMixin } from '../mixins/view-base-mixin.js';
import '../../../components/i18n-text.js';
import '../../../components/common/action-button.js';
import '../../../components/common/button.js';
import '../../../components/common/pagination.js';
import '../../../components/common/select-field.js';

export class EmployeeGridView extends ViewBaseMixin(LitElement) {
  static styles = gridStyles;

  constructor() {
    super();
    this.html = html;
  }

  render() {
    if (this.employees.length === 0) {
      return this._renderEmptyState();
    }

    return html`
      <div class="grid-container">
        ${this.employees.map(employee => html`
          <div class="employee-card">
            <div class="employee-card-header">
              <div>
                <div class="employee-name">${employee.lastName}, ${employee.firstName}</div>
                <div class="employee-position">
                  <i18n-text key="${employee.position}"></i18n-text> - 
                  <i18n-text key="${employee.department}"></i18n-text>
                </div>
              </div>
            </div>
            
            <div class="employee-detail-row">
              <div class="detail-label"><i18n-text key="startDate"></i18n-text>:</div>
              <div class="detail-value">${new Date(employee.startDate).toLocaleDateString()}</div>
            </div>
            
            <div class="employee-detail-row">
              <div class="detail-label"><i18n-text key="birthDate"></i18n-text>:</div>
              <div class="detail-value">${new Date(employee.birthDate).toLocaleDateString()}</div>
            </div>
            
            <div class="employee-detail-row">
              <div class="detail-label"><i18n-text key="email"></i18n-text>:</div>
              <div class="detail-value email-value">${employee.email}</div>
            </div>
            
            <div class="employee-detail-row">
              <div class="detail-label"><i18n-text key="phone"></i18n-text>:</div>
              <div class="detail-value phone-value">${employee.phone}</div>
            </div>
            
            <div style="margin-top: 1rem; display: flex; justify-content: flex-end; gap: 8px;">
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
          </div>
        `)}
      </div>
      
      ${this._renderPagination()}
    `;
  }
}

customElements.define('ing-employee-grid-view', EmployeeGridView); 