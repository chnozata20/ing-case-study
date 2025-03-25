import en from './en.js';
import tr from './tr.js';
import { store } from '../store/store.js';

// Tüm desteklenen diller
export const translations = {
  en,
  tr
};

// Varsayılan ve desteklenen diller
export const sourceLocale = 'tr';
export const targetLocales = ['en'];
export const availableLocales = ['tr', 'en'];

// Mevcut dil ayarını al
export const getCurrentLocale = () => {
  // store'dan durumu doğrudan oku
  const state = store.getState();
  return state.locale?.locale || localStorage.getItem('locale') || sourceLocale;
};

// Çeviri yardımcı fonksiyonu
export const translate = (key, locale = null) => {
  const currentLocale = locale || getCurrentLocale();
  
  // İlgili dilde çeviri varsa kullan
  if (translations[currentLocale] && translations[currentLocale][key]) {
    return translations[currentLocale][key];
  }
  
  // Yoksa Türkçe'ye düş
  if (translations.tr[key]) {
    return translations.tr[key];
  }
  
  // Hiçbir çeviri yoksa anahtar değerini döndür
  return key;
}; 