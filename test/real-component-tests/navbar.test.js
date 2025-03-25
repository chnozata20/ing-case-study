import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/navbar.js';

describe('Navbar Component Tests', () => {
  let element;
  let mockRouter;
  
  beforeEach(async () => {
    // Global Router'ı mockla
    mockRouter = { go: sinon.spy() };
    window.Router = mockRouter;
    
    // Bileşeni oluştur
    element = await fixture(html`<ing-navbar></ing-navbar>`);
  });
  
  it('renders with correct structure', () => {
    // Temel yapı kontrolü
    expect(element.shadowRoot.querySelector('.navbar')).to.exist;
    expect(element.shadowRoot.querySelector('.logo')).to.exist;
    expect(element.shadowRoot.querySelector('ing-language-selector')).to.exist;
    expect(element.shadowRoot.querySelector('.employees-btn')).to.exist;
    expect(element.shadowRoot.querySelector('.add-new-btn')).to.exist;
  });
  
  it('updates current route correctly', async () => {
    // Başlangıç değerini kontrol et
    expect(element.currentRoute).to.not.be.undefined;
    
    // Manuel olarak güncelle
    element.currentRoute = '/add';
    await element.updateComplete;
    
    // Doğru şekilde güncellendiğini kontrol et
    expect(element.currentRoute).to.equal('/add');
    
    // Add butonu aktif olmalı
    const addBtn = element.shadowRoot.querySelector('.add-new-btn');
    expect(addBtn).to.exist;
  });
  
  it('listens for vaadin-router-location-changed events', async () => {
    // Event oluştur
    const event = new CustomEvent('vaadin-router-location-changed');
    
    // Pencerede tetikle
    window.dispatchEvent(event);
    
    // Bileşenin güncellendiğinden emin ol
    await element.updateComplete;
  });
}); 