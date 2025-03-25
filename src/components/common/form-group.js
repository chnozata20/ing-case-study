import { LitElement, html, css } from 'lit';

export class FormGroup extends LitElement {
  static properties = {
    title: { type: String },
    columns: { type: Number }, // 1, 2, 3, 4
    gap: { type: String } // sm, md, lg
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group-title {
      color: #333;
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
      border-bottom: 1px solid #E5E5E5;
      padding-bottom: 0.5rem;
    }

    .form-group-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--form-group-gap, 1.5rem);
    }

    .form-group-content.columns-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .form-group-content.columns-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    .form-group-content.columns-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .gap-sm {
      --form-group-gap: 0.75rem;
    }

    .gap-md {
      --form-group-gap: 1.5rem;
    }

    .gap-lg {
      --form-group-gap: 2.25rem;
    }

    @media (max-width: 992px) {
      .form-group-content.columns-4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .form-group-content.columns-3,
      .form-group-content.columns-4 {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .form-group-content.columns-2,
      .form-group-content.columns-3,
      .form-group-content.columns-4 {
        grid-template-columns: 1fr;
      }
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.columns = 1;
    this.gap = 'md';
  }

  render() {
    return html`
      <div class="form-group">
        ${this.title ? html`<h3 class="form-group-title">${this.title}</h3>` : ''}
        <div class="form-group-content columns-${this.columns} gap-${this.gap}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('ing-form-group', FormGroup); 