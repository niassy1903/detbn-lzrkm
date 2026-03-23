import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String, enum: ['Religieux', 'Social', 'Éducatif', 'Culturel'], default: 'Religieux' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  status: { type: String, enum: ['À venir', 'Terminé', 'Annulé'], default: 'À venir' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
