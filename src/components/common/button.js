import { LitElement, html, css } from 'lit';

export class Button extends LitElement {
  static properties = {
    type: { type: String }, // primary, secondary, success, danger, warning, info, light, link
    size: { type: String }, // sm, md, lg
    variant: { type: String }, // outlined, text
    icon: { type: Object },
    loading: { type: Boolean },
    disabled: { type: Boolean },
    fullWidth: { type: Boolean },
    nativeType: { type: String }, // button, submit, reset
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: inherit;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border-radius: 4px;
      transition: all 0.15s ease-in-out;
      position: relative;
      overflow: hidden;
    }

    /* Boyutlar */
    .button.size-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      min-height: 2rem;
    }

    .button.size-md {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      min-height: 2.5rem;
    }

    .button.size-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
      min-height: 3rem;
    }

    /* Genişlik */
    .button.full-width {
      display: flex;
      width: 100%;
    }

    /* Tip stilleri - Dolu */
    .button.type-primary {
      background-color: var(--primary-color, #FF6200);
      color: white;
      border: 1px solid var(--primary-color, #FF6200);
    }

    .button.type-primary:hover {
      background-color: #E65800;
      border-color: #E65800;
    }

    .button.type-secondary {
      background-color: #6c757d;
      color: white;
      border: 1px solid #6c757d;
    }

    .button.type-secondary:hover {
      background-color: #5a6268;
      border-color: #5a6268;
    }

    .button.type-success {
      background-color: #28a745;
      color: white;
      border: 1px solid #28a745;
    }

    .button.type-success:hover {
      background-color: #218838;
      border-color: #218838;
    }

    .button.type-danger {
      background-color: #dc3545;
      color: white;
      border: 1px solid #dc3545;
    }

    .button.type-danger:hover {
      background-color: #c82333;
      border-color: #c82333;
    }

    .button.type-warning {
      background-color: #ffc107;
      color: #212529;
      border: 1px solid #ffc107;
    }

    .button.type-warning:hover {
      background-color: #e0a800;
      border-color: #e0a800;
    }

    .button.type-info {
      background-color: #17a2b8;
      color: white;
      border: 1px solid #17a2b8;
    }

    .button.type-info:hover {
      background-color: #138496;
      border-color: #138496;
    }

    .button.type-light {
      background-color: #f8f9fa;
      color: #212529;
      border: 1px solid #f8f9fa;
    }

    .button.type-light:hover {
      background-color: #e2e6ea;
      border-color: #e2e6ea;
    }

    /* Varyantlar - Outlined */
    .button.variant-outlined.type-primary {
      background-color: transparent;
      color: var(--primary-color, #FF6200);
      border: 1px solid var(--primary-color, #FF6200);
    }

    .button.variant-outlined.type-primary:hover {
      background-color: rgba(255, 98, 0, 0.1);
    }

    .button.variant-outlined.type-secondary {
      background-color: transparent;
      color: #6c757d;
      border: 1px solid #6c757d;
    }

    .button.variant-outlined.type-secondary:hover {
      background-color: rgba(108, 117, 125, 0.1);
    }

    .button.variant-outlined.type-success {
      background-color: transparent;
      color: #28a745;
      border: 1px solid #28a745;
    }

    .button.variant-outlined.type-success:hover {
      background-color: rgba(40, 167, 69, 0.1);
    }

    .button.variant-outlined.type-danger {
      background-color: transparent;
      color: #dc3545;
      border: 1px solid #dc3545;
    }

    .button.variant-outlined.type-danger:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }

    .button.variant-outlined.type-warning {
      background-color: transparent;
      color: #ffc107;
      border: 1px solid #ffc107;
    }

    .button.variant-outlined.type-warning:hover {
      background-color: rgba(255, 193, 7, 0.1);
    }

    .button.variant-outlined.type-info {
      background-color: transparent;
      color: #17a2b8;
      border: 1px solid #17a2b8;
    }

    .button.variant-outlined.type-info:hover {
      background-color: rgba(23, 162, 184, 0.1);
    }

    .button.variant-outlined.type-light {
      background-color: transparent;
      color: #f8f9fa;
      border: 1px solid #f8f9fa;
    }

    .button.variant-outlined.type-light:hover {
      background-color: rgba(248, 249, 250, 0.1);
    }

    /* Varyantlar - Text */
    .button.variant-text {
      background-color: transparent;
      border: none;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .button.variant-text.type-primary {
      color: var(--primary-color, #FF6600);
    }

    .button.variant-text.type-primary:hover {
      background-color: rgba(255, 98, 0, 0.1);
    }

    .button.variant-text.type-secondary {
      color: #6c757d;
    }

    .button.variant-text.type-secondary:hover {
      background-color: rgba(108, 117, 125, 0.1);
    }

    .button.variant-text.type-success {
      color: #28a745;
    }

    .button.variant-text.type-success:hover {
      background-color: rgba(40, 167, 69, 0.1);
    }

    .button.variant-text.type-danger {
      color: #dc3545;
    }

    .button.variant-text.type-danger:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }

    .button.variant-text.type-warning {
      color: #ffc107;
    }

    .button.variant-text.type-warning:hover {
      background-color: rgba(255, 193, 7, 0.1);
    }

    .button.variant-text.type-info {
      color: #17a2b8;
    }

    .button.variant-text.type-info:hover {
      background-color: rgba(23, 162, 184, 0.1);
    }

    .button.variant-text.type-light {
      color: #f8f9fa;
    }

    .button.variant-text.type-light:hover {
      background-color: rgba(248, 249, 250, 0.1);
    }

    /* Disabled */
    .button:disabled,
    .button.disabled {
      opacity: 0.65;
      pointer-events: none;
      cursor: not-allowed;
    }

    /* Link */
    .button.type-link {
      background-color: transparent;
      border: none;
      color: var(--primary-color, #FF6200);
      text-decoration: underline;
      padding: 0;
    }

    .button.type-link:hover {
      color: #E65800;
      text-decoration: underline;
    }

    /* Loading */
    .loading-spinner {
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: button-spinner 0.75s linear infinite;
    }

    @keyframes button-spinner {
      to {
        transform: rotate(360deg);
      }
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: inherit;
      border-radius: inherit;
    }

    .button-content {
      visibility: visible;
    }

    .button.loading .button-content {
      visibility: hidden;
    }

    /* Içerik düzeni */
    .button-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .button-icon svg {
      width: 1.25em;
      height: 1.25em;
      stroke-width: 2;
    }

    .button.size-sm .button-icon svg {
      width: 1em;
      height: 1em;
    }

    .button.size-lg .button-icon svg {
      width: 1.5em;
      height: 1.5em;
    }

    /* Aksiyon butonları için özel stiller */
    .button.variant-text[icon="edit"],
    .button.variant-text[icon="delete"] {
      border-radius: 50%;
      padding: 0.5rem;
      min-height: auto;
      min-width: auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .button.variant-text[icon="edit"]:hover,
    .button.variant-text[icon="delete"]:hover {
      background-color: rgba(255, 102, 0, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.2s ease;
    }

    .button.variant-text[icon="edit"] {
      color: var(--primary-color, #FF6600);
    }

    .button.variant-text[icon="delete"] {
      color: var(--danger-color, #dc3545);
    }

    .button.variant-text[icon="delete"]:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }
  `;

  constructor() {
    super();
    this.type = 'primary';
    this.size = 'md';
    this.variant = '';
    this.icon = null;
    this.loading = false;
    this.disabled = false;
    this.fullWidth = false;
    this.nativeType = 'button';
  }

  _handleClick(e) {
    console.log('Button._handleClick - Type:', this.nativeType, 'Disabled:', this.disabled, 'Loading:', this.loading);
    
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }
    
    // Form submit butonları için preventDefault YAPMA - formu gönder
    if (this.nativeType === 'submit') {
      console.log('Submit butonu tıklandı, form submit işlemi devam edecek');
      // preventDefault YAPMA - normal form submitini devam ettir
    }
    
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: { event: e },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const typeClass = `type-${this.type || 'primary'}`;
    const sizeClass = `size-${this.size || 'md'}`;
    const variantClass = this.variant ? `variant-${this.variant}` : '';
    const fullWidthClass = this.fullWidth ? 'full-width' : '';
    
    // İkon render fonksiyonu
    const renderIcon = () => {
      if (!this.icon) return null;
      
      // Burada ikonlar için bir switch case kullanabiliriz
      switch(this.icon) {
        case 'edit':
          return html`
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          `;
        case 'delete':
          return html`
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          `;
        default:
          return null;
      }
    };
    
    return html`
      <button
        class="button ${typeClass} ${sizeClass} ${variantClass} ${fullWidthClass}"
        type="${this.nativeType}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading ? html`<div class="loading-indicator"></div>` : ''}
        ${renderIcon()}
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('ing-button', Button); 