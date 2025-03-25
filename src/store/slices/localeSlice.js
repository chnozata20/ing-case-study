import { createSlice } from '@reduxjs/toolkit';
import { availableLocales, translate as translateFn } from '../../translations/index.js';

// Başlangıç durumu
const initialState = {
  locale: localStorage.getItem('locale') || 'tr',
  availableLocales: availableLocales
};

// Locale slice
const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
      localStorage.setItem('locale', action.payload);
      document.documentElement.lang = action.payload;
    }
  }
});

export const { setLocale } = localeSlice.actions;

// Harici dosyalardaki çeviri fonksiyonunu dışa aktar
export const translate = translateFn;

export default localeSlice.reducer;