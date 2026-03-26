import mongoose from 'mongoose';
import User from './models/User.js';
import Event from './models/Event.js';
import News from './models/News.js';
import Gallery from './models/Gallery.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://niassy:niassy1903@users.vo9zxwp.mongodb.net/lzrkm_db?retryWrites=true&w=majority';

const users = [
  {
    name: 'Admin Dahira',
    email: 'admin@dahiraconnect.com',
    password: 'adminpassword',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Membre Dahira',
    email: 'member@dahiraconnect.com',
    password: 'memberpassword',
    role: 'MEMBER',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

const events = [
  {
    title: 'Grande Conférence Religieuse',
    description: 'Une soirée de spiritualité et de partage avec d\'éminents conférenciers.',
    date: new Date('2026-04-15'),
    time: '21:00',
    location: 'Grande Mosquée de Dakar',
    category: 'Religieux',
    image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494?auto=format&fit=crop&q=80&w=1200',
    status: 'UPCOMING'
  },
  {
    title: 'Journée de Solidarité',
    description: 'Distribution de vivres et de vêtements aux plus démunis.',
    date: new Date('2026-05-01'),
    time: '09:00',
    location: 'Siège du Dahira',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    status: 'UPCOMING'
  }
];

const news = [
  {
    title: 'Succès de la Grande Conférence Annuelle',
    category: 'Événements',
    date: new Date('2026-03-20'),
    author: 'Bureau Com',
    image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Plus de 1000 fidèles se sont réunis pour célébrer la foi et la fraternité lors de notre rassemblement annuel...'
  },
  {
    title: 'Lancement du Programme de Soutien Scolaire',
    category: 'Éducation',
    date: new Date('2026-03-15'),
    author: 'Fatou Ba',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Nous lançons une nouvelle initiative pour accompagner nos jeunes membres dans leur réussite académique...'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Event.deleteMany({});
    await News.deleteMany({});
    await Gallery.deleteMany({});

    await User.create(users);
    await Event.create(events);
    await News.create(news);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
