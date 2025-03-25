import { LitElement, html, css } from 'lit';

export class ActionButton extends LitElement {
  static properties = {
    icon: { type: Object }, // html`<svg>...</svg>`
    type: { type: String }, // 'edit', 'delete' veya özel bir renk
    color: { type: String }, // Özel renk
    size: { type: String } // 'small', 'medium', 'large'
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    
    .action-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
      transition: background 0.2s;
    }

    .action-button.edit {
      color: var(--primary-color, #FF6600);
    }

    .action-button.edit:hover {
      background: rgba(255, 102, 0, 0.08);
    }

    .action-button.delete {
      color: var(--primary-color, #FF6600);
    }

    .action-button.delete:hover {
      background: rgba(255, 102, 0, 0.08);
    }

    .action-button.success {
      color: var(--success-color, #2ecc71);
    }

    .action-button.success:hover {
      background: rgba(46, 204, 113, 0.1);
    }

    .action-button.warning {
      color: var(--warning-color, #f39c12);
    }

    .action-button.warning:hover {
      background: rgba(243, 156, 18, 0.1);
    }

    .action-button.info {
      color: var(--info-color, #3498db);
    }

    .action-button.info:hover {
      background: rgba(52, 152, 219, 0.1);
    }

    .action-button.small {
      width: 26px;
      height: 26px;
    }

    .action-button.medium {
      width: 32px;
      height: 32px;
    }

    .action-button.large {
      width: 40px;
      height: 40px;
    }

    .action-button.custom {
      color: var(--custom-color, inherit);
    }

    .action-button.custom:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  `;

  constructor() {
    super();
    this.icon = null;
    this.type = 'custom';
    this.color = '';
    this.size = 'medium';
  }

  updated(changedProperties) {
    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--custom-color', this.color);
    }
  }

  render() {
    if (!this.icon) {
      return html`
        <button class="action-button ${this.type} ${this.size}">
          <slot></slot>
        </button>
      `;
    }

    return html`
      <button class="action-button ${this.type} ${this.size}">
        ${this.icon}
      </button>
    `;
  }
}

customElements.define('ing-action-button', ActionButton); 