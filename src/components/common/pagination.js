import { LitElement, html, css } from 'lit';

export class Pagination extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    maxVisiblePages: { type: Number },
    itemsPerPage: { type: Number },
    itemsPerPageOptions: { type: Array },
    showItemsPerPage: { type: Boolean },
    defaultItemsPerPage: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
    }

    .pagination-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .pagination {
      display: flex;
      gap: 2px;
      align-items: center;
    }

    .page-button, .control-button {
      min-width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: #666;
      font-size: 0.9rem;
      transition: background-color 0.2s, color 0.2s;
      padding: 0;
    }

    .page-button:hover {
      background-color: #f5f5f5;
    }

    .page-button.active {
      background-color: var(--primary-color, #FF6600);
      color: white;
      font-weight: 500;
    }

    .control-button {
      font-size: 1.2rem;
      font-weight: 500;
    }

    .ellipsis {
      min-width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
    }

    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .items-per-page-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .items-per-page-label {
      color: var(--text-color-light, #999999);
      font-size: var(--font-size-secondary, 12px);
      white-space: nowrap;
    }

    .items-per-page-select {
      min-width: 60px;
      height: 32px;
      padding: 0 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      font-size: 12px;
      color: #333;
    }

    @media (max-width: 768px) {
      .pagination-wrapper {
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
      }
      
      .items-per-page-label {
        font-size: 11px;
      }
    }
  `;

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.maxVisiblePages = 5;
    this.defaultItemsPerPage = 5;
    this.itemsPerPage = this.defaultItemsPerPage;
    this.itemsPerPageOptions = [
      { value: '5', label: '5' },
      { value: '10', label: '10' },
      { value: '20', label: '20' },
      { value: '50', label: '50' }
    ];
    this.showItemsPerPage = true;
  }

  updated(changedProperties) {
    if (changedProperties.has('defaultItemsPerPage') && this.defaultItemsPerPage !== undefined) {
      if (this.itemsPerPage !== this.defaultItemsPerPage) {
        this.itemsPerPage = this.defaultItemsPerPage;
      }
    }
  }

  _handlePageClick(pageNumber) {
    if (pageNumber === this.currentPage || pageNumber < 1 || pageNumber > this.totalPages) {
      return;
    }

    this.dispatchEvent(new CustomEvent('page-change', {
      detail: {
        page: pageNumber
      },
      bubbles: true,
      composed: true
    }));
  }

  _handleItemsPerPageChange(e) {
    const newItemsPerPage = parseInt(e.target.value, 10);
    
    this.dispatchEvent(new CustomEvent('items-per-page-change', {
      detail: {
        itemsPerPage: newItemsPerPage
      },
      bubbles: true,
      composed: true
    }));
  }

  _renderPageButtons() {
    // Sayfa numaralarını göstermek için bir algoritma oluşturalım
    const visiblePages = [];
    const halfVisible = Math.floor(this.maxVisiblePages / 2);

    // Toplam sayfa sayısı, maksimum görünür sayfa sayısından küçük veya eşit ise
    // tüm sayfaları göster
    if (this.totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Her zaman ilk ve son sayfa gösterilsin
      let startPage = Math.max(this.currentPage - halfVisible, 1);
      let endPage = Math.min(startPage + this.maxVisiblePages - 1, this.totalPages);

      // Eğer endPage, totalPages'e ulaştıysa, startPage'i ayarla
      if (endPage === this.totalPages) {
        startPage = Math.max(endPage - this.maxVisiblePages + 1, 1);
      }

      // İlk sayfa
      visiblePages.push(1);

      // İlk sayfadan sonra boşluk varsa ellipsis ekle
      if (startPage > 2) {
        visiblePages.push('ellipsis1');
      }

      // Orta sayfaları ekle
      for (let i = Math.max(2, startPage); i <= Math.min(this.totalPages - 1, endPage); i++) {
        visiblePages.push(i);
      }

      // Son sayfadan önce boşluk varsa ellipsis ekle
      if (endPage < this.totalPages - 1) {
        visiblePages.push('ellipsis2');
      }

      // Son sayfa
      if (this.totalPages > 1) {
        visiblePages.push(this.totalPages);
      }
    }

    return visiblePages.map(page => {
      if (page === 'ellipsis1' || page === 'ellipsis2') {
        return html`<div class="ellipsis">...</div>`;
      }

      return html`
        <button
          class="page-button ${page === this.currentPage ? 'active' : ''}"
          @click="${() => this._handlePageClick(page)}"
        >
          ${page}
        </button>
      `;
    });
  }

  _renderItemsPerPage() {
    if (!this.showItemsPerPage) {
      return '';
    }

    return html`
      <div class="items-per-page-container">
        <span class="items-per-page-label">
          <slot name="items-per-page-label">Items per page</slot>
        </span>
        <select 
          class="items-per-page-select"
          .value="${this.itemsPerPage.toString()}"
          @change="${this._handleItemsPerPageChange}"
        >
          ${this.itemsPerPageOptions.map(option => html`
            <option value="${option.value}">${option.label}</option>
          `)}
        </select>
      </div>
    `;
  }

  render() {
    const prevDisabled = this.currentPage <= 1;
    const nextDisabled = this.currentPage >= this.totalPages;

    return html`
      <div class="pagination-wrapper">
        <div class="pagination">
          <button
            class="control-button ${prevDisabled ? 'disabled' : ''}"
            @click="${() => this._handlePageClick(this.currentPage - 1)}"
            ?disabled="${prevDisabled}"
            aria-label="Previous Page"
          >
            ‹
          </button>

          ${this._renderPageButtons()}

          <button
            class="control-button ${nextDisabled ? 'disabled' : ''}"
            @click="${() => this._handlePageClick(this.currentPage + 1)}"
            ?disabled="${nextDisabled}"
            aria-label="Next Page"
          >
            ›
          </button>
        </div>

        ${this._renderItemsPerPage()}
      </div>
    `;
  }
}

customElements.define('ing-pagination', Pagination); 