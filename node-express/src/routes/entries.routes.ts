import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { addFavorite, getWord, listWords, removeFavorite } from "../controllers/EntryController";

const router = Router();

router.post('/en/:word/favorite', authMiddleware, addFavorite);
router.delete('/en/:word/unfavorite', authMiddleware, removeFavorite);
router.get('/en/:word', authMiddleware, getWord);
router.get('/en', authMiddleware, listWords);

export default router;