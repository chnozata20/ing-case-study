import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/i18n-text.js';

describe('I18n-Text Component Tests', () => {
  let element;
  
  beforeEach(async () => {
    // Bileşeni oluştur
    element = await fixture(html`<i18n-text key="welcome"></i18n-text>`);
  });
  
  it('renders as a custom element', async () => {
    // Bileşenin varlığını ve tipini kontrol et
    expect(element).to.exist;
    expect(element).to.be.instanceOf(customElements.get('i18n-text'));
  });
  
  it('has correct properties', async () => {
    // Bileşen özelliklerini kontrol et
    expect(element).to.have.property('key');
    expect(element).to.have.property('locale');
    expect(element.key).to.equal('welcome');
  });
  
  it('updates key when changed', async () => {
    // Key değiştirme
    element.key = 'newkey';
    await element.updateComplete;
    expect(element.key).to.equal('newkey');
  });
  
  it('has a shadow root', async () => {
    // Shadow DOM'un varlığını kontrol et
    expect(element.shadowRoot).to.exist;
  });
}); 