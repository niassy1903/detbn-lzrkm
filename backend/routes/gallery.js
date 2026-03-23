import express from 'express';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ date: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create gallery item
router.post('/', async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update gallery item
router.put('/:id', async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete gallery item
router.delete('/:id', async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
