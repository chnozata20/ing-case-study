/**
 * Test setup - Override modülleri
 */

// store.js için mock override
export const store = window.mockStore || {
  getState: () => ({ locale: { locale: 'tr' } }),
  subscribe: () => { return () => {}; },
  dispatch: () => {}
};

// translations/index.js için mock override
export const translate = window.mockTranslate || ((key) => key);

// Gerekli diğer mocklar buraya eklenebilir 