import React from 'react';
import { motion } from 'motion/react';
import { Bell, CheckCircle2, Clock, Calendar, Trash2, Filter } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const MemberNotifications = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Notifications</h2>
          <p className="text-gray-500 font-medium">Restez informé des dernières activités du Dahira.</p>
        </div>
        <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-emerald-600 transition-all shadow-sm">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => markAsRead(notif.id)}
            className={`p-6 rounded-[28px] border transition-all cursor-pointer group flex items-start gap-5 ${
              notif.read 
                ? 'bg-white border-gray-100 opacity-70' 
                : 'bg-white border-emerald-100 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/5'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
              notif.read ? 'bg-gray-50 text-gray-400' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
            }`}>
              {notif.type === 'event' ? <Calendar className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-bold truncate ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>{notif.title}</h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {new Date(notif.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${notif.read ? 'text-gray-500' : 'text-gray-600'}`}>{notif.message}</p>
              
              {!notif.read && (
                <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Marquer comme lu</span>
                </div>
              )}
            </div>

            <button className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Aucune notification</h3>
          <p className="text-gray-500 mt-2">Vous êtes à jour !</p>
        </div>
      )}
    </div>
  );
};

export default MemberNotifications;
