import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json(req.user)
};

export const getHistory = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  res.status(200).json({ results: user?.history });
}

export const getFavorites = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  res.status(200).json({ results: user?.favorites });
}