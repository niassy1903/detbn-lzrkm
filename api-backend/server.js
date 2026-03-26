import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/documents', documentRoutes);

app.get('/', (req, res) => {
  res.send('DahiraConnect API is running...');
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://niassy:niassy1903@users.vo9zxwp.mongodb.net/lzrkm_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
