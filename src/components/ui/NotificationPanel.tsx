import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Check, Trash2, Clock, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Nouveau membre inscrit",
    description: "Moussa Diop vient de rejoindre le Dahira.",
    time: "Il y a 5 min",
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: "Paiement reçu",
    description: "La cotisation de Fatou Sow a été validée.",
    time: "Il y a 1 heure",
    type: 'info',
    read: false,
  },
  {
    id: 3,
    title: "Rappel événement",
    description: "La réunion mensuelle commence dans 2 heures.",
    time: "Il y a 2 heures",
    type: 'warning',
    read: true,
  },
  {
    id: 4,
    title: "Erreur système",
    description: "Échec de la synchronisation des données.",
    time: "Il y a 5 heures",
    type: 'error',
    read: true,
  },
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'warning': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'error': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      case 'error': return <X size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-neutral-100"
          >
            {/* Header */}
            <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Bell size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Notifications</h2>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    {notifications.filter(n => !n.read).length} nouvelles alertes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={markAllAsRead}
                  className="p-3 rounded-xl hover:bg-neutral-50 text-neutral-400 hover:text-primary transition-all"
                  title="Tout marquer comme lu"
                >
                  <Check size={20} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-3 rounded-xl hover:bg-neutral-50 text-neutral-400 hover:text-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                  <div className="w-24 h-24 rounded-[2.5rem] bg-neutral-50 flex items-center justify-center text-neutral-200 mb-6">
                    <Bell size={48} />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900 tracking-tight">Aucune notification</h3>
                  <p className="text-sm text-neutral-400 font-medium mt-2">Vous êtes à jour ! Revenez plus tard pour de nouvelles alertes.</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "group p-6 rounded-[2rem] border transition-all relative overflow-hidden",
                      notification.read 
                        ? "bg-white border-neutral-100 opacity-60 hover:opacity-100" 
                        : "bg-neutral-50 border-primary/10 shadow-lg shadow-primary/5"
                    )}
                  >
                    {!notification.read && (
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                    )}
                    
                    <div className="flex gap-5">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0",
                        getTypeStyles(notification.type)
                      )}>
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-black text-neutral-900 tracking-tight truncate">{notification.title}</h4>
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest whitespace-nowrap flex items-center gap-1">
                            <Clock size={10} />
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-4">
                          {notification.description}
                        </p>
                        
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button 
                              onClick={() => markAsRead(notification.id)}
                              className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                            >
                              Marquer comme lu
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotification(notification.id)}
                            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-neutral-100 bg-neutral-50/50">
              <button 
                className="w-full py-5 rounded-2xl bg-white border border-neutral-200 text-sm font-black text-neutral-600 uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
              >
                Voir toutes les notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
