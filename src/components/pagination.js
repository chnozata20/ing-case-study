import { LitElement, html, css } from 'lit';

export class Pagination extends LitElement {
  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    maxVisiblePages: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
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
      color: var(--text-color-secondary, #666);
      font-size: var(--font-size-pagination, 14px);
      transition: background-color 0.2s, color 0.2s;
      padding: 0;
    }

    .page-button:hover {
      background-color: #f5f5f5;
    }

    .page-button.active {
      background-color: var(--primary-color, #FF6600);
      color: white;
      font-weight: var(--font-weight-bold, 700);
    }

    .control-button {
      font-size: 1.2rem;
      font-weight: var(--font-weight-medium, 500);
    }

    .ellipsis {
      min-width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--text-color-light, #999);
      font-size: var(--font-size-pagination, 14px);
    }

    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.maxVisiblePages = 5;
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

  render() {
    const prevDisabled = this.currentPage <= 1;
    const nextDisabled = this.currentPage >= this.totalPages;

    return html`
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
    `;
  }
}

customElements.define('ing-pagination', Pagination); 