import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export interface AuthenticatedRequest extends Request {
  user?: any
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado.' })
    }

    req.user = user;
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' })
  }
}