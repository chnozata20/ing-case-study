import { LitElement, html, css } from 'lit';

export class LoadingIndicator extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      text-align: center;
    }
    
    .loader {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;
    }
    
    .loader div {
      position: absolute;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #FF6200;
      animation: loader 1.2s linear infinite;
    }
    
    .loader div:nth-child(1) {
      top: 6px;
      left: 6px;
      animation-delay: 0s;
    }
    
    .loader div:nth-child(2) {
      top: 6px;
      left: 26px;
      animation-delay: -0.4s;
    }
    
    .loader div:nth-child(3) {
      top: 6px;
      left: 45px;
      animation-delay: -0.8s;
    }
    
    .loader div:nth-child(4) {
      top: 26px;
      left: 6px;
      animation-delay: -0.4s;
    }
    
    .loader div:nth-child(5) {
      top: 26px;
      left: 26px;
      animation-delay: -0.8s;
    }
    
    .loader div:nth-child(6) {
      top: 26px;
      left: 45px;
      animation-delay: -1.2s;
    }
    
    .loader div:nth-child(7) {
      top: 45px;
      left: 6px;
      animation-delay: -0.8s;
    }
    
    .loader div:nth-child(8) {
      top: 45px;
      left: 26px;
      animation-delay: -1.2s;
    }
    
    .loader div:nth-child(9) {
      top: 45px;
      left: 45px;
      animation-delay: -1.6s;
    }
    
    @keyframes loader {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
  `;

  render() {
    return html`
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define('ing-loading-indicator', LoadingIndicator); 