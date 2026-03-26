import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Search, 
  Trash2, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  X,
  ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const AdminMessages = () => {
  const { messages, members, addMessage, deleteMessage, markMessageAsRead } = useData();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    content: '',
    type: 'DIRECT'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setIsModalOpen(false);
    setFormData({ recipient: '', subject: '', content: '', type: 'DIRECT' });
  };

  const filteredMessages = messages.filter(m => 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.sender?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Messages & Communications</h2>
          <p className="text-slate-500 font-medium mt-1">Gérez les échanges avec les membres et les annonces globales.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Message</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Rechercher un message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-white transition-all"
            />
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead && msg.recipient?._id === user?.id) {
                    markMessageAsRead(msg.id);
                  }
                }}
                className={`w-full text-left p-5 rounded-3xl border transition-all ${
                  selectedMessage?.id === msg.id 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <img src={msg.sender?.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-800" />
                    <span className="text-xs font-bold text-white">{msg.sender?.name}</span>
                  </div>
                  {!msg.isRead && <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>}
                </div>
                <h4 className="text-sm font-bold text-white mb-1 truncate">{msg.subject}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{msg.content}</p>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span>{msg.type}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden h-full flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={selectedMessage.sender?.avatar} alt="" className="w-12 h-12 rounded-2xl border-2 border-slate-800" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedMessage.sender?.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{selectedMessage.sender?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-3 bg-slate-800 text-slate-400 hover:text-red-400 rounded-2xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-10 flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-4">
                    <Mail className="w-3 h-3" />
                    <span>Sujet : {selectedMessage.subject}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white leading-tight">{selectedMessage.subject}</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>
              <div className="p-8 border-t border-slate-800 bg-slate-900/50">
                <div className="flex items-center space-x-4">
                  <input 
                    type="text" 
                    placeholder="Écrire une réponse..."
                    className="flex-1 px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                  />
                  <button className="p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900/30 rounded-[40px] border border-dashed border-slate-800 p-10 text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-700 mb-6">
                <Mail className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sélectionnez un message</h3>
              <p className="text-slate-500 max-w-xs">Choisissez une conversation dans la liste pour afficher son contenu.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Nouveau Message</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Destinataire</label>
                  <select 
                    required
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                  >
                    <option value="">Sélectionner un membre</option>
                    <option value="all">Tous les membres (Annonce)</option>
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Sujet</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Sujet du message"
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Message</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Écrivez votre message ici..."
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all resize-none"
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMessages;
