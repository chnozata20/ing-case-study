import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers.js';
import { setLocale } from './slices/localeSlice.js';
import { saveState, loadState } from '../utils/localStorage.js';
import { fetchEmployeesSuccess } from './slices/employeeSlice.js';

// LocalStorage'dan önceki state'i yükle
const persistedEmployees = loadState('employees');
const savedLocale = localStorage.getItem('locale') || 'tr';

// Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  preloadedState: persistedEmployees ? { 
    employees: { 
      ...persistedEmployees,
      loading: false,
      error: null
    } 
  } : undefined
});

// State değiştiğinde localStorage'a kaydet
store.subscribe(() => {
  const currentState = store.getState();
  saveState('employees', currentState.employees);
});

// Sayfa yüklendiğinde dil ayarlarını başlat
document.addEventListener('DOMContentLoaded', () => {  
  // Sayfa dilini ayarla
  document.documentElement.lang = savedLocale;
  
  // Store'u güncelle
  store.dispatch(setLocale(savedLocale));
  
  // Eğer localStorage'da kaydedilmiş çalışanlar varsa, onları yükle
  if (persistedEmployees && persistedEmployees.employees) {
    store.dispatch(fetchEmployeesSuccess(persistedEmployees.employees));
  }
});