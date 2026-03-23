import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, enum: ['Président', 'Secrétaire', 'Trésorier', 'Membre Actif', 'Sympathisant'], default: 'Membre Actif' },
  status: { type: String, enum: ['Actif', 'En attente', 'Inactif'], default: 'Actif' },
  photo: { type: String },
  joinDate: { type: Date, default: Date.now },
  address: { type: String },
  lastContribution: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Member', memberSchema);
