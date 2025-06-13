# Dockerfile
FROM node:18-alpine AS builder

# Cria diretório app
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .
RUN npm run build

# Expõe a porta da API
EXPOSE 3333

# Comando para iniciar a API
CMD ["npm", "run", "dev"]

# Etapa de produção
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3333
CMD ["node", "dist/index.js"]