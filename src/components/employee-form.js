import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { addEmployee, updateEmployee } from '../store/slices/employeeSlice.js';
import { connect } from '../store/redux-mixin.js';
import { store } from '../store/store.js';
import '../components/i18n-text.js';
import '../components/common/button.js';
import '../components/common/form-field.js';
import '../components/common/form-group.js';
import '../components/common/select-field.js';
import '../components/common/dialog.js';
import { translate } from '../translations/index.js';
import validateEmployeeForm from '../utils/validation.js';

export class EmployeeForm extends connect(store)(LitElement) {
  static get properties() {
    return {
      id: { type: String },
      employee: { type: Object },
      loading: { type: Boolean },
      formErrors: { type: Object },
      confirmDialogOpen: { type: Boolean },
      confirmSubmitDialogOpen: { type: Boolean },
      formData: { type: Object },
      departments: { type: Array },
      positions: { type: Array },
      _currentLocale: { type: String }
    };
  }

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .form-container {
      width: 100%;
    }

    .form-title {
      margin-top: 0;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color, #FF6600);
      display: none;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.75rem;
      margin-bottom: 1.75rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2.5rem;
      padding-top: 1.75rem;
      border-top: 1px solid #e9ecef;
    }

    .error-text {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    /* Dialog content style */
    .highlighted-content {
      margin-top: 0.75rem;
      font-weight: 700;
      color: var(--primary-color, #FF6600);
      font-size: 1.1rem;
      text-align: center;
      padding: 0.5rem;
      background-color: #FFF8F3;
      border-radius: 4px;
      border: 1px solid #FFE0CC;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
    }
  `;

  constructor() {
    super();
    this.id = null;
    this.employee = null;
    this.loading = false;
    this.formErrors = {};
    this.confirmDialogOpen = false;
    this.confirmSubmitDialogOpen = false;
    this.formData = this._getEmptyFormData();
    
    // Departman ve pozisyon seçeneklerini ayarla
    this._updateSelectOptions();
  }

  _getEmptyFormData() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      startDate: '',
      department: '',
      position: ''
    };
  }

  _updateSelectOptions() {
    // Talep edilen değerler - çeviri anahtarlarını kullanarak
    this.departments = [
      { value: 'Tech', label: 'Tech' },
      { value: 'Analytics', label: 'Analytics' }
    ];
    
    this.positions = [
      { value: 'Junior', label: 'Junior' },
      { value: 'Medior', label: 'Medior' },
      { value: 'Senior', label: 'Senior' }
    ];
  }

  stateChanged(state) {
    // Dil değişikliğini kontrol et
    if (state.locale?.locale !== this._currentLocale) {
      this._currentLocale = state.locale?.locale;
      
      // Dil değiştiğinde departman ve pozisyon seçeneklerini güncelle
      this._updateSelectOptions();
      
      // Dil değişikliğinde bileşeni güncelle
      this.requestUpdate();
    }

    // Çalışanlar değişirse ve biz bir düzenleme modundaysak, çalışan verilerini güncelle
    if (this.id && state.employees?.employees) {
      const employee = state.employees.employees.find(emp => emp.id === this.id);
      if (employee && JSON.stringify(employee) !== JSON.stringify(this.employee)) {
        this.employee = employee;
        this.formData = { ...employee };
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Mevcut dili sakla
    const state = store.getState();
    this._currentLocale = state.locale?.locale;
    
    // Eğer ID varsa, çalışan bilgilerini getir
    if (this.id) {
      this._fetchEmployeeData();
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('id') && this.id) {
      this._fetchEmployeeData();
    }
  }

  _fetchEmployeeData() {
    // Store'dan çalışan verilerini al
    const state = store.getState();
    const employees = state.employees.employees || [];
    const employee = employees.find(emp => emp.id === this.id);
    
    if (employee) {
      this.employee = employee;
      this.formData = { ...employee };
    } else {
      // Çalışan bulunamadıysa listeye geri dön
      Router.go('/');
    }
  }

  _validateForm() {
    // Redux store'dan çalışan verilerini al
    const state = store.getState();
    const employees = state.employees.employees || [];
    
    // Validasyon için gerekli parametreleri hazırla
    const options = {
      employees,
      departments: this.departments,
      positions: this.positions,
      currentId: this.id
    };
    
    // Konfigürasyon tabanlı modüler validasyon sistemini kullan
    return validateEmployeeForm(this.formData, options);
  }

  _handleSubmit(e) {
    console.log('_handleSubmit fonksiyonu çağrıldı', e);
    
    // Varsayılan davranışı engelle
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    try {
      // Formu doğrula
      const errors = this._validateForm();
      console.log('Form doğrulama sonucu:', errors);
      
      this.formErrors = errors;
      
      console.log('Form verileri:', this.formData);
      
      if (Object.keys(errors).length > 0) {
        console.log('Form doğrulama hatası var, işlem durduruldu');
        return;
      }
      
      // Onay diyaloğunu göster
      console.log('Onay diyaloğu açılıyor');
      this.confirmSubmitDialogOpen = true;
      this.requestUpdate();
    } catch (err) {
      console.error('_handleSubmit içinde hata oluştu:', err);
    }
  }
  
  _handleConfirmSubmit() {
    console.log('_handleConfirmSubmit fonksiyonu çağrıldı');
    
    // Form verilerini hazırla
    const formData = { ...this.formData };
    
    console.log('Onay verildi, kayıt işlemi başlıyor');
    
    try {
      if (this.id) {
        // Mevcut çalışanı güncelle
        formData.id = this.id;
        console.log('Çalışan güncelleniyor:', formData);
        store.dispatch(updateEmployee(formData));
      } else {
        // Yeni çalışan ekle
        formData.id = Date.now().toString();
        console.log('Yeni çalışan ekleniyor:', formData);
        store.dispatch(addEmployee(formData));
      }
      
      // Diyaloğu kapat
      this.confirmSubmitDialogOpen = false;
      
      // Çalışan listesine geri dön
      console.log('İşlem tamamlandı, ana sayfaya yönlendiriliyor');
      Router.go('/');
    } catch (err) {
      console.error('_handleConfirmSubmit içinde hata oluştu:', err);
    }
  }
  
  _handleCancelSubmit() {
    // Diyaloğu kapat
    this.confirmSubmitDialogOpen = false;
  }

  _handleCancel() {
    // Onaylama diyaloğunu göster
    this.confirmDialogOpen = true;
  }

  _handleConfirmCancel() {
    // İptal işlemini onayla ve listeye geri dön
    this.confirmDialogOpen = false;
    Router.go('/');
  }

  _handleCancelDialog() {
    // Diyaloğu kapat
    this.confirmDialogOpen = false;
  }

  _handleInputChange(field, e) {
    // Input değerlerini güncelle
    this.formData = {
      ...this.formData,
      [field]: e.target.value
    };
    
    // Hataları temizle
    if (this.formErrors[field]) {
      delete this.formErrors[field];
      this.formErrors = { ...this.formErrors };
    }
  }

  render() {
    const isEditMode = Boolean(this.id);
    
    return html`
      <div class="form-container">
        <h2 class="form-title">
          ${isEditMode 
            ? html`<i18n-text key="editEmployee"></i18n-text>` 
            : html`<i18n-text key="addNewEmployee"></i18n-text>`}
        </h2>
        
        <form @submit="${(e) => { console.log('Form submit tetiklendi'); this._handleSubmit(e); }}">
          <div class="form-row">
            <ing-form-field
              label="firstName"
              .value="${this.formData.firstName}"
              .error="${this.formErrors.firstName}"
              @input="${(e) => this._handleInputChange('firstName', e)}"
              required
            ></ing-form-field>
            
            <ing-form-field
              label="lastName"
              .value="${this.formData.lastName}"
              .error="${this.formErrors.lastName}"
              @input="${(e) => this._handleInputChange('lastName', e)}"
              required
            ></ing-form-field>
          </div>
          
          <div class="form-row">
            <ing-form-field
              label="birthDate"
              type="date"
              .value="${this.formData.birthDate}"
              .error="${this.formErrors.birthDate}"
              @input="${(e) => this._handleInputChange('birthDate', e)}"
              required
            ></ing-form-field>
            
            <ing-form-field
              label="startDate"
              type="date"
              .value="${this.formData.startDate}"
              .error="${this.formErrors.startDate}"
              @input="${(e) => this._handleInputChange('startDate', e)}"
              required
            ></ing-form-field>
          </div>
          
          <div class="form-row">
            <ing-form-field
              label="email"
              type="email"
              .value="${this.formData.email}"
              .error="${this.formErrors.email}"
              @input="${(e) => this._handleInputChange('email', e)}"
              required
            ></ing-form-field>
            
            <ing-form-field
              label="phone"
              .value="${this.formData.phone}"
              .error="${this.formErrors.phone}"
              @input="${(e) => this._handleInputChange('phone', e)}"
              required
            ></ing-form-field>
          </div>
          
          <div class="form-row">
            <ing-form-field
              label="department"
              type="select"
              .value="${this.formData.department}"
              .error="${this.formErrors.department}"
              .options="${this.departments}"
              placeholder="selectDepartment"
              @change="${(e) => this._handleInputChange('department', e)}"
              required
            ></ing-form-field>
            
            <ing-form-field
              label="position"
              type="select"
              .value="${this.formData.position}"
              .error="${this.formErrors.position}"
              .options="${this.positions}"
              placeholder="selectPosition"
              @change="${(e) => this._handleInputChange('position', e)}"
              required
            ></ing-form-field>
          </div>
          
          <div class="form-actions">
            <ing-button
              variant="secondary"
              type="button"
              @click=${this._handleCancel}
            >
              <i18n-text key="cancel"></i18n-text>
            </ing-button>
            
            <ing-button
              variant="primary"
              type="button"
              ?loading=${this.loading}
              @click="${(e) => { 
                console.log('Submit butonu tıklandı, manuel submit başlatılıyor');
                e.preventDefault();
                this._handleSubmit(new CustomEvent('submit'));
              }}"
            >
              <i18n-text key=${isEditMode ? 'saveChanges' : 'addEmployee'}></i18n-text>
            </ing-button>
          </div>
        </form>
        
        <!-- İptal onayı diyaloğu -->
        <ing-dialog
          .open=${this.confirmDialogOpen}
          type="warning"
          @confirm=${this._handleConfirmCancel}
          @cancel=${this._handleCancelDialog}
        >
          <span slot="title">${this._t('confirmCancel')}</span>
          <div slot="content">
            <div>${this._t('cancelWarning')}</div>
          </div>
          <span slot="confirmText">${this._t('proceed')}</span>
          <span slot="cancelText">${this._t('goBack')}</span>
        </ing-dialog>
        
        <!-- Gönderme onayı diyaloğu -->
        <ing-dialog
          .open=${this.confirmSubmitDialogOpen}
          type=${isEditMode ? 'update' : 'create'}
          @confirm=${this._handleConfirmSubmit}
          @cancel=${this._handleCancelSubmit}
        >
          ${console.log('Onay diyaloğu render ediliyor:', this.confirmSubmitDialogOpen)}
          <span slot="title">${isEditMode ? this._t('confirmUpdateEmployee') : this._t('confirmAddEmployee')}</span>
          <div slot="content">
            <div class="highlighted-content">
              ${this.formData.firstName} ${this.formData.lastName}
            </div>
          </div>
          <span slot="confirmText">${this._t('proceed')}</span>
          <span slot="cancelText">${this._t('cancel')}</span>
        </ing-dialog>
      </div>
    `;
  }
  
  _t(key) {
    // translate fonksiyonunu daha önce import ettik, bunu doğrudan kullanalım
    return translate(key);
  }
}

customElements.define('ing-employee-form', EmployeeForm); 