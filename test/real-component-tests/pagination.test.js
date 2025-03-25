import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/pagination.js';

describe('Pagination Component Tests', () => {
  let element;
  
  beforeEach(async () => {
    element = await fixture(html`
      <ing-pagination 
        .currentPage=${1} 
        .totalPages=${10} 
        .maxVisiblePages=${5}
      ></ing-pagination>
    `);
  });
  
  it('renders pagination with correct initial state', () => {
    const buttons = element.shadowRoot.querySelectorAll('.page-button');
    const prevButton = element.shadowRoot.querySelector('.control-button[aria-label="Previous Page"]');
    const nextButton = element.shadowRoot.querySelector('.control-button[aria-label="Next Page"]');
    
    // İlk sayfada bulunduğumuz için "Önceki" butonu devre dışı olmalı
    expect(prevButton.hasAttribute('disabled')).to.be.true;
    expect(prevButton.classList.contains('disabled')).to.be.true;
    
    // Sayfa butonlarının doğru sayıda ve doğru aktif durumda olduğunu kontrol edelim
    expect(buttons.length).to.equal(6); // Uygulama 6 sayfa butonu gösteriyor
    expect(buttons[0].classList.contains('active')).to.be.true; // İlk sayfa aktif olmalı
    
    // "Sonraki" butonu etkin olmalı
    expect(nextButton.hasAttribute('disabled')).to.be.false;
  });
  
  it('navigates to the next page when next button is clicked', async () => {
    const nextButton = element.shadowRoot.querySelector('.control-button[aria-label="Next Page"]');
    
    let pageChangeEvent = null;
    element.addEventListener('page-change', (e) => {
      pageChangeEvent = e;
    });
    
    nextButton.click();
    
    // Event'in doğru veriyle tetiklendiğini kontrol edelim
    expect(pageChangeEvent).to.not.be.null;
    expect(pageChangeEvent.detail.page).to.equal(2);
  });
  
  it('navigates to the previous page when previous button is clicked', async () => {
    // Önce 2. sayfaya ayarlayalım
    element.currentPage = 2;
    await element.updateComplete;
    
    const prevButton = element.shadowRoot.querySelector('.control-button[aria-label="Previous Page"]');
    
    let pageChangeEvent = null;
    element.addEventListener('page-change', (e) => {
      pageChangeEvent = e;
    });
    
    prevButton.click();
    
    // Event'in doğru veriyle tetiklendiğini kontrol edelim
    expect(pageChangeEvent).to.not.be.null;
    expect(pageChangeEvent.detail.page).to.equal(1);
  });
  
  it('handles ellipsis rendering for many pages', async () => {
    element.currentPage = 5;
    element.totalPages = 20;
    await element.updateComplete;
    
    const ellipsis = element.shadowRoot.querySelectorAll('.ellipsis');
    
    // İki ellipsis olmalı (önceki ve sonraki sayfalar için)
    expect(ellipsis.length).to.equal(2);
  });
  
  it('disables next button on last page', async () => {
    element.currentPage = 10;
    element.totalPages = 10;
    await element.updateComplete;
    
    const nextButton = element.shadowRoot.querySelector('.control-button[aria-label="Next Page"]');
    
    expect(nextButton.hasAttribute('disabled')).to.be.true;
    expect(nextButton.classList.contains('disabled')).to.be.true;
  });
  
  it('does not trigger page change when clicking on the current page', async () => {
    const activeButton = element.shadowRoot.querySelector('.page-button.active');
    
    let pageChangeEvent = null;
    element.addEventListener('page-change', (e) => {
      pageChangeEvent = e;
    });
    
    activeButton.click();
    
    // Event tetiklenmemeli
    expect(pageChangeEvent).to.be.null;
  });
}); 