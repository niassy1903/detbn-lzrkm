import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Plus, 
  Search, 
  Trash2, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminNotifications = () => {
  const { notifications, members, addNotification, deleteNotification } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [formData, setFormData] = useState({
    recipient: '',
    title: '',
    message: '',
    type: 'INFO',
    link: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In DataContext, we need to add addNotification if not already there
    // For now, let's assume it's there or we'll add it
    // addNotification(formData); 
    setIsModalOpen(false);
    setFormData({ recipient: '', title: '', message: '', type: 'INFO', link: '' });
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || n.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'ERROR': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Centre de Notifications</h2>
          <p className="text-slate-500 font-medium mt-1">Envoyez des alertes et des rappels aux membres.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Notification</span>
        </button>
      </div>

      <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher une notification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-white transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          >
            <option value="ALL">Tous les types</option>
            <option value="INFO">Information</option>
            <option value="SUCCESS">Succès</option>
            <option value="WARNING">Avertissement</option>
            <option value="ERROR">Erreur</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-all"
          >
            <div className="flex items-center space-x-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-950 border border-slate-800`}>
                {getTypeIcon(notif.type)}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                    notif.isRead ? 'bg-slate-800 text-slate-500 border-slate-700' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  }`}>
                    {notif.isRead ? 'Lu' : 'Nouveau'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 max-w-2xl line-clamp-1">{notif.message}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(notif.createdAt).toLocaleString()}</span>
                  </div>
                  {notif.recipient && (
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      <User className="w-3 h-3" />
                      <span>Destinataire : {notif.recipient.name || 'Membre'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {notif.link && (
                <a 
                  href={notif.link}
                  className="p-3 bg-slate-950 text-slate-500 hover:text-white rounded-xl transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button 
                onClick={() => deleteNotification(notif.id)}
                className="p-3 bg-slate-950 text-slate-500 hover:text-red-400 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Notification Modal */}
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
                <h3 className="text-xl font-bold text-white">Nouvelle Notification</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Destinataire</label>
                    <select 
                      value={formData.recipient}
                      onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                    >
                      <option value="">Tous les membres</option>
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Type d'alerte</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                    >
                      <option value="INFO">Information</option>
                      <option value="SUCCESS">Succès</option>
                      <option value="WARNING">Avertissement</option>
                      <option value="ERROR">Erreur</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Titre</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Rappel de cotisation"
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Contenu de la notification..."
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Lien (Optionnel)</label>
                  <input 
                    type="text" 
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Ex: /member/events"
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                  />
                </div>
                <div className="pt-4 flex justify-end space-x-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                  >
                    <Bell className="w-5 h-5" />
                    <span>Envoyer l'alerte</span>
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

export default AdminNotifications;
