# Dockerfile
FROM node:18

# Cria diretório app
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta da API
EXPOSE 3333

# Comando para iniciar a API
CMD ["npm", "run", "dev"]