/**
 * Mock slices module - redux slice'larının mocklanmış versiyonu
 */

// Employee slice action creators
export const addEmployee = (employee) => ({
  type: 'employees/addEmployee',
  payload: employee
});

export const updateEmployee = (employee) => ({
  type: 'employees/updateEmployee',
  payload: employee
});

export const deleteEmployee = (id) => ({
  type: 'employees/deleteEmployee',
  payload: id
});

export const setEmployees = (employees) => ({
  type: 'employees/setEmployees',
  payload: employees
});

// Locale slice action creators
export const setLocale = (locale) => ({
  type: 'locale/setLocale',
  payload: locale
});

// Employee slice selectors
export const selectEmployees = (state) => state.employees.employees;

// Locale slice selectors
export const selectLocale = (state) => state.locale.locale;

// Mock reducers (testler için gerekirse)
export const employeeReducer = (state = { employees: [] }, action) => {
  return state;
};

export const localeReducer = (state = { locale: 'tr' }, action) => {
  return state;
};

// Default export for ES modules
export default {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setEmployees,
  setLocale,
  selectEmployees,
  selectLocale,
  employeeReducer,
  localeReducer
}; 