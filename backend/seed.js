import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Member from './models/Member.js';
import Event from './models/Event.js';
import News from './models/News.js';
import Gallery from './models/Gallery.js';
import Document from './models/Document.js';
import Transaction from './models/Transaction.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dahira_db';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Member.deleteMany({});
    await Event.deleteMany({});
    await News.deleteMany({});
    await Gallery.deleteMany({});
    await Document.deleteMany({});
    await Transaction.deleteMany({});

    console.log('Existing data cleared.');

    // Seed Admin User
    await User.create({
      name: 'Admin Dahira',
      email: 'admin@dahira.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'admin'
    });
    console.log('Admin user seeded.');

    // Seed Members
    await Member.create([
      { name: 'Lamine Niassy', email: 'lamine@example.com', phone: '+221 77 000 00 00', role: 'Président', status: 'Actif' },
      { name: 'Moussa Diop', email: 'moussa@example.com', phone: '+221 77 111 11 11', role: 'Secrétaire', status: 'Actif' },
      { name: 'Fatou Sow', email: 'fatou@example.com', phone: '+221 77 222 22 22', role: 'Trésorier', status: 'Actif' },
      { name: 'Abdoulaye Wade', email: 'abdou@example.com', phone: '+221 77 333 33 33', role: 'Membre Actif', status: 'Actif' }
    ]);
    console.log('Members seeded.');

    // Seed Events
    await Event.create([
      { title: 'Gamou Annuel 2024', date: new Date('2024-09-15'), location: 'Keur Massar', category: 'Religieux', status: 'À venir' },
      { title: 'Conférence Spirituelle', date: new Date('2024-04-10'), location: 'Dakar Plateau', category: 'Éducatif', status: 'À venir' }
    ]);
    console.log('Events seeded.');

    // Seed News
    await News.create([
      { title: 'Lancement du nouveau portail', content: 'Nous sommes ravis de lancer notre nouveau système de gestion.', category: 'Actualité' },
      { title: 'Appel aux dons pour le Gamou', content: 'Participez à la réussite de notre événement annuel.', category: 'Annonce' }
    ]);
    console.log('News seeded.');

    // Seed Gallery
    await Gallery.create([
      { title: 'Gamou 2023', category: 'Événements', type: 'image', url: 'https://picsum.photos/seed/gamou/800/600' },
      { title: 'Réunion Mensuelle', category: 'Social', type: 'image', url: 'https://picsum.photos/seed/reunion/800/600' }
    ]);
    console.log('Gallery seeded.');

    // Seed Documents
    await Document.create([
      { name: 'Statuts du Dahira', type: 'PDF', category: 'Administratif', url: 'https://example.com/statuts.pdf' },
      { name: 'Rapport Financier Q1', type: 'Excel', category: 'Financier', url: 'https://example.com/rapport.xlsx' }
    ]);
    console.log('Documents seeded.');

    // Seed Transactions
    await Transaction.create([
      { type: 'income', category: 'Cotisation', amount: 50000, member: 'Lamine Niassy' },
      { type: 'expense', category: 'Logistique', amount: 15000, description: 'Achat fournitures' },
      { type: 'income', category: 'Don', amount: 100000, member: 'Anonyme' }
    ]);
    console.log('Transactions seeded.');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
