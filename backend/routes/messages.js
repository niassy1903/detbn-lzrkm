import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message (can be from user or admin)
router.post('/', async (req, res) => {
  const message = new Message(req.body);
  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark messages as read for a specific sender
router.put('/read/:email', async (req, res) => {
  try {
    await Message.updateMany({ email: req.params.email }, { isRead: true });
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
