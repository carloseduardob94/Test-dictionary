
# 📘 Dictionary API

API para autenticação de usuários, consulta de definições de palavras em inglês, histórico de buscas e gerenciamento de palavras favoritas.

## 🚀 Tecnologias Utilizadas

- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- Docker + Docker Compose
- JWT para autenticação
- Swagger para documentação da API
- Jest + Supertest para testes automatizados

---

## 🛠️ Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/carloseduardob94/Test-dictionary.git
cd Test-dictionary/node-express
```

2. Instale as dependências:
```bash
npm install
```

3. Copie o `.env.example` e crie um `.env`:
```bash
cp .env.example .env
```

4. Rode localmente:
```bash
npm run dev
```

---

## 🐳 Como Rodar com Docker

1. Certifique-se de que o Docker esteja instalado e ativo.

2. Suba os containers:
```bash
docker-compose up --build
```

3. A API estará acessível em `http://localhost:3333`.

---

## 🔐 Variáveis de Ambiente (.env)

```env
MONGO_URI=mongodb://mongo:27017/dictionary-db
JWT_SECRET=supersecretjwt
```

---

## 🧪 Rodando os Testes

```bash
npm run test
```

---

## 📚 Documentação Swagger

Após rodar o projeto, acesse:  
```
http://localhost:3333/api-docs
```

---

## 📦 Endpoints Principais

### Autenticação

- `POST /auth/signup`
- `POST /auth/signin`

### Usuário

- `GET /user/me`
- `GET /user/me/history`
- `GET /user/me/favorites`

### Palavras

- `GET /entries/en/{word}`
- `POST /entries/en/{word}/favorite`
- `DELETE /entries/en/{word}/unfavorite`

---

## ✅ Requisitos Entregues

- [x] Autenticação com JWT
- [x] Histórico e favoritos por usuário
- [x] Integração com dicionário externo
- [x] Documentação Swagger
- [x] Testes com Jest e Supertest
- [x] Docker funcional

---

## 💬 Contato

[LinkedIn - Carlos Eduardo](https://www.linkedin.com/in/carloseduardob94-dev/)
