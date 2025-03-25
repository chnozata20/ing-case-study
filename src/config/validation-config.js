/**
 * Validasyon kuralları konfigürasyonu
 * Bu dosya, tüm formlar için gerekli validasyon kurallarını içerir.
 */

// Çalışan formu için validasyon kuralları
export const employeeValidationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    messages: {
      required: 'name_required',
      minLength: 'name_min_length',
      maxLength: 'name_max_length'
    }
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    messages: {
      required: 'lastname_required',
      minLength: 'lastname_min_length',
      maxLength: 'lastname_max_length'
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique: true,
    messages: {
      required: 'email_required',
      pattern: 'email_invalid',
      unique: 'email_unique'
    }
  },
  phone: {
    required: true,
    pattern: /^[0-9\-\+\s()]{7,15}$/,
    messages: {
      required: 'phone_required',
      pattern: 'phone_invalid'
    }
  },
  birthDate: {
    required: true,
    isDate: true,
    minAge: 18,
    maxAge: 100,
    noFutureDate: true,
    messages: {
      required: 'birth_date_required',
      isDate: 'birth_date_invalid',
      minAge: 'birth_date_min_age',
      maxAge: 'birth_date_max_age',
      noFutureDate: 'birth_date_future',
      formatError: 'birth_date_format'
    }
  },
  startDate: {
    required: true,
    isDate: true,
    noFutureDate: true,
    minAgeAtHire: 18,
    afterBirthDate: true,
    messages: {
      required: 'start_date_required',
      isDate: 'start_date_invalid',
      noFutureDate: 'start_date_future',
      minAgeAtHire: 'start_date_min_age',
      afterBirthDate: 'start_date_order',
      formatError: 'start_date_format'
    }
  },
  department: {
    required: true,
    inOptions: true,
    messages: {
      required: 'department_required',
      inOptions: 'department_invalid'
    }
  },
  position: {
    required: true,
    inOptions: true,
    messages: {
      required: 'position_required',
      inOptions: 'position_invalid'
    }
  }
};

export default {
  employeeValidationRules
}; 