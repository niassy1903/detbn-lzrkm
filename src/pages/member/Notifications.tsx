import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Trash2, 
  Filter, 
  Search, 
  Info, 
  AlertCircle, 
  Star, 
  Heart,
  ChevronRight,
  MoreVertical,
  Check
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const MemberNotifications = () => {
  const { notifications, markAsRead, clearAll, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(n => {
    const matchesFilter = filter === 'ALL' || (filter === 'UNREAD' ? !n.read : n.read);
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         n.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Grouping notifications by date
  const groupNotifications = (notifs: any[]) => {
    const groups: { [key: string]: any[] } = {};
    notifs.forEach(n => {
      const date = new Date(n.date);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let key = 'Plus tôt';
      if (date.toDateString() === today.toDateString()) key = "Aujourd'hui";
      else if (date.toDateString() === yesterday.toDateString()) key = 'Hier';
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(n);
    });
    return groups;
  };

  const grouped = groupNotifications(filteredNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="w-6 h-6" />;
      case 'system': return <Info className="w-6 h-6" />;
      case 'alert': return <AlertCircle className="w-6 h-6" />;
      case 'spiritual': return <Star className="w-6 h-6" />;
      default: return <Bell className="w-6 h-6" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'system': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'alert': return 'bg-red-50 text-red-600 border-red-100';
      case 'spiritual': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Notifications</h2>
          <p className="text-gray-500 font-medium mt-2 text-lg">Restez au courant de la vie de votre Dahira.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={clearAll}
            className="px-6 py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
          >
            Tout effacer
          </button>
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
            <Bell className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une notification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 outline-none transition-all font-medium text-gray-900"
            />
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            {[
              { id: 'ALL', label: 'Toutes' },
              { id: 'UNREAD', label: 'Non lues' },
              { id: 'READ', label: 'Lues' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-12">
        {Object.entries(grouped).map(([groupName, notifs]) => (
          <div key={groupName} className="space-y-6">
            <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] ml-6">{groupName}</h3>
            <div className="space-y-4">
              {notifs.map((notif, i) => (
                <motion.div 
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-8 rounded-[40px] border transition-all cursor-pointer group flex items-start gap-8 relative overflow-hidden ${
                    notif.read 
                      ? 'bg-white border-gray-100 opacity-60 grayscale-[0.5]' 
                      : 'bg-white border-emerald-100 shadow-2xl shadow-emerald-900/5 ring-1 ring-emerald-500/5'
                  }`}
                >
                  {/* Unread Indicator */}
                  {!notif.read && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                  )}

                  <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center flex-shrink-0 transition-all border ${
                    notif.read ? 'bg-gray-50 text-gray-400 border-gray-100' : getColors(notif.type) + ' shadow-lg'
                  }`}>
                    {getIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className={`text-xl font-black tracking-tight ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>{notif.title}</h4>
                        {!notif.read && (
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {new Date(notif.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                          className="p-2 text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className={`text-lg leading-relaxed font-medium ${notif.read ? 'text-gray-500' : 'text-gray-600'}`}>{notif.message}</p>
                    
                    {!notif.read && (
                      <div className="mt-6 flex items-center gap-3 text-emerald-600 text-xs font-black uppercase tracking-widest group/read">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover/read:bg-emerald-600 group-hover/read:text-white transition-all">
                          <Check className="w-4 h-4" />
                        </div>
                        <span>Marquer comme lu</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white rounded-[60px] p-24 text-center border border-dashed border-gray-200 space-y-8">
            <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center mx-auto text-gray-200 relative">
              <Bell className="w-16 h-16" />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Tout est calme</h3>
              <p className="text-gray-500 font-medium mt-4 text-lg leading-relaxed">
                Vous n'avez aucune notification pour le moment. Nous vous tiendrons informé dès qu'il y aura du nouveau !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberNotifications;
