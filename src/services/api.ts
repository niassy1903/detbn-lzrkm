const API_URL = 'https://detbn-lzrkm-api.onrender.com/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Error: ${res.status}`);
  }
  return data;
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },
  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },
  getProfile: async () => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Events
  getEvents: async () => {
    const res = await fetch(`${API_URL}/events`);
    return handleResponse(res);
  },
  getEventById: async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}`);
    return handleResponse(res);
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
    return handleResponse(res);
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
    return handleResponse(res);
  },
  deleteEvent: async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },
  participateInEvent: async (id: string) => {
    const res = await fetch(`${API_URL}/events/${id}/participate`, {
      method: 'POST',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // News
  getNews: async () => {
    const res = await fetch(`${API_URL}/news`);
    return handleResponse(res);
  },
  getNewsById: async (id: string) => {
    const res = await fetch(`${API_URL}/news/${id}`);
    return handleResponse(res);
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
    return handleResponse(res);
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
    return handleResponse(res);
  },
  deleteNews: async (id: string) => {
    const res = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Gallery
  getGallery: async () => {
    const res = await fetch(`${API_URL}/gallery`);
    return handleResponse(res);
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
    return handleResponse(res);
  },
  deleteGalleryItem: async (id: string) => {
    const res = await fetch(`${API_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Users (Admin)
  getUsers: async () => {
    const res = await fetch(`${API_URL}/users`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
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
    return handleResponse(res);
  },
  deleteUser: async (id: string) => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Notifications
  getNotifications: async () => {
    const res = await fetch(`${API_URL}/notifications`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },
  markNotificationAsRead: async (id: string) => {
    const res = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
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
    return handleResponse(res);
  },

  // Messages
  getMessages: async () => {
    const res = await fetch(`${API_URL}/messages`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
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
    return handleResponse(res);
  },
  markMessageAsRead: async (id: string) => {
    const res = await fetch(`${API_URL}/messages/${id}/read`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },
  deleteMessage: async (id: string) => {
    const res = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },

  // Documents
  getDocuments: async () => {
    const res = await fetch(`${API_URL}/documents`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
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
    return handleResponse(res);
  },
  deleteDocument: async (id: string) => {
    const res = await fetch(`${API_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },
  deleteNotification: async (id: string) => {
    const res = await fetch(`${API_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(res);
  },
};
