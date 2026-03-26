import express from 'express';
const router = express.Router();
import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', protect, admin, createNews);
router.put('/:id', protect, admin, updateNews);
router.delete('/:id', protect, admin, deleteNews);

export default router;
