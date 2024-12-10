import { Schema, model, type Document } from 'mongoose';

interface IWord extends Document {
  text: string;
}

// Define the schema for the Word document
const wordSchema = new Schema<IWord>(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

const Word = model<IWord>('Word', wordSchema);

export { type IWord, Word };
