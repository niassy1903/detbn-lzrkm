import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Send, User, MoreVertical, Phone, Video, Smile, Paperclip, Check, CheckCheck } from 'lucide-react';

const contacts = [
  { id: 1, name: "Admin Dahira", role: "Administrateur", status: "online", lastMessage: "Votre demande a été approuvée.", time: "10:30", unread: 2, avatar: "https://picsum.photos/seed/admin/100/100" },
  { id: 2, name: "Commission Sociale", role: "Support", status: "offline", lastMessage: "Merci pour votre contribution.", time: "Hier", unread: 0, avatar: "https://picsum.photos/seed/social/100/100" },
  { id: 3, name: "Moussa Diop", role: "Membre", status: "online", lastMessage: "On se voit à la réunion ?", time: "Hier", unread: 0, avatar: "https://picsum.photos/seed/moussa/100/100" },
  { id: 4, name: "Fatou Sow", role: "Membre", status: "offline", lastMessage: "Pouvez-vous m'envoyer le document ?", time: "Lundi", unread: 0, avatar: "https://picsum.photos/seed/fatou/100/100" },
];

const initialMessages = [
  { id: 1, sender: 'other', text: "Bonjour ! Comment allez-vous ?", time: "09:00", status: 'read' },
  { id: 2, sender: 'me', text: "Bonjour Admin, je vais très bien merci. Et vous ?", time: "09:05", status: 'read' },
  { id: 3, sender: 'other', text: "Très bien. Je vous contacte concernant votre demande de participation à l'événement de samedi.", time: "09:10", status: 'read' },
  { id: 4, sender: 'other', text: "Votre demande a été approuvée.", time: "10:30", status: 'read' },
];

const MessagesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-primary/5">
      {/* Sidebar - Contacts */}
      <div className="w-full md:w-80 flex flex-col border-r border-gray-100 bg-gray-50/50">
        <div className="p-6 border-b border-gray-100 bg-white">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                selectedContact.id === contact.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-xl object-cover" />
                {contact.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-grow text-left overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold truncate ${selectedContact.id === contact.id ? 'text-white' : 'text-gray-900'}`}>
                    {contact.name}
                  </span>
                  <span className={`text-[10px] ${selectedContact.id === contact.id ? 'text-white/70' : 'text-gray-400'}`}>
                    {contact.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-xs truncate ${selectedContact.id === contact.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary text-primary text-[10px] font-bold flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-col flex-grow bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-xl object-cover" />
              {selectedContact.status === 'online' && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{selectedContact.name}</h3>
              <p className="text-xs text-gray-500">{selectedContact.role} • {selectedContact.status === 'online' ? 'En ligne' : 'Hors ligne'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Messages List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          <div className="flex justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100">
              Aujourd'hui
            </span>
          </div>
          
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm ${
                  msg.sender === 'me' 
                    ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                  {msg.sender === 'me' && (
                    msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-primary" /> : <Check className="w-3 h-3 text-gray-300" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="p-4 border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <button type="button" className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
              <Smile className="w-6 h-6" />
            </button>
            <button type="button" className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
              <Paperclip className="w-6 h-6" />
            </button>
            <input 
              type="text" 
              placeholder="Écrivez votre message..." 
              className="flex-grow py-3 px-4 rounded-2xl bg-gray-50 border border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
