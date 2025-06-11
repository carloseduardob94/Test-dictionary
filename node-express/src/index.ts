import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

//Middlewares
app.use(cors());
app.use(express.json());

app.use(routes);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Fullstack Challenge 🏅 - Dictionary' });
});

const startServer = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
};

startServer();