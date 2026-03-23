import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

// Import Backend Routes from the backend folder
import authRoutes from './backend/routes/auth.js';
import memberRoutes from './backend/routes/members.js';
import eventRoutes from './backend/routes/events.js';
import newsRoutes from './backend/routes/news.js';
import galleryRoutes from './backend/routes/gallery.js';
import documentRoutes from './backend/routes/documents.js';
import financeRoutes from './backend/routes/finances.js';
import messageRoutes from './backend/routes/messages.js';
import settingsRoutes from './backend/routes/settings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://niassy:niassy1903@users.vo9zxwp.mongodb.net/lzrkm_db?retryWrites=true&w=majority';
  
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected to Atlas (Root Server)'))
    .catch(err => console.error('MongoDB Connection Error:', err));

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/members', memberRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/news', newsRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/documents', documentRoutes);
  app.use('/api/finances', financeRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/settings', settingsRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
