import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }, // If true, it's a reply from admin
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
