import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  category: { type: String, enum: ['Actualité', 'Événement', 'Annonce', 'Spiritualité'], default: 'Actualité' },
  image: { type: String },
  tags: [String],
  publishedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('News', newsSchema);
