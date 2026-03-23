import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Word', 'Excel', 'Image'], default: 'PDF' },
  category: { type: String, enum: ['Administratif', 'Religieux', 'Éducatif', 'Financier'], default: 'Administratif' },
  size: { type: String },
  url: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  status: { type: String, enum: ['Public', 'Privé'], default: 'Public' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Document', documentSchema);
