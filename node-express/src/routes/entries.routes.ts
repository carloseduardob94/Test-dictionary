import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { addFavorite, getWord, removeFavorite } from "../controllers/EntryController";

const router = Router();

router.post('/en/:word/favorite', authMiddleware, addFavorite);
router.delete('/en/:word/unfavorite', authMiddleware, removeFavorite);
router.get('/en/:word', authMiddleware, getWord);

export default router;