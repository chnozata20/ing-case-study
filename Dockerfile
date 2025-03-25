# Build aşaması
FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Production aşaması
FROM --platform=linux/amd64 nginx:alpine

# wget kurulumu (health check için)
RUN apk add --no-cache wget

# Build edilmiş dosyaları kopyala
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/src/assets /usr/share/nginx/html/assets

# Port'u aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 