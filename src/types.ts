import { UserRole } from './core/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: string;
  status?: string;
}

export interface DahiraEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: string;
  image?: string;
  participantsCount: number;
  participants?: string[]; // Array of user IDs
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
}
