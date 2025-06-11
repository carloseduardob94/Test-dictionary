import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { fetchWordData } from "../services/DictionaryService";
import { Word } from "../models/Word";

export const addFavorite = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const word = req.params.word

  if (!user) return res.status(401).json({ message: 'Não autorizado.' });

  const alreadyFavorited = user.favorites.some((fav: any) => fav.word === word);
  if (alreadyFavorited) {
    return res.status(400).json({ message: 'Palavra já favoritada' });
  }

  user.favorites.push({ word, added: new Date() });
  await user.save();

  return res.status(204).send();
}

export const removeFavorite = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const word = req.params.word;

  if (!user) return res.status(401).json({ message: 'Não autorizado.' });

  user.favorites = user.favorites.filter((fav: any) => fav.word !== word);
  await user.save();

  return res.status(204).send();
}

export const getWord = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const word = req.params.word;

  try {
    //1. Consulta a API externa
    const wordData = await fetchWordData(word);

    //2. Salva no histórico do usuário se ainda não estiver lá
    const alreadyInHistory = user.history.some((h: any) => h.word === word);

    if (!alreadyInHistory) {
      user.history.push({ word, added: new Date() });
      await user.save()
    }

    //3. Retorna os dados da palavra
    res.status(200).json(wordData);
  } catch (error) {
    res.status(404).json({ message: 'Palavra não encontrada.' })
  }
}

export const listWords = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || '';
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;

  try {
    const filter = search
      ? { word: { $regex: `^${search}`, $options: 'i' } }
      : {};

    const totalDocs = await Word.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);
    const skip = (page - 1) * limit;

    const results = await Word.find(filter)
      .sort({ word: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      results: results.map(w => w.word),
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar palavras.' })
  }
}