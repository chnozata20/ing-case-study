/**
 * Mock store modülü - test ortamı için redux store mocklanmış versiyonu
 */

// Global mock store nesnesini dışa aktar
export const store = {
  getState: () => ({
    employees: { employees: [] },
    locale: { locale: 'tr' }
  }),
  dispatch: () => {},
  subscribe: () => () => {} // unsubscribe fonksiyonu döndürür
};

// Mock redux-mixin fonksiyonu
export const connect = () => baseClass => class extends baseClass {
  // Mock stateChanged metodu
  stateChanged() {}
};

// Mock actions
export const addEmployee = () => ({ type: 'employees/addEmployee' });
export const updateEmployee = () => ({ type: 'employees/updateEmployee' });
export const deleteEmployee = () => ({ type: 'employees/deleteEmployee' });
export const setEmployees = () => ({ type: 'employees/setEmployees' });
export const setLocale = (locale) => ({ type: 'locale/setLocale', payload: locale }); 