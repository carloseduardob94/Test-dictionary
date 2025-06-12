import request from 'supertest';
import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import { User } from '../models/User';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

// Encerra a conexão depois de tudo
afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('Auth Routes', () => {
  it('deve cadastrar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        name: 'Carlos',
        email: 'carlos@email.com',
        password: '123456'
      })

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('name', 'Carlos');
  });

  it('deve fazer login com o usuário criado', async () => {
    await request(app).post('/auth/signup').send({
      name: 'Carlos',
      email: 'carlos@email.com',
      password: '123456'
    });

    const res = await request(app).post('/auth/signin').send({
      email: 'carlos@email.com',
      password: '123456'
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('name', 'Carlos');
  });
});

describe('User Functional Routes', () => {
  const createUserAndLogin = async () => {
    const email = `carlos@email.com`;
    const password = '123456';
    await request(app).post('/auth/signup').send({ name: 'Test', email, password });
    const res = await request(app).post('/auth/signin').send({ email, password });

    let token = res.body.token.replace(/^Bearer\s/, '');
    return token;
  };

  it('deve retornar os dados do usuário autenticado', async () => {
    const token = await createUserAndLogin();
    const res = await request(app)
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'carlos@email.com');
  });

  it('deve buscar uma palavra e salvar no histórico', async () => {
    const token = await createUserAndLogin();
    const res = await request(app)
      .get(`/entries/en/book`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('word', 'book');
  });

  it('deve retornar o histórico de buscas', async () => {
    const token = await createUserAndLogin();

    const res = await request(app)
      .get('/user/me/history')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
    expect(res.body.results[0]).toHaveProperty('word', 'book');
  });

  it('deve adicionar uma palavra aos favoritos', async () => {
    const token = await createUserAndLogin();
    const res = await request(app)
      .post('/entries/en/house/favorite')
      .set('Authorization', `Bearer ${token}`);

    expect([200, 204]).toContain(res.status); // aceita 204 (sem conteúdo) ou 200 com mensagem
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message');
    }
  });

  it('deve retornar palavras favoritas', async () => {
    const token = await createUserAndLogin();

    const res = await request(app)
      .get('/user/me/favorites')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
    expect(res.body.results[0]).toHaveProperty('word', 'house');
  });

  it('deve remover uma palavra dos favoritos', async () => {
    const token = await createUserAndLogin();
    await request(app)
      .post('/entries/en/moon/favorite')
      .set('Authorization', `Bearer ${token}`);

    const res = await request(app)
      .delete('/entries/en/moon/unfavorite')
      .set('Authorization', `Bearer ${token}`);

    expect([200, 204]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message');
    }
  });
});