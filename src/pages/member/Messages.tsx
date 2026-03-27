import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  User, 
  ChevronRight, 
  AlertCircle,
  Mail,
  Send,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const Messages = () => {
  const { messages, markMessageAsRead, deleteMessage } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  // Filter messages for the current user
  const userMessages = messages.filter(m => 
    m.recipientId === user?.id || m.recipientId === 'ALL'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredMessages = userMessages.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMessage = (message: any) => {
    setSelectedMessage(message);
    if (!message.read) {
      markMessageAsRead(message.id);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-8 max-w-7xl mx-auto">
      {/* Message List */}
      <div className="w-1/3 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Messages</h2>
          <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100">
            {userMessages.filter(m => !m.read).length} Nouveau(x)
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher un message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 outline-none transition-all font-medium text-gray-900 shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelectMessage(message)}
              className={`p-6 rounded-[28px] cursor-pointer transition-all border relative group ${
                selectedMessage?.id === message.id 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-900/20' 
                  : 'bg-white text-gray-900 border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5'
              }`}
            >
              {!message.read && (
                <div className="absolute top-6 right-6 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
              )}
              <div className="flex items-center space-x-4 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedMessage?.id === message.id ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-black uppercase tracking-widest ${
                    selectedMessage?.id === message.id ? 'text-emerald-100' : 'text-emerald-600'
                  }`}>
                    {message.senderName || 'Administration'}
                  </p>
                  <p className={`text-[10px] font-bold mt-0.5 ${
                    selectedMessage?.id === message.id ? 'text-emerald-200' : 'text-gray-400'
                  }`}>
                    {new Date(message.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <h4 className="font-black text-lg line-clamp-1 mb-1 tracking-tight">{message.title}</h4>
              <p className={`text-sm line-clamp-2 leading-relaxed ${
                selectedMessage?.id === message.id ? 'text-emerald-50' : 'text-gray-500'
              }`}>
                {message.content}
              </p>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-[32px] border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Aucun message trouvé.</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
              {/* Header */}
              <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-[22px] flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{selectedMessage.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm font-bold text-emerald-600">De: {selectedMessage.senderName || 'Administration'}</p>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <p className="text-sm font-medium text-gray-400">{new Date(selectedMessage.date).toLocaleString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => {
                      deleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
                    title="Supprimer"
                  >
                    <Trash2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="prose prose-emerald max-w-none">
                    <p className="text-xl text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                      {selectedMessage.content}
                    </p>
                  </div>
                  
                  {selectedMessage.type === 'ANNOUNCEMENT' && (
                    <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100 flex items-start space-x-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm flex-shrink-0">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-lg font-black text-emerald-900 mb-1">Annonce Officielle</h5>
                        <p className="text-emerald-700 font-medium leading-relaxed">
                          Ceci est un message officiel de l'administration de la Dahira. Veuillez en prendre note.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-10 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center space-x-3 text-emerald-600 bg-emerald-50 px-6 py-3 rounded-2xl font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message lu</span>
                </div>
                <button className="flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20">
                  <span>Répondre à l'administration</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8">
              <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center text-gray-200 relative">
                <MessageSquare className="w-16 h-16" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              <div className="max-w-sm">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Sélectionnez un message</h3>
                <p className="text-gray-500 font-medium mt-3 leading-relaxed">
                  Choisissez une conversation dans la liste de gauche pour afficher son contenu complet.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Messages;
