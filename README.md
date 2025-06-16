
# 📘 Dictionary Fullstack App

Aplicação Fullstack que permite usuários autenticados buscarem definições de palavras em inglês, gerenciar favoritos e acompanhar histórico de buscas — com suporte a SSR, paginação e cache.

---

## 🚀 Tecnologias Utilizadas

### 📦 Back-End:
- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **JWT** para autenticação segura
- **Swagger** para documentação da API
- **Jest** + **Supertest** para testes automatizados
- **x-cache** e **x-response-time** nos headers
- **Docker** + **Docker Compose**

### 💻 Front-End:
- **Next.js 15 (App Router)** com **TypeScript**
- **TailwindCSS** + **Shadcn UI** (UI moderna e responsiva)
- **Context API** para autenticação e controle global de palavras
- **Client-side + Server-side Rendering (SSR)**
- **Persistência entre abas**
- **Paginação inteligente**
- **Proteção de rotas com redirecionamento automático**
- **Testes com Jest e React Testing Library**

---

## ✅ Funcionalidades Entregues

- [x] Criar conta e login com persistência via localStorage + cookies
- [x] Tela protegida com redirecionamento automático se não autenticado
- [x] Buscar palavras com fonética, significado e definições
- [x] Adicionar/remover favoritos (persistente no banco)
- [x] Histórico de buscas por usuário
- [x] Paginação funcional e responsiva
- [x] Dados carregados com SSR na primeira renderização
- [x] Cache no back-end para reduzir chamadas à API externa
- [x] Testes automatizados completos (frontend e backend)
- [x] Projeto dockerizado (subida do zero com `docker-compose`)

---

## 🧪 Como Testar

1. **Testes manuais**
   - Criar conta, logar e navegar
   - Buscar palavras e verificar resultados
   - Alternar entre abas e verificar favoritos e histórico
   - Validar SSR no primeiro carregamento
   - Redirecionamento automático para `/signin` se sem token

2. **Testes automatizados**
   ```bash
   # Backend
   cd node-express
   npm run test

   # Frontend
   cd next-client
   npm run test

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
