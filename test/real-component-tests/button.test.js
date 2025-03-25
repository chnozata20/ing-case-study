import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/common/button.js';

describe('Button Component Tests', () => {
  let element;
  
  beforeEach(async () => {
    element = await fixture(html`<ing-button>Test Button</ing-button>`);
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  it('renders with default properties', async () => {
    // Bileşenin varlığını ve tipini kontrol et
    expect(element).to.exist;
    expect(element).to.be.instanceOf(customElements.get('ing-button'));
    
    // Varsayılan özellikleri kontrol et
    expect(element.type).to.equal('primary');
    expect(element.size).to.equal('md');
    expect(element.variant).to.equal('');
    expect(element.icon).to.equal(null);
    expect(element.loading).to.be.false;
    expect(element.disabled).to.be.false;
    expect(element.fullWidth).to.be.false;
    expect(element.nativeType).to.equal('button');
    
    // Button elementi kontrol et
    const button = element.shadowRoot.querySelector('button');
    expect(button).to.exist;
    expect(button.type).to.equal('button');
    expect(button.disabled).to.be.false;
    expect(button.classList.contains('type-primary')).to.be.true;
    expect(button.classList.contains('size-md')).to.be.true;
    
    // Slot içeriği kontrolü (doğrudan innerHTML veya textContent ile kontrol etmek yerine)
    const assignedNodes = element.shadowRoot.querySelector('slot').assignedNodes();
    expect(assignedNodes.length).to.be.greaterThan(0);
    expect(assignedNodes[0].textContent).to.equal('Test Button');
  });
  
  it('applies different button types correctly', async () => {
    const types = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light'];
    
    for (const type of types) {
      element.type = type;
      await element.updateComplete;
      
      const button = element.shadowRoot.querySelector('button');
      expect(button.classList.contains(`type-${type}`)).to.be.true;
    }
  });
  
  it('applies different button sizes correctly', async () => {
    const sizes = ['sm', 'md', 'lg'];
    
    for (const size of sizes) {
      element.size = size;
      await element.updateComplete;
      
      const button = element.shadowRoot.querySelector('button');
      expect(button.classList.contains(`size-${size}`)).to.be.true;
    }
  });
  
  it('applies button variants correctly', async () => {
    const variants = ['outlined', 'text'];
    
    for (const variant of variants) {
      element.variant = variant;
      await element.updateComplete;
      
      const button = element.shadowRoot.querySelector('button');
      expect(button.classList.contains(`variant-${variant}`)).to.be.true;
    }
  });
  
  it('disables the button when disabled is true', async () => {
    element.disabled = true;
    await element.updateComplete;
    
    const button = element.shadowRoot.querySelector('button');
    expect(button.disabled).to.be.true;
  });
  
  it('disables the button when loading is true', async () => {
    element.loading = true;
    await element.updateComplete;
    
    const button = element.shadowRoot.querySelector('button');
    expect(button.disabled).to.be.true;
    
    // Loading göstergesi kontrolü
    const loadingIndicator = button.querySelector('.loading-indicator');
    expect(loadingIndicator).to.exist;
  });
  
  it('applies full width style when fullWidth is true', async () => {
    element.fullWidth = true;
    await element.updateComplete;
    
    const button = element.shadowRoot.querySelector('button');
    expect(button.classList.contains('full-width')).to.be.true;
  });
  
  it('applies the correct native button type', async () => {
    const nativeTypes = ['button', 'submit', 'reset'];
    
    for (const nativeType of nativeTypes) {
      element.nativeType = nativeType;
      await element.updateComplete;
      
      const button = element.shadowRoot.querySelector('button');
      expect(button.getAttribute('type')).to.equal(nativeType);
    }
  });
  
  it('renders icons correctly', async () => {
    // Edit ikonu
    element.icon = 'edit';
    await element.updateComplete;
    
    let button = element.shadowRoot.querySelector('button');
    let svg = button.querySelector('svg');
    expect(svg).to.exist;
    
    // Delete ikonu
    element.icon = 'delete';
    await element.updateComplete;
    
    button = element.shadowRoot.querySelector('button');
    svg = button.querySelector('svg');
    expect(svg).to.exist;
  });
  
  it('dispatches a click event when clicked', async () => {
    const handler = sinon.spy();
    
    // Native DOM eventi yerine custom eventi dinle
    element.addEventListener('click', handler);

    // Elementi doğrudan tıkla (shadowDOM içindeki butonu değil)
    element.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    
    expect(handler.called).to.be.true;
  });
  
  it('prevents click event when disabled', async () => {
    const handler = sinon.spy();
    element.addEventListener('click', handler);
    
    element.disabled = true;
    await element.updateComplete;
    
    const button = element.shadowRoot.querySelector('button');
    button.click();
    
    expect(handler.called).to.be.false;
  });
  
  it('prevents click event when loading', async () => {
    const handler = sinon.spy();
    element.addEventListener('click', handler);
    
    element.loading = true;
    await element.updateComplete;
    
    const button = element.shadowRoot.querySelector('button');
    button.click();
    
    expect(handler.called).to.be.false;
  });
}); 