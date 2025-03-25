/**
 * Tablo ve Grid görünümleri için ortak işlevselliği sağlayan mixin
 */
export const ViewBaseMixin = (superClass) => class extends superClass {
  static get properties() {
    return {
      employees: { type: Array },
      page: { type: Number },
      itemsPerPage: { type: Number },
      totalFilteredCount: { type: Number }
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.page = 1;
    this.totalFilteredCount = 0;
  }

  _handlePageChange(e) {
    this.dispatchEvent(new CustomEvent('page-change', {
      detail: { page: e.detail.page }
    }));
  }

  _handleItemsPerPageChange(e) {
    this.dispatchEvent(new CustomEvent('items-per-page-change', {
      detail: { itemsPerPage: e.detail.itemsPerPage }
    }));
  }

  _handleEditEmployee(employee) {
    this.dispatchEvent(new CustomEvent('edit', {
      detail: { employee }
    }));
  }

  _handleDeleteEmployee(employee) {
    this.dispatchEvent(new CustomEvent('delete', {
      detail: { employee }
    }));
  }

  _handleAddEmployee() {
    this.dispatchEvent(new CustomEvent('add'));
  }

  /**
   * Sayfa numaralandırma bileşenini oluşturan yardımcı yöntem
   * @returns {TemplateResult} Sayfalama için lit-html şablonu
   */
  _renderPagination() {
    return this.html`
      <ing-pagination
        .currentPage="${this.page}"
        .totalPages="${Math.ceil(this.totalFilteredCount / this.itemsPerPage)}"
        .itemsPerPage="${this.itemsPerPage}"
        .defaultItemsPerPage="${this.itemsPerPage}"
        @page-change="${this._handlePageChange}"
        @items-per-page-change="${this._handleItemsPerPageChange}"
      >
        <span slot="items-per-page-label"><i18n-text key="itemsPerPage"></i18n-text></span>
      </ing-pagination>
    `;
  }

  /**
   * Boş durum görünümünü oluşturan yardımcı yöntem
   * @returns {TemplateResult} Boş durum için lit-html şablonu
   */
  _renderEmptyState() {
    return this.html`
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">
          <i18n-text key="noEmployeesFound"></i18n-text>
        </div>
        <ing-button
          type="primary"
          @click="${this._handleAddEmployee}"
        >
          <i18n-text key="addEmployee"></i18n-text>
        </ing-button>
      </div>
    `;
  }
}; 