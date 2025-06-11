import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import { Word } from '../models/Word';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
const WORD_LIST_URL = 'https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt';

const importWordList = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Conectado ao MongoDB');

    const { data } = await axios.get(WORD_LIST_URL);
    const words = data.split('\n').map((word: string) => ({ word: word.trim() }));

    // Remove palavras vazias
    const validWords = words.filter((w: any) => w.word.length > 0);

    // Inserção com "ordered: false" ignora duplicadas
    await Word.insertMany(validWords, { ordered: false });

    console.log(`✅ ${validWords.length} palavras importadas com sucesso!`);
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Erro ao importar palavras:', err.message);
    process.exit(1);
  }
};

importWordList();