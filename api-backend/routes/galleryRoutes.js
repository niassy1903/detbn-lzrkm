import express from 'express';
const router = express.Router();
import { getGallery, createGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', getGallery);
router.post('/', protect, admin, createGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

export default router;
