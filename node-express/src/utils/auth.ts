import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const SALT_ROUNDS = 8;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS)
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
};

export const generateToken = (user: IUser): string => {
  return jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: '7d',
  });
};
