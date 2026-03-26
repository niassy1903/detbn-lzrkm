import Gallery from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({}).sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const item = new Gallery(req.body);
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (item) {
      await Gallery.findByIdAndDelete(req.params.id);
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
