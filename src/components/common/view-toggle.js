import { LitElement, html, css } from 'lit';

export class ViewToggle extends LitElement {
  static properties = {
    value: { type: String }
  };

  static styles = css`
    :host {
      display: inline-flex;
    }

    .view-toggle {
      display: flex;
      background-color: #F5F5F5;
      border-radius: 4px;
      padding: 2px;
      border: 1px solid #EAEAEA;
    }

    .toggle-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #999999;
      padding: 0;
    }

    .toggle-button.active {
      background-color: white;
      color: var(--primary-color, #FF6600);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .toggle-button:hover:not(.active) {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .toggle-icon {
      width: 20px;
      height: 20px;
    }
  `;

  constructor() {
    super();
    this.value = 'table';
  }

  _handleToggle(value) {
    if (this.value === value) return;
    
    this.value = value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="view-toggle">
        <button
          class="toggle-button ${this.value === 'table' ? 'active' : ''}"
          @click="${() => this._handleToggle('table')}"
          title="Table View"
        >
          <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <button
          class="toggle-button ${this.value === 'grid' ? 'active' : ''}"
          @click="${() => this._handleToggle('grid')}"
          title="Grid View"
        >
          <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define('ing-view-toggle', ViewToggle); 