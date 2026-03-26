import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { recipient: req.user._id },
        { recipient: null },
        { sender: req.user._id }
      ]
    }).populate('sender', 'name email avatar').populate('recipient', 'name email avatar').sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { recipient, subject, content, type } = req.body;
  try {
    const message = await Message.create({
      sender: req.user._id,
      recipient,
      subject,
      content,
      type
    });
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.isRead = true;
      await message.save();
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      await Message.findByIdAndDelete(req.params.id);
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
