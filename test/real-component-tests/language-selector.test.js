import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/language-selector.js';

// window.store objesini mocklamak için bir yaklaşım
// Bu daha basit bir yaklaşım ve redux-mixin.js dosyasında
// bağımlılık enjeksiyonu olursa daha temiz olabilir
window.mockReduxStore = {
  getState: () => ({ locale: { locale: 'tr' } }),
  dispatch: sinon.spy(),
  subscribe: () => () => {}
};

describe('LanguageSelector Component Tests', () => {
  let element;
  let localStorageGetStub;
  let localStorageSetStub;
  
  before(() => {
    // localStorage stubları
    localStorageGetStub = sinon.stub(localStorage, 'getItem');
    localStorageSetStub = sinon.stub(localStorage, 'setItem');
    
    // Varsayılan değer
    localStorageGetStub.withArgs('locale').returns('tr');
  });
  
  beforeEach(async () => {
    // Her test öncesi spyları sıfırla
    window.mockReduxStore.dispatch.resetHistory();
    localStorageGetStub.resetHistory();
    localStorageSetStub.resetHistory();
    
    // Bileşeni oluştur
    element = await fixture(html`<ing-language-selector></ing-language-selector>`);
    
    // Redux store'u değiştirebilmek için bir özellik ekleyelim
    element.store = window.mockReduxStore;
  });
  
  after(() => {
    // Test bitiminde stubları geri al
    localStorageGetStub.restore();
    localStorageSetStub.restore();
  });
  
  it('renders with correct initial locale', () => {
    // Başlangıçta "tr" dili seçili olmalı
    expect(element.locale).to.equal('tr');
    
    // Düğmede Türkçe metnini içermeli
    const button = element.shadowRoot.querySelector('.language-button');
    expect(button.textContent).to.include('Türkçe');
  });
  
  it('toggles dropdown when button is clicked', async () => {
    const button = element.shadowRoot.querySelector('.language-button');
    
    // Başlangıçta dropdown kapalı
    expect(element.isOpen).to.be.false;
    
    // Düğmeye tıkla
    button.click();
    await element.updateComplete;
    
    // Dropdown açık olmalı
    expect(element.isOpen).to.be.true;
    
    // Dropdown elementinde 'open' sınıfı olmalı
    const dropdown = element.shadowRoot.querySelector('.dropdown');
    expect(dropdown.classList.contains('open')).to.be.true;
    
    // Tekrar tıklayınca kapanmalı
    button.click();
    await element.updateComplete;
    
    // Dropdown kapalı olmalı
    expect(element.isOpen).to.be.false;
    expect(dropdown.classList.contains('open')).to.be.false;
  });
  
  it('renders in compact mode when compact attribute is set', async () => {
    // Compact özniteliğini ayarla
    element.compact = true;
    await element.updateComplete;
    
    // Bileşen compact özniteliğine sahip olmalı
    expect(element.hasAttribute('compact')).to.be.true;
    
    // Compact stil uygulanmalı
    const button = element.shadowRoot.querySelector('.language-button');
    expect(button).to.exist;
  });
}); 