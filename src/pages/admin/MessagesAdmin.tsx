import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Send, User, MoreVertical, Phone, Video, Smile, Paperclip, 
  Check, CheckCheck, Filter, Inbox, Star, Archive, Trash2, AlertCircle,
  ChevronLeft, MoreHorizontal, Image as ImageIcon, Mic, X
} from 'lucide-react';
import { api } from '../../services/api';

const MessagesAdmin: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact._id);
    }
  }, [selectedContact]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await api.getMessages();
      // Group messages by sender to create contacts
      const grouped = data.reduce((acc: any, msg: any) => {
        const key = msg.sender;
        if (!acc[key]) {
          acc[key] = {
            _id: key,
            name: msg.senderName || msg.sender,
            role: 'Membre',
            status: 'online',
            lastMessage: msg.text,
            time: new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: 0,
            avatar: `https://picsum.photos/seed/${msg.sender}/100/100`
          };
        }
        return acc;
      }, {});
      const contactList = Object.values(grouped);
      setContacts(contactList);
      if (contactList.length > 0 && !selectedContact) {
        setSelectedContact(contactList[0]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (contactId: string) => {
    try {
      const data = await api.getMessages();
      const filtered = data.filter((msg: any) => msg.sender === contactId || msg.receiver === contactId);
      setMessages(filtered);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      const messageData = {
        sender: 'admin',
        senderName: 'Admin',
        receiver: selectedContact._id,
        text: newMessage,
        status: 'sent'
      };

      await api.sendMessage(messageData);
      setNewMessage('');
      fetchMessages(selectedContact._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading && contacts.length === 0) {
    return <div className="h-full flex items-center justify-center text-neutral-400 font-bold">Chargement des messages...</div>;
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-8 pb-4">
      {/* Sidebar - Contacts List */}
      <motion.div 
        initial={false}
        animate={{ width: isSidebarOpen ? '400px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
        className="flex flex-col glass rounded-[3rem] border-white/60 overflow-hidden shadow-2xl shadow-primary/5"
      >
        <div className="p-8 border-b border-neutral-100 bg-white/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-neutral-900 tracking-tighter">Messages</h1>
            <div className="flex gap-2">
              <button className="p-3 rounded-xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
                <Filter size={20} />
              </button>
              <button className="p-3 rounded-xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une discussion..." 
              className="w-full pl-16 pr-8 py-4 rounded-2xl bg-neutral-50/50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-neutral-900"
            />
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {contacts.map((contact) => (
            <button
              key={contact._id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full flex items-center gap-5 p-5 rounded-[2rem] transition-all group relative ${
                selectedContact?._id === contact._id 
                  ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]' 
                  : 'hover:bg-white/60 hover:shadow-xl hover:shadow-neutral-200/50'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform" 
                />
                {contact.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
                )}
              </div>
              
              <div className="flex-grow text-left overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-black text-lg tracking-tight truncate ${selectedContact?._id === contact._id ? 'text-white' : 'text-neutral-900'}`}>
                    {contact.name}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selectedContact?._id === contact._id ? 'text-white/60' : 'text-neutral-400'}`}>
                    {contact.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium truncate ${selectedContact?._id === contact._id ? 'text-white/80' : 'text-neutral-500'}`}>
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary text-primary text-[10px] font-black flex items-center justify-center shadow-lg">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-grow flex flex-col glass rounded-[3rem] border-white/60 overflow-hidden shadow-2xl shadow-primary/5 relative">
          {/* Chat Header */}
          <div className="p-6 border-b border-neutral-100 bg-white/40 backdrop-blur-xl flex items-center justify-between z-10">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 rounded-xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all md:hidden"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="relative">
                <img 
                  src={selectedContact.avatar} 
                  alt={selectedContact.name} 
                  className="w-14 h-14 rounded-2xl object-cover shadow-xl" 
                />
                {selectedContact.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">{selectedContact.name}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${selectedContact.status === 'online' ? 'bg-green-500' : 'bg-neutral-300'}`}></div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    {selectedContact.role} • {selectedContact.status === 'online' ? 'En ligne' : 'Hors ligne'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Phone size={24} />
              </button>
              <button className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Video size={24} />
              </button>
              <button className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <MoreVertical size={24} />
              </button>
            </div>
          </div>
          
          {/* Messages List */}
          <div className="flex-grow overflow-y-auto p-10 space-y-10 bg-neutral-50/20 custom-scrollbar relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            
            <div className="flex justify-center relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-neutral-100 shadow-sm">
                Aujourd'hui
              </span>
            </div>
            
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div className={`max-w-[60%] flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-6 rounded-[2rem] text-base font-medium shadow-xl ${
                      msg.sender === 'admin' 
                        ? 'bg-primary text-white rounded-tr-none shadow-primary/20' 
                        : 'bg-white text-neutral-800 rounded-tl-none border border-neutral-100 shadow-neutral-200/50'
                    }`}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-2 mt-3 px-2">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.sender === 'admin' && (
                        msg.status === 'read' ? <CheckCheck size={14} className="text-primary" /> : <Check size={14} className="text-neutral-300" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-8 border-t border-neutral-100 bg-white/40 backdrop-blur-xl z-10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button type="button" className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
                  <Smile size={24} />
                </button>
                <button type="button" className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
                  <Paperclip size={24} />
                </button>
                <button type="button" className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
                  <ImageIcon size={24} />
                </button>
              </div>
              
              <div className="flex-grow relative group">
                <input 
                  type="text" 
                  placeholder="Écrivez votre message ici..." 
                  className="w-full py-5 px-8 rounded-[2rem] bg-neutral-50/50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900 shadow-inner"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl text-neutral-400 hover:text-primary transition-colors">
                  <Mic size={20} />
                </button>
              </div>
              
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="w-16 h-16 rounded-[2rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:scale-110 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none group"
              >
                <Send size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center glass rounded-[3rem] border-white/60 text-neutral-400 font-bold">
          Sélectionnez une discussion pour commencer
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
