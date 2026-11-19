# ============================================
# STAGE 1: Build del CV
# ============================================
# node:24-alpine = 24.22.1 (pin 2026-10-24, parches Node oct-2026, CVE-2026-111497)
FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS builder

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
# nginx:1.31.9-alpine (pin 2026-11-19, NGINX2Root: CVE-2026-123007/123633/123634/121810/113425)
FROM nginx:1.31.9-alpine@sha256:90b6bd2aec278b16b98221d64deb1d6d35d164567f507ab0716e6053878315aa AS htmlblog

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

