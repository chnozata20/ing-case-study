# Base image - Build aşaması
FROM --platform=linux/amd64 node:18-alpine AS builder

# Güvenlik için root olmayan kullanıcı oluştur
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# Çalışma dizinini ayarla
WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm ci

# Kaynak kodları kopyala
COPY . .

# Uygulamayı derle
RUN npm run build

# Üretim aşaması
FROM --platform=linux/amd64 nginx:alpine

# Güvenlik için root olmayan kullanıcı oluştur
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# wget kurulumu
RUN apk add --no-cache wget

# Build çıktısını nginx'e kopyala
COPY --from=builder --chown=appuser:nodejs /app/dist /usr/share/nginx/html

# Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Portu dışarı aç
EXPOSE 80

# Root olmayan kullanıcıya geç
USER appuser

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 