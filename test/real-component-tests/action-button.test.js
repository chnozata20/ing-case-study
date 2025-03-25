import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/common/action-button.js';

describe('ActionButton Component Tests', () => {
  let element;
  
  beforeEach(async () => {
    element = await fixture(html`<ing-action-button>Action</ing-action-button>`);
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  it('renders with default properties', async () => {
    // Bileşenin varlığını ve tipini kontrol et
    expect(element).to.exist;
    expect(element).to.be.instanceOf(customElements.get('ing-action-button'));
    
    // Varsayılan özellikleri kontrol et
    expect(element.icon).to.equal(null);
    expect(element.type).to.equal('custom');
    expect(element.color).to.equal('');
    expect(element.size).to.equal('medium');
    
    // Button elementi kontrol et
    const button = element.shadowRoot.querySelector('button');
    expect(button).to.exist;
    expect(button.classList.contains('custom')).to.be.true;
    expect(button.classList.contains('medium')).to.be.true;
    
    // Slot içeriği kontrolü
    const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes();
    expect(assignedNodes.length).to.be.greaterThan(0);
    expect(assignedNodes[0].textContent).to.equal('Action');
  });
  
  it('applies different button types correctly', async () => {
    const types = ['edit', 'delete', 'success', 'warning', 'info', 'custom'];
    
    for (const type of types) {
      element.type = type;
      await element.updateComplete;
      
      const button = element.shadowRoot.querySelector('button');
      expect(button.classList.contains(type)).to.be.true;
    }
  });
  
  it('applies different button sizes correctly', async () => {
    const sizes = ['small', 'medium', 'large'];
    
    for (const size of sizes) {
      element.size = size;
      await element.updateComplete;
      
      const button = element.shadowRoot.querySelector('button');
      expect(button.classList.contains(size)).to.be.true;
    }
  });
  
  it('renders custom icon correctly', async () => {
    // SVG ikonu
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '16');
    svgIcon.setAttribute('height', '16');
    
    element.icon = svgIcon;
    await element.updateComplete;
    
    const button = element.shadowRoot.querySelector('button');
    expect(button.innerHTML).to.include('svg');
  });
  
  it('applies custom color when specified', async () => {
    element.type = 'custom';
    element.color = '#FF00FF';
    await element.updateComplete;
    
    // CSS özel değişkenin ayarlandığını kontrol et
    expect(element.style.getPropertyValue('--custom-color')).to.equal('#FF00FF');
  });
  
  it('dispatches a click event when clicked', async () => {
    const handler = sinon.spy();
    element.addEventListener('click', handler);
    
    const button = element.shadowRoot.querySelector('button');
    button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    
    expect(handler.called).to.be.true;
  });
  
  it('updates styling when type changes', async () => {
    // Başlangıçta custom tipinde
    let button = element.shadowRoot.querySelector('button');
    expect(button.classList.contains('custom')).to.be.true;
    
    // Edit tipine değiştir
    element.type = 'edit';
    await element.updateComplete;
    
    button = element.shadowRoot.querySelector('button');
    expect(button.classList.contains('edit')).to.be.true;
    expect(button.classList.contains('custom')).to.be.false;
  });
  
  it('updates styles when size changes', async () => {
    // Başlangıçta medium boyutta
    let button = element.shadowRoot.querySelector('button');
    expect(button.classList.contains('medium')).to.be.true;
    
    // Large boyuta değiştir
    element.size = 'large';
    await element.updateComplete;
    
    button = element.shadowRoot.querySelector('button');
    expect(button.classList.contains('large')).to.be.true;
    expect(button.classList.contains('medium')).to.be.false;
  });
  
  it('handles slot content when no icon is provided', async () => {
    const customContent = 'Custom Text';
    element = await fixture(html`<ing-action-button>${customContent}</ing-action-button>`);
    
    // Slot içeriği kontrolü
    const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes();
    expect(assignedNodes.length).to.be.greaterThan(0);
    expect(assignedNodes[0].textContent).to.equal(customContent);
  });
  
  it('prioritizes icon over slot content when icon is provided', async () => {
    // SVG ikonu
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '16');
    svgIcon.setAttribute('height', '16');
    
    // Önce içerikli element oluştur
    element = await fixture(html`<ing-action-button>Custom Text</ing-action-button>`);
    
    // Sonra ikon ekle
    element.icon = svgIcon;
    await element.updateComplete;
    
    // Butonun içeriğini kontrol et - slot içeren render seçeneği yerine ikon içeren render seçeneği kullanılmalı
    const button = element.shadowRoot.querySelector('button');
    expect(button.innerHTML).to.include('svg');
    expect(button.querySelector('slot')).to.be.null;
  });
}); 