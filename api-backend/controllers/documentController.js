import Document from '../models/Document.js';
import Notification from '../models/Notification.js';
import { emitToUser, emitToAll } from '../socket.js';

export const getDocuments = async (req, res) => {
  try {
    let query = {};
    
    // If not admin, filter by permissions
    if (req.user.role !== 'ADMIN') {
      query = {
        $or: [
          { isPublic: true },
          { sharedWithAll: true },
          { recipients: req.user._id }
        ]
      };
    }

    const documents = await Document.find(query)
      .populate('uploadedBy', 'name email avatar')
      .sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadDocument = async (req, res) => {
  const { 
    title, 
    description, 
    fileUrl, 
    fileType, 
    fileSize, 
    category, 
    isPublic,
    sharedWithAll,
    recipients 
  } = req.body;
  
  try {
    const document = await Document.create({
      title,
      description,
      fileUrl,
      fileType,
      fileSize,
      uploadedBy: req.user._id,
      category,
      isPublic,
      sharedWithAll,
      recipients: recipients || []
    });
    
    const populatedDocument = await Document.findById(document._id).populate('uploadedBy', 'name email avatar');

    // Create notifications
    if (sharedWithAll) {
      const notif = await Notification.create({
        title: 'Nouveau document partagé',
        message: `L'administrateur a partagé un nouveau document : ${title}`,
        type: 'INFO',
        link: '/documents'
      });
      emitToAll('notification', notif);
    } else if (recipients && recipients.length > 0) {
      for (const recipientId of recipients) {
        const notif = await Notification.create({
          recipient: recipientId,
          title: 'Document partagé avec vous',
          message: `Un nouveau document vous a été partagé : ${title}`,
          type: 'INFO',
          link: '/documents'
        });
        emitToUser(recipientId, 'notification', notif);
      }
    }

    res.status(201).json(populatedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (document) {
      await Document.findByIdAndDelete(req.params.id);
      res.json({ message: 'Document removed' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
