# ============================================
# STAGE 1: Build del CV
# ============================================
# node:22-alpine (pin 2026-08-04)
FROM node:22-alpine@sha256:c610fcdfb1d5b4740dd70c284ed3cb16bb857e0f7166196e36a5501df7a3aa32 AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci && \
    npm cache clean --force

# Copiar código fuente
COPY . .

# Build del proyecto
RUN npm run build
# ============================================
# STAGE 2: Servir con Nginx
# ============================================
# nginx:alpine (pin 2026-08-04)
FROM nginx:alpine@sha256:4a73073bd557c65b759505da037898b61f1be6cbcc3c2c3aeac22d2a470c1752 AS htmlblog

# Eliminar la web por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar config de nginx (SPA fallback, ocultar versión)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copiar el build
COPY --from=builder /app/dist/Aragorn7372/browser/ /usr/share/nginx/html

# ⬅️ AÑADIR: Dar permisos correctos
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Config principal de nginx con rutas escribibles por usuario no-root
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Ejecutar como usuario no privilegiado
USER nginx

