import { LitElement, html, css } from 'lit';

export class SearchInput extends LitElement {
  static properties = {
    value: { type: String },
    placeholder: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }
    
    .search-box {
      position: relative;
      max-width: 300px;
      width: 100%;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      color: var(--primary-color, #FF6600);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .fa-search {
      font-size: 14px;
    }

    .search-box input {
      width: 100%;
      padding: 10px 10px 10px 40px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      background-color: #f8f8f8;
      transition: all 0.2s;
      margin: 0;
      box-sizing: border-box;
      height: 38px;
      line-height: normal;
      display: block;
    }

    .search-box input:focus {
      border-color: #FF6200;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
      outline: none;
    }

    .search-box input::placeholder {
      color: #999;
    }
  `;

  constructor() {
    super();
    this.value = '';
    this.placeholder = 'Ara...';
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="search-box">
        <span class="search-icon">
          <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
        </span>
        <input 
          type="text" 
          placeholder="${this.placeholder}"
          .value="${this.value}"
          @input="${this._handleInput}"
        >
      </div>
    `;
  }
}

customElements.define('ing-search-input', SearchInput); 