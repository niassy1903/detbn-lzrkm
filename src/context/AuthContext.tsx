import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { UserRole } from '../core/constants';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('dahira_user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: any) => {
    try {
      const data = await api.login(credentials);
      const userData: User = {
        id: data._id || data.id,
        name: data.name,
        email: data.email,
        role: data.role as UserRole,
        avatar: data.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
        status: data.status || 'ACTIVE',
        joinedAt: data.createdAt || new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('dahira_user', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
    } catch (error: any) {
      throw new Error(error.message || 'Erreur de connexion');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dahira_user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === UserRole.ADMIN
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
