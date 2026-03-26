import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { recipient: req.user._id },
        { recipient: null }
      ]
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { recipient, title, message, type, link } = req.body;
  try {
    const notification = await Notification.create({
      recipient,
      title,
      message,
      type,
      link
    });
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      notification.isRead = true;
      await notification.save();
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      await Notification.findByIdAndDelete(req.params.id);
      res.json({ message: 'Notification removed' });
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
