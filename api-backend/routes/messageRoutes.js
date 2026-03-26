import express from 'express';
import { getMessages, sendMessage, markAsRead, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMessages)
  .post(protect, sendMessage);

router.route('/:id/read')
  .put(protect, markAsRead);

router.route('/:id')
  .delete(protect, deleteMessage);

export default router;
