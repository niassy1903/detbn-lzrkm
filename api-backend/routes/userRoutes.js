import express from 'express';
const router = express.Router();
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;
