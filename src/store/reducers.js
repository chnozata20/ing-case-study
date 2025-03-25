import { combineReducers } from 'redux';
import employeeReducer from './slices/employeeSlice.js';
import localeReducer from './slices/localeSlice.js';

// Root Reducer
export default combineReducers({
  employees: employeeReducer,
  locale: localeReducer
}); 