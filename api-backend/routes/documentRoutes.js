import express from 'express';
import { getDocuments, uploadDocument, deleteDocument } from '../controllers/documentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getDocuments)
  .post(protect, admin, uploadDocument);

router.route('/:id')
  .delete(protect, admin, deleteDocument);

export default router;
