import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, required: true },
  image: { type: String },
  excerpt: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const News = mongoose.model('News', newsSchema);
export default News;
