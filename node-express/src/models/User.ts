import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  history: { word: string; added: Date }[];
  favorites: { word: string; added: Date }[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    history: [{
      word: String,
      added: { type: Date, default: Date.now() },
    }],
    favorites: [{
      word: String,
      added: { type: Date, default: Date.now() }
    }]
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema)