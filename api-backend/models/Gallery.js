import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
