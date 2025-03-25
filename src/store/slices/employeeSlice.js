import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../utils/localStorage.js';

// LocalStorage'dan mevcut çalışanları yükle
const persistedEmployees = loadState('employees');

const mockEmployees = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@ing.com',
    phone: '555-0001',
    department: 'Tech',
    position: 'Senior',
    startDate: '2023-01-15',
    birthDate: '1990-05-20'
  },
  {
    id: '2',
    firstName: 'Ayşe',
    lastName: 'Kaya',
    email: 'ayse.kaya@ing.com',
    phone: '555-0002',
    department: 'Analytics',
    position: 'Medior',
    startDate: '2022-06-20',
    birthDate: '1985-08-15'
  },
  {
    id: '3',
    firstName: 'Mehmet',
    lastName: 'Demir',
    email: 'mehmet.demir@ing.com',
    phone: '555-0003',
    department: 'Tech',
    position: 'Junior',
    startDate: '2023-03-10',
    birthDate: '1992-03-25'
  },
  {
    id: '4',
    firstName: 'Zeynep',
    lastName: 'Şahin',
    email: 'zeynep.sahin@ing.com',
    phone: '555-0004',
    department: 'Analytics',
    position: 'Senior',
    startDate: '2022-09-05',
    birthDate: '1991-12-10'
  },
  {
    id: '5',
    firstName: 'Can',
    lastName: 'Öztürk',
    email: 'can.ozturk@ing.com',
    phone: '555-0005',
    department: 'Tech',
    position: 'Medior',
    startDate: '2023-07-01',
    birthDate: '1993-07-30'
  },
  {
    id: '6',
    firstName: 'Elif',
    lastName: 'Yıldız',
    email: 'elif.yildiz@ing.com',
    phone: '555-0006',
    department: 'Analytics',
    position: 'Junior',
    startDate: '2023-02-15',
    birthDate: '1995-03-12'
  },
  {
    id: '7',
    firstName: 'Burak',
    lastName: 'Aydın',
    email: 'burak.aydin@ing.com',
    phone: '555-0007',
    department: 'Tech',
    position: 'Senior',
    startDate: '2021-05-10',
    birthDate: '1987-11-22'
  },
  {
    id: '8',
    firstName: 'Selin',
    lastName: 'Koç',
    email: 'selin.koc@ing.com',
    phone: '555-0008',
    department: 'Analytics',
    position: 'Medior',
    startDate: '2022-08-01',
    birthDate: '1993-04-18'
  },
  {
    id: '9',
    firstName: 'Emre',
    lastName: 'Güneş',
    email: 'emre.gunes@ing.com',
    phone: '555-0009',
    department: 'Tech',
    position: 'Junior',
    startDate: '2023-04-20',
    birthDate: '1996-09-05'
  },
  {
    id: '10',
    firstName: 'Ceyda',
    lastName: 'Aksoy',
    email: 'ceyda.aksoy@ing.com',
    phone: '555-0010',
    department: 'Analytics',
    position: 'Senior',
    startDate: '2021-11-25',
    birthDate: '1989-06-30'
  }
];

const initialState = {
  // localStorage'da kayıtlı çalışanlar varsa onları kullan, yoksa mock veriyi kullan
  employees: persistedEmployees && persistedEmployees.employees 
    ? persistedEmployees.employees 
    : mockEmployees,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Veri yüklenirken
    fetchEmployeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Veri yükleme başarılı
    fetchEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    // Veri yükleme başarısız
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Yeni çalışan ekle
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    // Çalışan bilgilerini güncelle
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    // Çalışanı sil
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    }
  }
});

// Action oluşturucular
export const { 
  fetchEmployeesStart, 
  fetchEmployeesSuccess, 
  fetchEmployeesFailure,
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
} = employeeSlice.actions;

// Thunk: Veri yükleme işlemi
export const fetchEmployees = () => async (dispatch, getState) => {
  try {
    dispatch(fetchEmployeesStart());

    // localStorage'dan veri yüklemeyi dene
    const savedEmployees = loadState('employees');
    
    if (savedEmployees && savedEmployees.employees && savedEmployees.employees.length > 0) {
      // Eğer localStorage'da kayıtlı veri varsa, onu kullan
      dispatch(fetchEmployeesSuccess(savedEmployees.employees));
    } else {
      // Normalde burada API isteği yapılırdı, şimdi mock veriyi kullanalım
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(fetchEmployeesSuccess(mockEmployees));
    }
  } catch (error) {
    dispatch(fetchEmployeesFailure(error.message));
  }
};

// Thunk: Çalışan silme işlemi
export const deleteEmployeeAndManagePagination = (id, currentPage, itemsPerPage, currentQuery = '') => async (dispatch, getState) => {
  try {
    // Çalışanı sil
    dispatch(deleteEmployee(id));
    
    // Silme işleminden sonra kalan çalışanları al
    const state = getState();
    const allEmployees = state.employees.employees;
    
    // Şu anda görüntülenen çalışan sayısını hesapla
    const filterEmployees = (employees, query) => {
      if (!query) return employees;
      
      const lowercaseQuery = query.toLowerCase();
      return employees.filter(emp => 
        emp.firstName.toLowerCase().includes(lowercaseQuery) ||
        emp.lastName.toLowerCase().includes(lowercaseQuery) ||
        emp.email.toLowerCase().includes(lowercaseQuery) ||
        emp.department.toLowerCase().includes(lowercaseQuery) ||
        emp.position.toLowerCase().includes(lowercaseQuery)
      );
    };
    
    const filteredEmployees = filterEmployees(allEmployees, currentQuery);
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    
    // Eğer son sayfada işlem yapıldıysa ve sayfa boş kaldıysa, bir önceki sayfaya yönlendir
    return {
      totalPages,
      shouldGoToPreviousPage: currentPage > totalPages && totalPages > 0,
      newPage: totalPages > 0 ? Math.min(currentPage, totalPages) : 1
    };
  } catch (error) {
    console.error('Çalışan silme işlemi sırasında hata:', error);
    return { error: error.message };
  }
};

export default employeeSlice.reducer; 