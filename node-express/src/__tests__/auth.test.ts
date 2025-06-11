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

// Limpa os dados após cada teste
afterEach(async () => {
  await User.deleteMany({});
})

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