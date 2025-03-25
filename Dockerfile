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

# Nginx kullanıcısını root olarak ayarla
USER root

# Çalışma dizinini ayarla
WORKDIR /usr/share/nginx/html

# Build edilmiş dosyaları kopyala
COPY --from=builder /app/dist .

# Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx cache dizinleri için izinleri ayarla
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/cache/nginx/proxy_temp && \
    mkdir -p /var/cache/nginx/fastcgi_temp && \
    mkdir -p /var/cache/nginx/uwsgi_temp && \
    mkdir -p /var/cache/nginx/scgi_temp && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Nginx kullanıcısına geç
USER nginx

# Port'u aç
EXPOSE 8080

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 