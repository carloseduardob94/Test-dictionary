import { Response, Router } from "express";
import { AuthenticatedRequest, authMiddleware } from "../middlewares/auth";
import { getFavorites, getHistory } from "../controllers/UserController";

const router = Router();

router.get("/me", authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json(req.user)
})
router.get('/me/history', authMiddleware, getHistory);
router.get('/me/favorites', authMiddleware, getFavorites);

export default router;