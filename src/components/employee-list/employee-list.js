import { LitElement, html } from 'lit';
import { connect } from '../../store/redux-mixin.js';
import { store } from '../../store/store.js';
import { employeeListStyles } from './styles/employee-list-styles.js';
import { filterEmployees, paginateEmployees } from './employee-list-utils.js';
import './components/employee-table-view.js';
import './components/employee-grid-view.js';
import '../../components/i18n-text.js';
import '../../components/common/loading-indicator.js';
import '../../components/common/search-input.js';
import '../../components/common/dialog.js';
import '../../components/common/view-toggle.js';
import { Router } from '@vaadin/router';
import { fetchEmployees, deleteEmployeeAndManagePagination } from '../../store/slices/employeeSlice.js';

// Varsayılan sayfa başına öğe sayısı
const DEFAULT_ITEMS_PER_PAGE = 5;

export class EmployeeList extends connect(store)(LitElement) {
  static properties = {
    employees: { type: Array },
    loading: { type: Boolean },
    query: { type: String },
    page: { type: Number },
    itemsPerPage: { type: Number },
    showDeleteDialog: { type: Boolean },
    employeeToDelete: { type: Object },
    viewMode: { type: String } // 'table' veya 'grid'
  };

  static styles = employeeListStyles;

  constructor() {
    super();
    this.employees = [];
    this.loading = true;
    this.query = '';
    this.page = 1;
    this.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    this.showDeleteDialog = false;
    this.employeeToDelete = null;
    this.viewMode = 'table'; // Varsayılan olarak tablo görünümü
  }

  stateChanged(state) {
    // Store'dan verileri çek
    this.employees = state.employees.employees;
    this.loading = state.employees.loading;
  }

  connectedCallback() {
    super.connectedCallback();
    // Component yüklendiğinde verileri çek
    store.dispatch(fetchEmployees());
  }

  // Olay işleyicileri
  _handleSearch(e) {
    this.query = e.target.value;
    this.page = 1; // Reset to first page when searching
  }

  _handlePageChange(e) {
    this.page = e.detail.page;
  }

  _handleItemsPerPageChange(e) {
    this.itemsPerPage = e.detail.itemsPerPage;
    this.page = 1; // Reset to first page when changing items per page
  }

  _handleViewModeChange(e) {
    this.viewMode = e.detail.value;
  }

  _handleAddEmployee() {
    Router.go('/add');
  }

  _handleEditEmployee(e) {
    Router.go(`/edit/${e.detail.employee.id}`);
  }

  _handleDeleteEmployee(e) {
    this.employeeToDelete = e.detail.employee;
    this.showDeleteDialog = true;
  }

  _confirmDelete() {
    if (!this.employeeToDelete) return;
    
    // Gelişmiş silme işlemini çağır (sayfa yönetimi ile birlikte)
    store.dispatch(deleteEmployeeAndManagePagination(
      this.employeeToDelete.id,
      this.page,
      this.itemsPerPage,
      this.query
    )).then(result => {
      if (result && !result.error) {
        // Eğer sayfa değişikliği gerekiyorsa, sayfayı güncelle
        if (result.shouldGoToPreviousPage) {
          this.page = result.newPage;
        }
      }
    });
    
    this.showDeleteDialog = false;
    this.employeeToDelete = null;
  }

  render() {
    const filteredEmployees = filterEmployees(this.employees, this.query);
    const paginatedEmployees = paginateEmployees(filteredEmployees, this.page, this.itemsPerPage);
    
    return html`
      <div class="employee-list-container">
        <div class="list-header">
          <div>
            <h1 class="list-title">
              <i18n-text key="employeeList"></i18n-text>
            </h1>
          </div>
          <div class="controls-container">
            <ing-view-toggle
              .value="${this.viewMode}"
              @change="${this._handleViewModeChange}"
            ></ing-view-toggle>
          </div>
        </div>
        
        <div class="list-actions">
          <div class="search-container">
            <ing-search-input
              .value="${this.query}"
              @input="${this._handleSearch}"
            >
              <span slot="placeholder"><i18n-text key="searchEmployees"></i18n-text></span>
            </ing-search-input>
          </div>
        </div>
        
        ${this.loading 
          ? html`<ing-loading-indicator></ing-loading-indicator>` 
          : this.viewMode === 'table' 
              ? html`
                <ing-employee-table-view
                  .employees="${paginatedEmployees}"
                  .page="${this.page}"
                  .itemsPerPage="${this.itemsPerPage}"
                  .totalFilteredCount="${filteredEmployees.length}"
                  @page-change="${this._handlePageChange}"
                  @items-per-page-change="${this._handleItemsPerPageChange}"
                  @edit="${this._handleEditEmployee}"
                  @delete="${this._handleDeleteEmployee}"
                  @add="${this._handleAddEmployee}"
                ></ing-employee-table-view>
              `
              : html`
                <ing-employee-grid-view
                  .employees="${paginatedEmployees}"
                  .page="${this.page}"
                  .itemsPerPage="${this.itemsPerPage}"
                  .totalFilteredCount="${filteredEmployees.length}"
                  @page-change="${this._handlePageChange}"
                  @items-per-page-change="${this._handleItemsPerPageChange}"
                  @edit="${this._handleEditEmployee}"
                  @delete="${this._handleDeleteEmployee}"
                  @add="${this._handleAddEmployee}"
                ></ing-employee-grid-view>
              `
        }
        
        <!-- Delete confirmation dialog -->
        ${this.showDeleteDialog ? html`
          <ing-dialog
            .open=${this.showDeleteDialog}
            @confirm=${this._confirmDelete}
            @cancel=${() => this.showDeleteDialog = false}
            type="delete"
          >
            <span slot="title"><i18n-text key="deleteEmployeeConfirmation"></i18n-text></span>
            <div slot="content">
              <div class="employee-info">
                ${this.employeeToDelete?.firstName} ${this.employeeToDelete?.lastName}
              </div>
            </div>
            <span slot="confirmText"><i18n-text key="proceed"></i18n-text></span>
            <span slot="cancelText"><i18n-text key="cancel"></i18n-text></span>
          </ing-dialog>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('ing-employee-list', EmployeeList); 