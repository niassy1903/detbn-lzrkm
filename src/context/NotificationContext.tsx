import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  addNotification: (notif: Omit<Notification, 'id' | 'read' | 'date'>) => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isAuthenticated } = useAuth();

  const refreshNotifications = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await api.getNotifications();
      setNotifications(data.map((n: any) => ({ ...n, id: n._id })));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    refreshNotifications();
  }, [isAuthenticated]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      await api.markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const addNotification = async (notif: Omit<Notification, 'id' | 'read' | 'date'>) => {
    try {
      await api.createNotification(notif);
      refreshNotifications();
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, addNotification, refreshNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
