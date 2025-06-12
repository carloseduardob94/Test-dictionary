import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (process.env.NODE_ENV === 'test') {
    console.log('🧪 Skipping DB connection in test environment');
    return;
  }

  if (!uri) {
    throw new Error('MONGODB_URI não definida no .env');
  }

  try {
    await mongoose.connect(uri);

    console.log(`📦 MongoDB conectado no ambiente: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
}