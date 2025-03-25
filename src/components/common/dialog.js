import { LitElement, html, css } from 'lit';

export class Dialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    title: { type: String },
    content: { type: String },
    confirmText: { type: String },
    cancelText: { type: String },
    type: { type: String }, // 'delete', 'create', 'update', 'warning', 'info'
    showCloseButton: { type: Boolean },
    width: { type: String },
    hideCancel: { type: Boolean }
  };

  static styles = css`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
    }

    .modal-backdrop[data-open] {
      opacity: 1;
      visibility: visible;
    }

    .modal {
      background: white;
      border-radius: 8px;
      width: var(--dialog-width, 400px);
      max-width: 90vw;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      position: relative;
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 1.5rem 0.75rem;
      border-bottom: none;
      background-color: white;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color, #FF6600);
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: var(--primary-color, #FF6600);
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
    }

    .close-button:hover {
      color: var(--primary-color-dark, #d95400);
    }

    .modal-body {
      padding: 0 1.5rem 1.5rem;
    }

    .modal-footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }

    .btn {
      padding: 0.625rem 1.5rem;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.2s;
    }

    .btn-primary {
      background-color: var(--primary-color, #FF6600);
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background-color: var(--primary-color-dark, #d95400);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-secondary {
      background-color: white;
      color: #333366;
      border: 1px solid #333366;
    }

    .btn-secondary:hover {
      background-color: #f0f0f5;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
      border: none;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    /* Tip bazlı renkler */
    .modal.delete .modal-header {
      border-bottom-color: #f8d7da;
    }

    .modal.create .modal-title {
      color: var(--primary-color, #FF6600);
    }

    .modal.update .modal-title {
      color: var(--primary-color, #FF6600);
    }

    .modal.warning .modal-title {
      color: var(--primary-color, #FF6600);
    }

    .modal.info .modal-title {
      color: var(--primary-color, #FF6600);
    }
    
    /* Dialog içeriği */
    .modal-content {
      margin-bottom: 1rem;
      color: #333;
      line-height: 1.5;
      font-size: 1rem;
    }
    
    /* Vurgulu içerik stili (çalışan isimleri, vb.) */
    .highlighted-content {
      margin-top: 0.75rem;
      font-weight: 700;
      color: var(--primary-color, #FF6600);
      font-size: 1.1rem;
      text-align: center;
      padding: 0.5rem;
      background-color: #FFF8F3;
      border-radius: 4px;
      border: 1px solid #FFE0CC;
    }
    
    /* Silme diyaloğu özel stili */
    .delete-dialog {
      padding: 1.5rem;
    }
    
    .delete-dialog .modal-title {
      text-align: left;
      color: var(--primary-color, #FF6600);
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .delete-dialog .close-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: var(--primary-color, #FF6600);
      cursor: pointer;
      font-size: 1.5rem;
    }
    
    .delete-dialog .close-icon:hover {
      color: var(--primary-color-dark, #d95400);
    }
    
    .delete-dialog .modal-content {
      text-align: left;
      margin-bottom: 1.5rem;
    }
    
    .delete-dialog .modal-footer {
      justify-content: flex-end;
      padding: 0;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.content = '';
    this.confirmText = 'Confirm';
    this.cancelText = 'Cancel';
    this.type = 'info';
    this.showCloseButton = true;
    this.width = '400px';
    this.hideCancel = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('open') && this.open) {
      this.updateComplete.then(() => {
        const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
        backdrop.setAttribute('data-open', '');
      });
    }
  }

  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', {
      bubbles: true,
      composed: true
    }));
    this.open = false;
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      composed: true
    }));
    this.open = false;
  }

  _handleClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
    this.open = false;
  }

  render() {
    if (!this.open) {
      return html``;
    }

    const modalClasses = `modal ${this.type || ''}`;
    const titleClasses = `modal-title ${this.type || ''}`;
    const isDeleteDialog = this.type === 'delete';

    return html`
      <div class="modal-backdrop" @click="${this._handleCancel}">
        <div 
          class="${isDeleteDialog ? 'modal delete-dialog' : modalClasses}" 
          style="--dialog-width: ${this.width}"
          @click="${(e) => e.stopPropagation()}"
        >
          ${isDeleteDialog ? 
            html`
              <div class="close-icon" @click="${this._handleCancel}">✕</div>
              <div class="modal-title"><slot name="title">${this.title}</slot></div>
              <div class="modal-content"><slot name="content">${this.content}</slot></div>
              <div class="modal-footer">
                <button class="btn btn-primary" @click="${this._handleConfirm}">
                  <slot name="confirmText">${this.confirmText}</slot>
                </button>
                ${!this.hideCancel ? html`
                  <button class="btn btn-secondary" @click="${this._handleCancel}">
                    <slot name="cancelText">${this.cancelText}</slot>
                  </button>
                ` : ''}
              </div>
            ` :
            html`
              <div class="modal-header">
                <h2 class="${titleClasses}"><slot name="title">${this.title}</slot></h2>
                ${this.showCloseButton ? html`
                  <button class="close-button" @click="${this._handleClose}">✕</button>
                ` : ''}
              </div>
              <div class="modal-body">
                <div class="modal-content"><slot name="content">${this.content}</slot></div>
                <div class="modal-footer">
                  <button class="btn btn-primary" @click="${this._handleConfirm}">
                    <slot name="confirmText">${this.confirmText}</slot>
                  </button>
                    ${!this.hideCancel ? html`
                    <button class="btn btn-secondary" @click="${this._handleCancel}">
                      <slot name="cancelText">${this.cancelText}</slot>
                    </button>
                  ` : ''}
                </div>
              </div>
            `
          }
        </div>
      </div>
    `;
  }
}

customElements.define('ing-dialog', Dialog); 