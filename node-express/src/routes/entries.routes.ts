import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { addFavorite, removeFavorite } from "../controllers/EntryController";

const router = Router();

router.post('/en/:word/favorite', authMiddleware, addFavorite);
router.delete('/en/:word/unfavorite', authMiddleware, removeFavorite);

export default router;