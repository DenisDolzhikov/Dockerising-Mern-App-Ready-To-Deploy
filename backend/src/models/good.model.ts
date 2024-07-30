import { Schema, model } from 'mongoose';

interface IGood {
  category: string;
  name: string;
  poster: string;
  price: number;
}

const goodSchema = new Schema<IGood>({
  category: { type: String, required: true },
  name: { type: String, required: true },
  poster: { type: String, required: true },
  price: { type: Number, required: true },
});

goodSchema.index({ name: 'text' });

const Good = model<IGood>('Good', goodSchema);

export { Good };