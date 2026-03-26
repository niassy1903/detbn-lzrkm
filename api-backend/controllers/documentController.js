import Document from '../models/Document.js';

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({}).populate('uploadedBy', 'name email avatar').sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadDocument = async (req, res) => {
  const { title, description, fileUrl, fileType, fileSize, category, isPublic } = req.body;
  try {
    const document = await Document.create({
      title,
      description,
      fileUrl,
      fileType,
      fileSize,
      uploadedBy: req.user._id,
      category,
      isPublic
    });
    const populatedDocument = await Document.findById(document._id).populate('uploadedBy', 'name email avatar');
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
