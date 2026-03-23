const API_BASE_URL = '/api';

export const api = {
  // Auth
  login: (data: any) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  register: (data: any) => fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  // Members
  getMembers: () => fetch(`${API_BASE_URL}/members`).then(res => res.json()),
  createMember: (data: any) => fetch(`${API_BASE_URL}/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateMember: (id: string, data: any) => fetch(`${API_BASE_URL}/members/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteMember: (id: string) => fetch(`${API_BASE_URL}/members/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Events
  getEvents: () => fetch(`${API_BASE_URL}/events`).then(res => res.json()),
  createEvent: (data: any) => fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateEvent: (id: string, data: any) => fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteEvent: (id: string) => fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // News
  getNews: () => fetch(`${API_BASE_URL}/news`).then(res => res.json()),
  createNews: (data: any) => fetch(`${API_BASE_URL}/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateNews: (id: string, data: any) => fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteNews: (id: string) => fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Gallery
  getGallery: () => fetch(`${API_BASE_URL}/gallery`).then(res => res.json()),
  createGalleryItem: (data: any) => fetch(`${API_BASE_URL}/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateGalleryItem: (id: string, data: any) => fetch(`${API_BASE_URL}/gallery/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteGalleryItem: (id: string) => fetch(`${API_BASE_URL}/gallery/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Documents
  getDocuments: () => fetch(`${API_BASE_URL}/documents`).then(res => res.json()),
  createDocument: (data: any) => fetch(`${API_BASE_URL}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateDocument: (id: string, data: any) => fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteDocument: (id: string) => fetch(`${API_BASE_URL}/documents/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Finances
  getTransactions: () => fetch(`${API_BASE_URL}/finances`).then(res => res.json()),
  createTransaction: (data: any) => fetch(`${API_BASE_URL}/finances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  updateTransaction: (id: string, data: any) => fetch(`${API_BASE_URL}/finances/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  deleteTransaction: (id: string) => fetch(`${API_BASE_URL}/finances/${id}`, {
    method: 'DELETE'
  }).then(res => res.json()),

  // Messages
  getMessages: () => fetch(`${API_BASE_URL}/messages`).then(res => res.json()),
  sendMessage: (data: any) => fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),

  // Settings
  getSettings: () => fetch(`${API_BASE_URL}/settings`).then(res => res.json()),
  updateSettings: (data: any) => fetch(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
};
