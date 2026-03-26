import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // If null, it's a broadcast or admin message
  },
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['DIRECT', 'BROADCAST', 'SUPPORT'],
    default: 'DIRECT'
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
