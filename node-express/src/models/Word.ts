import { Document, model, Schema } from "mongoose";

export interface IWord extends Document {
  word: string;
}

const wordSchema = new Schema<IWord>({
  word: { type: String, required: true, unique: true }
});

export const Word = model<IWord>('Word', wordSchema);