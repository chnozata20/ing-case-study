import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/common/dialog.js';

describe('Dialog Component Tests', () => {
  let element;
  
  beforeEach(async () => {
    element = await fixture(html`
      <ing-dialog 
        title="Test Dialog" 
        content="Dialog test content"
        confirmText="Confirm Test"
        cancelText="Cancel Test"
      ></ing-dialog>
    `);
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  it('renders with default properties', async () => {
    // Bileşenin varlığını ve tipini kontrol et
    expect(element).to.exist;
    expect(element).to.be.instanceOf(customElements.get('ing-dialog'));
    
    // Varsayılan özellikleri kontrol et
    expect(element.open).to.be.false;
    expect(element.title).to.equal('Test Dialog');
    expect(element.content).to.equal('Dialog test content');
    expect(element.confirmText).to.equal('Confirm Test');
    expect(element.cancelText).to.equal('Cancel Test');
    expect(element.type).to.equal('info');
    expect(element.showCloseButton).to.be.true;
    expect(element.width).to.equal('400px');
    expect(element.hideCancel).to.be.false;
    
    // Dialog kapalıyken render içeriği kontrol et
    // Not: LitElement boş template döndürdüğünde bile bazı yorum nodları oluşabilir
    const backdrop = element.shadowRoot.querySelector('.modal-backdrop');
    expect(backdrop).to.be.null;
  });
  
  it('renders when open property is set to true', async () => {
    // Dialog'u aç
    element.open = true;
    await element.updateComplete;
    
    // DOM yapısının oluştuğunu doğrula
    const backdrop = element.shadowRoot.querySelector('.modal-backdrop');
    expect(backdrop).to.exist;
    
    // data-open attribute'ı updateComplete'den sonra async olarak eklenebilir
    // Bu yüzden kısa bir bekleme ekleyelim
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Backdrop open özelliğini kontrol et (data-open attribute'u)
    expect(backdrop.hasAttribute('data-open')).to.be.true;
    
    const modal = element.shadowRoot.querySelector('.modal');
    expect(modal).to.exist;
    
    const title = element.shadowRoot.querySelector('.modal-title');
    expect(title).to.exist;
    expect(title.textContent).to.include('Test Dialog');
    
    const content = element.shadowRoot.querySelector('.modal-content');
    expect(content).to.exist;
    expect(content.textContent).to.include('Dialog test content');
  });
  
  it('applies different dialog types correctly', async () => {
    const types = ['info', 'delete', 'create', 'update', 'warning'];
    
    for (const type of types) {
      element.type = type;
      element.open = true;
      await element.updateComplete;
      
      // Delete dialog tipi için özel durum
      if (type === 'delete') {
        const deleteDialog = element.shadowRoot.querySelector('.delete-dialog');
        expect(deleteDialog).to.exist;
      } else {
        const modal = element.shadowRoot.querySelector('.modal');
        expect(modal.classList.contains(type)).to.be.true;
      }
    }
  });
  
  it('shows close button when showCloseButton is true', async () => {
    element.showCloseButton = true;
    element.open = true;
    await element.updateComplete;
    
    const closeButton = element.shadowRoot.querySelector('.close-button');
    expect(closeButton).to.exist;
  });
  
  it('hides close button when showCloseButton is false', async () => {
    element.showCloseButton = false;
    element.open = true;
    await element.updateComplete;
    
    const closeButton = element.shadowRoot.querySelector('.close-button');
    expect(closeButton).to.be.null;
  });
  
  it('applies custom width correctly', async () => {
    element.width = '600px';
    element.open = true;
    await element.updateComplete;
    
    const modal = element.shadowRoot.querySelector('.modal');
    expect(modal.style.getPropertyValue('--dialog-width')).to.equal('600px');
  });
  
  it('hides cancel button when hideCancel is true', async () => {
    element.hideCancel = true;
    element.open = true;
    await element.updateComplete;
    
    // Sadece onay butonu var mı kontrol et
    const confirmButton = element.shadowRoot.querySelector('.btn-primary');
    expect(confirmButton).to.exist;
    
    const cancelButton = element.shadowRoot.querySelector('.btn-secondary');
    expect(cancelButton).to.be.null;
  });
  
  it('dispatches confirm event when confirm button is clicked', async () => {
    const confirmHandler = sinon.spy();
    element.addEventListener('confirm', confirmHandler);
    
    element.open = true;
    await element.updateComplete;
    
    const confirmButton = element.shadowRoot.querySelector('.btn-primary');
    expect(confirmButton).to.exist;
    
    confirmButton.click();
    
    expect(confirmHandler.called).to.be.true;
    expect(element.open).to.be.false;
  });
  
  it('dispatches cancel event when cancel button is clicked', async () => {
    const cancelHandler = sinon.spy();
    element.addEventListener('cancel', cancelHandler);
    
    element.open = true;
    await element.updateComplete;
    
    const cancelButton = element.shadowRoot.querySelector('.btn-secondary');
    expect(cancelButton).to.exist;
    
    cancelButton.click();
    
    expect(cancelHandler.called).to.be.true;
    expect(element.open).to.be.false;
  });
  
  it('dispatches close event when close button is clicked', async () => {
    const closeHandler = sinon.spy();
    element.addEventListener('close', closeHandler);
    
    element.open = true;
    await element.updateComplete;
    
    const closeButton = element.shadowRoot.querySelector('.close-button');
    expect(closeButton).to.exist;
    
    closeButton.click();
    
    expect(closeHandler.called).to.be.true;
    expect(element.open).to.be.false;
  });
  
  it('closes when backdrop is clicked', async () => {
    const cancelHandler = sinon.spy();
    element.addEventListener('cancel', cancelHandler);
    
    element.open = true;
    await element.updateComplete;
    
    const backdrop = element.shadowRoot.querySelector('.modal-backdrop');
    expect(backdrop).to.exist;
    
    backdrop.click();
    
    expect(cancelHandler.called).to.be.true;
    expect(element.open).to.be.false;
  });
  
  it('handles slot content correctly', async () => {
    // Özel element oluştur
    const slotElement = await fixture(html`
      <ing-dialog open>
        <div slot="title">Custom Title</div>
        <div slot="content">Custom Content</div>
        <div slot="confirmText">Custom Confirm</div>
        <div slot="cancelText">Custom Cancel</div>
      </ing-dialog>
    `);
    
    await slotElement.updateComplete;
    
    // Slotlara yerleştirilmiş öğeleri kontrol et
    const titleSlot = slotElement.querySelector('[slot="title"]');
    expect(titleSlot).to.exist;
    expect(titleSlot.textContent).to.equal('Custom Title');
    
    const contentSlot = slotElement.querySelector('[slot="content"]');
    expect(contentSlot).to.exist;
    expect(contentSlot.textContent).to.equal('Custom Content');
    
    const confirmSlot = slotElement.querySelector('[slot="confirmText"]');
    expect(confirmSlot).to.exist;
    expect(confirmSlot.textContent).to.equal('Custom Confirm');
    
    const cancelSlot = slotElement.querySelector('[slot="cancelText"]');
    expect(cancelSlot).to.exist;
    expect(cancelSlot.textContent).to.equal('Custom Cancel');
  });
}); 