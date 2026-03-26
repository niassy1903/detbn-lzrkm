const API_URL = 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur de connexion');
    return data;
  },
  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erreur d\'inscription');
    return data;
  },
  getProfile: async () => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // Events
  getEvents: async () => {
    const res = await fetch(`${API_URL}/events`);
    return res.json();
  },
  getEventById: async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}`);
    return res.json();
  },
  createEvent: async (eventData: any) => {
    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(eventData),
    });
    return res.json();
  },
  updateEvent: async (id: string, eventData: any) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(eventData),
    });
    return res.json();
  },
  deleteEvent: async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  participateInEvent: async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}/participate`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // News
  getNews: async () => {
    const res = await fetch(`${API_URL}/news`);
    return res.json();
  },
  getNewsById: async (id: string) => {
    const res = await fetch(`${API_URL}/news/${id}`);
    return res.json();
  },
  createNews: async (newsData: any) => {
    const res = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(newsData),
    });
    return res.json();
  },
  updateNews: async (id: string, newsData: any) => {
    const res = await fetch(`${API_URL}/news/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(newsData),
    });
    return res.json();
  },
  deleteNews: async (id: string) => {
    const res = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // Gallery
  getGallery: async () => {
    const res = await fetch(`${API_URL}/gallery`);
    return res.json();
  },
  createGalleryItem: async (itemData: any) => {
    const res = await fetch(`${API_URL}/gallery`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(itemData),
    });
    return res.json();
  },
  deleteGalleryItem: async (id: string) => {
    const res = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // Users (Admin)
  getUsers: async () => {
    const res = await fetch(`${API_URL}/users`, {
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  updateUser: async (id: string, userData: any) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(userData),
    });
    return res.json();
  },
  deleteUser: async (id: string) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // Notifications
  getNotifications: async () => {
    const res = await fetch(`${API_URL}/notifications`, {
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  markNotificationAsRead: async (id: string) => {
    const res = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  createNotification: async (notifData: any) => {
    const res = await fetch(`${API_URL}/notifications`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(notifData),
    });
    return res.json();
  },

  // Messages
  getMessages: async () => {
    const res = await fetch(`${API_URL}/messages`, {
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  sendMessage: async (messageData: any) => {
    const res = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(messageData),
    });
    return res.json();
  },
  markMessageAsRead: async (id: string) => {
    const res = await fetch(`${API_URL}/messages/${id}/read`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  deleteMessage: async (id: string) => {
    const res = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },

  // Documents
  getDocuments: async () => {
    const res = await fetch(`${API_URL}/documents`, {
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  uploadDocument: async (docData: any) => {
    const res = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(docData),
    });
    return res.json();
  },
  deleteDocument: async (id: string) => {
    const res = await fetch(`${API_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
  deleteNotification: async (id: string) => {
    const res = await fetch(`${API_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return res.json();
  },
};
