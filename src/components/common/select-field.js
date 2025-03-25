import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';

export class SelectField extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    options: { type: Array }, // [{value: 'value1', label: 'Label 1'}, ...]
    placeholder: { type: String },
    required: { type: Boolean },
    disabled: { type: Boolean },
    error: { type: String },
    compact: { type: Boolean } // Kompakt mod için yeni özellik
  };

  static styles = css`
    :host {
      display: block;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    label {
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    select {
      padding: 0.75rem;
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #333;
      background: white;
      transition: border-color 0.2s, box-shadow 0.2s;
      width: 100%;
      box-sizing: border-box;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.7rem center;
      background-size: 1em;
    }

    /* Kompakt mod için stil */
    .compact select {
      padding: 0.4rem 1.5rem 0.4rem 0.5rem;
      font-size: 0.85rem;
      min-width: 60px;
      background-position: right 0.35rem center;
      background-size: 0.85em;
    }

    /* Kompakt form field, alt margin'i temizler */
    .compact.form-field {
      margin-bottom: 0;
    }

    select:focus {
      outline: none;
      border-color: var(--primary-color, #FF6200);
      box-shadow: 0 0 0 2px rgba(255, 98, 0, 0.1);
    }

    select:disabled {
      background-color: #f9f9f9;
      cursor: not-allowed;
      opacity: 0.7;
    }

    select.error {
      border-color: #dc3545;
    }

    select.error:focus {
      box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
    }

    .error-message {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }

    select option[value=""] {
      color: #999;
    }

    .compact {
      display: flex;
    }
  `;

  constructor() {
    super();
    this.label = '';
    this.name = '';
    this.value = '';
    this.options = [];
    this.placeholder = '';
    this.required = false;
    this.disabled = false;
    this.error = '';
    this.compact = false;
  }

  _handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: true,
      composed: true
    }));
  }

  _handleBlur() {
    this.dispatchEvent(new CustomEvent('blur', {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="form-field ${this.compact ? 'compact' : ''}">
        ${this.label ? html`<label for="${this.name}">${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <div class="${this.compact ? 'compact' : ''}">
          <select
            id="${this.name}"
            name="${this.name}"
            .value="${this.value}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            class="${this.error ? 'error' : ''}"
            @change="${this._handleChange}"
            @blur="${this._handleBlur}"
          >
            ${this.placeholder ? html`<option value="">${this.placeholder}</option>` : ''}
            ${this.options.map(option => html`
              <option value="${option.value}" ?selected="${option.value === this.value}">${option.label}</option>
            `)}
          </select>
        </div>
        ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ing-select-field', SelectField); 