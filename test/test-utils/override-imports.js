/**
 * Bu dosya, testlerde kullanılan bazı modüllerin mocklanması için import override mekanizması sağlar.
 */

// Mock store ve redux işlevleri
const mockStore = {
  getState: () => ({
    employees: { employees: [] },
    locale: { locale: 'tr' },
  }),
  dispatch: () => {},
  subscribe: () => () => {}, // unsubscribe fonksiyonu döndürür
};

// Mock actions
const mockActions = {
  addEmployee: () => ({ type: 'employees/addEmployee' }),
  updateEmployee: () => ({ type: 'employees/updateEmployee' }),
  deleteEmployee: () => ({ type: 'employees/deleteEmployee' }),
  setEmployees: () => ({ type: 'employees/setEmployees' }),
  setLocale: (locale) => ({ type: 'locale/setLocale', payload: locale })
};

// İmport override'larını yükle
export function installOverrides() {
  // Window'a mock nesneleri ekle
  window.mockStore = mockStore;
  window.mockActions = mockActions;

  // Import map ile bazı modülleri override et
  const importMap = {
    imports: {
      '../store/store.js': '/test/test-utils/mock-store.js',
      '/src/store/store.js': '/test/test-utils/mock-store.js',
      '../store/slices/employeeSlice.js': '/test/test-utils/mock-slices.js',
      '/src/store/slices/employeeSlice.js': '/test/test-utils/mock-slices.js',
      '../store/slices/localeSlice.js': '/test/test-utils/mock-slices.js',
      '/src/store/slices/localeSlice.js': '/test/test-utils/mock-slices.js',
    },
  };

  // Import map'i document'a ekle
  const importMapScript = document.createElement('script');
  importMapScript.type = 'importmap';
  importMapScript.textContent = JSON.stringify(importMap);
  document.head.appendChild(importMapScript);
} 