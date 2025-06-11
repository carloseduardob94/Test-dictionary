import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import entryRoutes from "./entries.routes";

const router = Router();

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/entries', entryRoutes)

export default router;