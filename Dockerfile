# Build aşaması
FROM node:18-alpine as build

WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala
COPY . .

# Uygulamayı derle
RUN npm run build

# Production aşaması
FROM nginx:alpine

# Build çıktısını nginx'e kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port'u aç
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"] 