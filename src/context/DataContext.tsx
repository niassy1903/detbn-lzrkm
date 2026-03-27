import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DahiraEvent, Notification } from '../types';
import { api } from '../services/api';

interface DataContextType {
  members: User[];
  events: DahiraEvent[];
  notifications: Notification[];
  messages: any[];
  documents: any[];
  news: any[];
  gallery: any[];
  loading: boolean;
  
  // Members
  addMember: (member: any) => void;
  updateMember: (id: string, member: Partial<User>) => void;
  deleteMember: (id: string) => void;
  
  // Events
  addEvent: (event: Omit<DahiraEvent, 'id' | 'participantsCount'>) => void;
  updateEvent: (id: string, event: Partial<DahiraEvent>) => void;
  deleteEvent: (id: string) => void;
  participateInEvent: (eventId: string, userId: string) => void;
  
  // Messages
  addMessage: (message: any) => void;
  deleteMessage: (id: string) => void;
  markMessageAsRead: (id: string) => void;

  // Documents
  addDocument: (doc: any) => void;
  deleteDocument: (id: string) => void;

  // Notifications
  addNotification: (notification: any) => void;
  deleteNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;

  // News
  addNews: (item: any) => void;
  updateNews: (id: string, item: any) => void;
  deleteNews: (id: string) => void;
  
  // Gallery
  addGalleryItem: (item: any) => void;
  deleteGalleryItem: (id: string) => void;
  
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<User[]>([]);
  const [events, setEvents] = useState<DahiraEvent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [eventsData, newsData, galleryData, messagesData, documentsData, notificationsData] = await Promise.all([
        api.getEvents(),
        api.getNews(),
        api.getGallery(),
        api.getMessages(),
        api.getDocuments(),
        api.getNotifications()
      ]);
      
      setEvents(eventsData.map((e: any) => ({
        ...e,
        id: e._id,
        participantsCount: e.participants?.length || 0
      })));
      
      setNews(newsData.map((n: any) => ({ ...n, id: n._id })));
      setGallery(galleryData.map((g: any) => ({ ...g, id: g._id })));
      setMessages(messagesData.map((m: any) => ({ 
        ...m, 
        id: m._id,
        title: m.title || m.subject || '',
        subject: m.title || m.subject || '',
        content: m.content || '',
        date: m.date || m.createdAt || new Date().toISOString(),
        createdAt: m.date || m.createdAt || new Date().toISOString(),
        recipientId: m.recipientId || m.recipient || '',
        recipient: m.recipientId || m.recipient || '',
        read: m.read !== undefined ? m.read : (m.isRead !== undefined ? m.isRead : false),
        isRead: m.read !== undefined ? m.read : (m.isRead !== undefined ? m.isRead : false),
        type: m.type || 'DIRECT'
      })));
      setDocuments(documentsData.map((d: any) => ({ ...d, id: d._id })));
      setNotifications(notificationsData.map((n: any) => ({ ...n, id: n._id })));
      
      // Only fetch members if admin
      const user = JSON.parse(localStorage.getItem('dahira_user') || '{}');
      if (user.role === 'ADMIN') {
        const membersData = await api.getUsers();
        setMembers(membersData.map((m: any) => ({
          ...m,
          id: m._id,
          joinedAt: m.createdAt
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Members
  const addMember = async (member: any) => {
    try {
      await api.register(member);
      refreshData();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const updateMember = async (id: string, updatedFields: Partial<User>) => {
    try {
      await api.updateUser(id, updatedFields);
      refreshData();
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await api.deleteUser(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  // Events
  const addEvent = async (event: Omit<DahiraEvent, 'id' | 'participantsCount'>) => {
    try {
      await api.createEvent(event);
      refreshData();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const updateEvent = async (id: string, updatedFields: Partial<DahiraEvent>) => {
    try {
      await api.updateEvent(id, updatedFields);
      refreshData();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await api.deleteEvent(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const participateInEvent = async (eventId: string, userId: string) => {
    try {
      await api.participateInEvent(eventId);
      refreshData();
    } catch (error) {
      console.error('Error participating in event:', error);
    }
  };

  // Messages
  const addMessage = async (message: any) => {
    try {
      await api.sendMessage(message);
      refreshData();
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await api.deleteMessage(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      await api.markMessageAsRead(id);
      refreshData();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  // Documents
  const addDocument = async (doc: any) => {
    try {
      await api.uploadDocument(doc);
      refreshData();
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await api.deleteDocument(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const addNotification = async (notificationData: any) => {
    try {
      await api.createNotification(notificationData);
      refreshData();
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await api.deleteNotification(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      await api.markNotificationAsRead(id);
      refreshData();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // News
  const addNews = async (item: any) => {
    try {
      await api.createNews(item);
      refreshData();
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const updateNews = async (id: string, updatedFields: any) => {
    try {
      await api.updateNews(id, updatedFields);
      refreshData();
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await api.deleteNews(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  // Gallery
  const addGalleryItem = async (item: any) => {
    try {
      await api.createGalleryItem(item);
      refreshData();
    } catch (error) {
      console.error('Error adding gallery item:', error);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      await api.deleteGalleryItem(id);
      refreshData();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  return (
    <DataContext.Provider value={{
      members, events, notifications, messages, documents, news, gallery, loading,
      addMember, updateMember, deleteMember,
      addEvent, updateEvent, deleteEvent, participateInEvent,
      addMessage, deleteMessage, markMessageAsRead,
      addDocument, deleteDocument,
      addNotification, deleteNotification, markNotificationAsRead,
      addNews, updateNews, deleteNews,
      addGalleryItem, deleteGalleryItem,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
