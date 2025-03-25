/**
 * Çalışan formu validasyon fonksiyonları
 */
import { translate } from '../translations/index.js';
import { employeeValidationRules } from '../config/validation-config.js';

/**
 * Validasyon yardımcı fonksiyonları
 */

// Değerin boş olup olmadığını kontrol eder
const isEmpty = (value) => {
  return value === undefined || value === null || String(value).trim() === '';
};

// Değerin belirli bir minimum uzunlukta olup olmadığını kontrol eder
const hasMinLength = (value, minLength) => {
  return String(value).trim().length >= minLength;
};

// Değerin belirli bir maksimum uzunlukta olup olmadığını kontrol eder
const hasMaxLength = (value, maxLength) => {
  return String(value).trim().length <= maxLength;
};

// Değerin belirli bir desene uyup uymadığını kontrol eder
const matchesPattern = (value, pattern) => {
  return pattern.test(String(value).trim());
};

// Değerin benzersiz olup olmadığını kontrol eder
const isUnique = (value, collection, idField, currentId) => {
  if (!collection || !Array.isArray(collection) || collection.length === 0) {
    return true;
  }
  
  return !collection.some(item => 
    String(item[idField]).toLowerCase() === String(value).trim().toLowerCase() && 
    (!currentId || item.id !== currentId)
  );
};

// Değerin geçerli bir tarih olup olmadığını kontrol eder
const isValidDate = (value) => {
  if (!value) return false;
  
  const date = new Date(value);
  return !isNaN(date.getTime());
};

// Yaş hesaplama
const calculateAge = (birthDate) => {
  const birthDateObj = new Date(birthDate);
  const now = new Date();
  
  const ageDiff = now - birthDateObj;
  const ageDate = new Date(ageDiff);
  
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Tarih kontrollerini gerçekleştirir
const validateDateRules = (value, rules, referenceDate = null) => {
  if (rules.required && isEmpty(value)) {
    return translate(rules.messages.required);
  }
  
  if (isEmpty(value)) {
    return null;
  }
  
  try {
    const dateObj = new Date(value);
    const now = new Date();
    
    if (rules.isDate && isNaN(dateObj.getTime())) {
      return translate(rules.messages.isDate);
    }
    
    if (rules.noFutureDate && dateObj > now) {
      return translate(rules.messages.noFutureDate);
    }
    
    if (rules.minAge) {
      const age = calculateAge(value);
      if (age < rules.minAge) {
        return translate(rules.messages.minAge);
      }
    }
    
    if (rules.maxAge) {
      const age = calculateAge(value);
      if (age > rules.maxAge) {
        return translate(rules.messages.maxAge);
      }
    }
    
    if (rules.afterBirthDate && referenceDate) {
      const refDateObj = new Date(referenceDate);
      
      if (!isNaN(refDateObj.getTime())) {
        if (dateObj < refDateObj) {
          return translate(rules.messages.afterBirthDate);
        }
        
        if (rules.minAgeAtHire) {
          const hireDateDiff = dateObj - refDateObj;
          const hireDateAge = new Date(hireDateDiff);
          const ageAtHire = Math.abs(hireDateAge.getUTCFullYear() - 1970);
          
          if (ageAtHire < rules.minAgeAtHire) {
            return translate(rules.messages.minAgeAtHire);
          }
        }
      }
    }
  } catch (e) {
    return translate(rules.messages.formatError);
  }
  
  return null;
};

// Bir değerin belirli bir listenin içinde olup olmadığını kontrol eder
const isInOptions = (value, options, valueField = 'value') => {
  if (!options || !Array.isArray(options) || options.length === 0) {
    return true;
  }
  
  return options.some(option => option[valueField] === value);
};

/**
 * Genel validasyon fonksiyonu
 * Konfigürasyon dosyasındaki kurallara göre validasyon yapar
 */
const validateField = (fieldName, value, rules, options = {}) => {
  const fieldRules = rules[fieldName];
  
  if (!fieldRules) {
    return null;
  }
  
  // Zorunlu alan kontrolü
  if (fieldRules.required && isEmpty(value)) {
    return translate(fieldRules.messages.required);
  }
  
  // Boş ise diğer kontrolleri yapmaya gerek yok
  if (isEmpty(value)) {
    return null;
  }
  
  // Minimum uzunluk kontrolü
  if (fieldRules.minLength && !hasMinLength(value, fieldRules.minLength)) {
    return translate(fieldRules.messages.minLength);
  }
  
  // Maksimum uzunluk kontrolü
  if (fieldRules.maxLength && !hasMaxLength(value, fieldRules.maxLength)) {
    return translate(fieldRules.messages.maxLength);
  }
  
  // Desen kontrolü
  if (fieldRules.pattern && !matchesPattern(value, fieldRules.pattern)) {
    return translate(fieldRules.messages.pattern);
  }
  
  // Benzersizlik kontrolü
  if (fieldRules.unique && options.collection) {
    const idField = options.idField || fieldName;
    if (!isUnique(value, options.collection, idField, options.currentId)) {
      return translate(fieldRules.messages.unique);
    }
  }
  
  // Tarih kontrolleri
  if (fieldRules.isDate) {
    const referenceDate = options.referenceDate;
    return validateDateRules(value, fieldRules, referenceDate);
  }
  
  // Seçenek kontrolü
  if (fieldRules.inOptions && options.options) {
    if (!isInOptions(value, options.options)) {
      return translate(fieldRules.messages.inOptions);
    }
  }
  
  return null;
};

/**
 * Form validasyon fonksiyonu
 * Tüm alanları validate eder ve hataları döndürür
 */
export const validateEmployeeForm = (formData, options = {}) => {
  const { employees = [], departments = [], positions = [], currentId = null } = options;
  const errors = {};
  const { firstName, lastName, email, phone, birthDate, startDate, department, position } = formData;
  
  // İsim validasyonu
  const firstNameError = validateField('firstName', firstName, employeeValidationRules);
  if (firstNameError) errors.firstName = firstNameError;
  
  // Soyisim validasyonu
  const lastNameError = validateField('lastName', lastName, employeeValidationRules);
  if (lastNameError) errors.lastName = lastNameError;
  
  // E-posta validasyonu
  const emailError = validateField('email', email, employeeValidationRules, {
    collection: employees,
    idField: 'email',
    currentId: currentId
  });
  if (emailError) errors.email = emailError;
  
  // Telefon validasyonu
  const phoneError = validateField('phone', phone, employeeValidationRules);
  if (phoneError) errors.phone = phoneError;
  
  // Doğum tarihi validasyonu
  const birthDateError = validateField('birthDate', birthDate, employeeValidationRules);
  if (birthDateError) errors.birthDate = birthDateError;
  
  // İşe başlama tarihi validasyonu
  const startDateError = validateField('startDate', startDate, employeeValidationRules, {
    referenceDate: birthDate
  });
  if (startDateError) errors.startDate = startDateError;
  
  // Departman validasyonu
  const departmentError = validateField('department', department, employeeValidationRules, {
    options: departments
  });
  if (departmentError) errors.department = departmentError;
  
  // Pozisyon validasyonu
  const positionError = validateField('position', position, employeeValidationRules, {
    options: positions
  });
  if (positionError) errors.position = positionError;
  
  return errors;
};

// Eski validasyon fonksiyonları yerine yenilerini dışa aktarıyoruz
export default validateEmployeeForm; 