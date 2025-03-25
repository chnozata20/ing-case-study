# ING Case Study - Teknik Dokümantasyon

## 1. Proje Genel Bakış
Bu proje, ING Bank için geliştirilmiş bir web uygulamasıdır. Çalışan bilgilerinin yönetimi ve görüntülenmesi için kullanılmaktadır.

## 2. Kullanılan Teknolojiler

### 2.1 Frontend Teknolojileri
- **Lit**: Web Components oluşturmak için kullanılan modern bir JavaScript kütüphanesi
- **Vite**: Modern web uygulamaları için hızlı bir build tool
- **Redux**: State yönetimi için kullanılan kütüphane
- **@reduxjs/toolkit**: Redux için modern ve optimize edilmiş araçlar
- **@vaadin/router**: Sayfa yönlendirmeleri için kullanılan router
- **@lit/localize**: Çoklu dil desteği için kullanılan kütüphane

### 2.2 UI Bileşenleri ve Stil
- **@fortawesome/fontawesome-free**: İkon kütüphanesi
- **@material-icons/font**: Material Design ikonları
- **country-flag-icons**: Ülke bayrakları için kullanılan kütüphane
- **timeago.js**: Zaman gösterimi için kullanılan kütüphane

### 2.3 Test Araçları
- **@web/test-runner**: Web bileşenleri için test framework'ü
- **@open-wc/testing**: Web Components test araçları
- **jest-mock**: Mock işlemleri için kullanılan kütüphane
- **sinon**: Test spy, stub ve mock kütüphanesi

### 2.4 DevOps ve Deployment
- **Docker**: Konteynerizasyon için
- **Docker Compose**: Çoklu konteyner yönetimi için
- **Nginx**: Production ortamında web sunucusu olarak
- **GitHub**: Versiyon kontrolü ve CI/CD için

## 3. Proje Yapısı

### 3.1 Dizin Yapısı
```
ing-case-study/
├── src/
│   ├── components/     # Web bileşenleri
│   ├── pages/         # Sayfa bileşenleri
│   ├── store/         # Redux store yapılandırması
│   └── assets/        # Statik dosyalar
├── test/              # Test dosyaları
├── public/            # Public statik dosyalar
├── dist/              # Build çıktısı
└── coverage/          # Test coverage raporları
```

### 3.2 Docker Yapılandırması
- **Development**: Hot-reload destekli geliştirme ortamı
- **Production**: Optimize edilmiş ve güvenli production ortamı
- **Multi-stage build**: Optimize edilmiş imaj boyutu için

## 4. Özellikler

### 4.1 Temel Özellikler
- Çalışan bilgilerinin listelenmesi
- Çalışan detaylarının görüntülenmesi
- Çalışan bilgilerinin düzenlenmesi
- Form validasyonları
- Responsive tasarım

### 4.2 Teknik Özellikler
- Web Components tabanlı mimari
- Redux ile state yönetimi
- Client-side routing
- Lazy loading
- CDN üzerinden asset yönetimi

## 5. Deployment

### 5.1 Development Ortamı
```bash
# Geliştirme ortamını başlat
docker-compose up

# Veya arka planda çalıştır
docker-compose up -d
```

### 5.2 Production Ortamı
```bash
# Production ortamını başlat
docker-compose -f docker-compose.prod.yml up -d

# Logları görüntüle
docker-compose -f docker-compose.prod.yml logs -f
```

## 6. Test ve Kalite Kontrol

### 6.1 Test Komutları
```bash
# Testleri çalıştır
npm run test

# Coverage raporu ile testleri çalıştır
npm run test:coverage
```

### 6.2 Linting ve Formatting
- ESLint ile kod kalitesi kontrolü
- Prettier ile kod formatlaması

## 7. Performans Optimizasyonları
- Multi-stage Docker build
- Nginx ile statik dosya servisi
- CDN kullanımı
- Lazy loading
- Code splitting

## 8. Güvenlik Önlemleri
- Production ortamında Nginx kullanımı
- Docker security best practices
- Environment variables kullanımı
- Rate limiting

## 9. Monitoring ve Logging
- Docker logging yapılandırması
- Health check endpoints
- Resource limitleri

## 10. Gelecek Geliştirmeler
- Unit test coverage artırımı
- E2E testlerin eklenmesi
- CI/CD pipeline geliştirmeleri
- Performance monitoring
- Error tracking sistemi 