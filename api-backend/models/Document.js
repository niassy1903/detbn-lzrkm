import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['ADMIN', 'MEMBER', 'EVENT', 'OTHER'],
    default: 'OTHER'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  sharedWithAll: {
    type: Boolean,
    default: false
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Document = mongoose.model('Document', documentSchema);
export default Document;
