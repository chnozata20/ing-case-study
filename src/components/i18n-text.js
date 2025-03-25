import { LitElement, html } from 'lit';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import { translate } from '../translations/index.js';

/**
 * Basit bir i18n (internationalization) bileşeni.
 * Kullanımı: <i18n-text key="welcome"></i18n-text>
 */
export class I18nText extends connect(store)(LitElement) {
  static get properties() {
    return {
      key: { type: String }, // Çeviri anahtarı
      locale: { type: String } // Geçerli dil
    };
  }

  constructor() {
    super();
    this.key = '';
    const state = store.getState();
    this.locale = (state.locale && state.locale.locale) || 'en';
  }
  
  stateChanged(state) {
    if (state.locale && state.locale.locale) {
      this.locale = state.locale.locale;
      this.requestUpdate();
    }
  }

  render() {
    if (!this.key) return html``;
    
    return html`${translate(this.key, this.locale)}`;
  }
}

customElements.define('i18n-text', I18nText); 