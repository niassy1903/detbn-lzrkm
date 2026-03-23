import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Événements', 'Religieux', 'Social', 'Éducation'], default: 'Événements' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  url: { type: String, required: true },
  thumbnail: { type: String },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Gallery', gallerySchema);
