import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  status: { type: String, enum: ['UPCOMING', 'ONGOING', 'COMPLETED'], default: 'UPCOMING' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
