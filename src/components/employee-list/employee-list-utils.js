/**
 * Veri filtreleme fonksiyonu
 * @param {Array} employees - Çalışan listesi
 * @param {String} query - Arama sorgusu
 * @returns {Array} Filtrelenmiş çalışan listesi
 */
export const filterEmployees = (employees, query) => {
  if (!query) {
    return employees;
  }

  const lowercaseQuery = query.toLowerCase();
  return employees.filter(employee => {
    return (
      (employee.firstName && employee.firstName.toLowerCase().includes(lowercaseQuery)) ||
      (employee.lastName && employee.lastName.toLowerCase().includes(lowercaseQuery)) ||
      (employee.email && employee.email.toLowerCase().includes(lowercaseQuery)) ||
      (employee.department && employee.department.toLowerCase().includes(lowercaseQuery)) ||
      (employee.position && employee.position.toLowerCase().includes(lowercaseQuery))
    );
  });
};

/**
 * Sayfalama fonksiyonu
 * @param {Array} employees - Filtrelenmiş çalışan listesi
 * @param {Number} page - Aktif sayfa
 * @param {Number} itemsPerPage - Sayfa başına öğe sayısı
 * @returns {Array} Sayfalanmış çalışan listesi
 */
export const paginateEmployees = (employees, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return employees.slice(startIndex, endIndex);
};

/**
 * Tablo görünümü için kullanılan sütun tanımlarını oluşturur
 * @param {Function} templateFunction - Lit html template fonksiyonu
 * @returns {Array} Sütun tanımları
 */
export const getTableHeaders = (templateFunction) => {
  return [
    { id: 'select', label: templateFunction``, class: 'col-select' },
    { id: 'firstName', label: templateFunction`<i18n-text key="firstName"></i18n-text>`, class: 'col-firstName' },
    { id: 'lastName', label: templateFunction`<i18n-text key="lastName"></i18n-text>`, class: 'col-lastName' },
    { id: 'startDate', label: templateFunction`<i18n-text key="startDate"></i18n-text>`, class: 'col-startDate' },
    { id: 'birthDate', label: templateFunction`<i18n-text key="birthDate"></i18n-text>`, class: 'col-birthDate' },
    { id: 'phone', label: templateFunction`<i18n-text key="phone"></i18n-text>`, class: 'col-phone' },
    { id: 'email', label: templateFunction`<i18n-text key="email"></i18n-text>`, class: 'col-email' },
    { id: 'department', label: templateFunction`<i18n-text key="department"></i18n-text>`, class: 'col-department' },
    { id: 'position', label: templateFunction`<i18n-text key="position"></i18n-text>`, class: 'col-position' },
    { id: 'actions', label: templateFunction`<i18n-text key="actions"></i18n-text>`, class: 'col-actions' }
  ];
}; 