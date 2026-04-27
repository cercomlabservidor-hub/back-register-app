# Etapa 1: Instalación de dependencias
FROM node:20-alpine AS deps

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm ci --omit=dev

# Etapa 2: Aplicación de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Creamos un usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs

# Copiamos las dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiamos el código fuente
COPY package.json ./
COPY server.js ./
COPY src ./src

# Cambiamos al usuario no-root
USER expressjs

# Puerto por defecto de la API (configurable vía variable de entorno)
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]
