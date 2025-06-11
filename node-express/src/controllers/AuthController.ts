import { Request, Response } from 'express';
import { User } from '../models/User';
import { comparePassword, generateToken, hashPassword } from '../utils/auth';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user);

    return res.status(201).json({
      id: user._id,
      name: user.name,
      token: `Bearer ${token}`
    })
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    const token = generateToken(user);
    return res.status(200).json({
      id: user._id,
      name: user.name,
      token: `Bearer ${token}`
    })
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' })
  }
}