import React from 'react';
import { motion } from 'motion/react';
import { Bell, Calendar, MessageSquare, Info, CheckCircle2, Clock, Trash2, MoreVertical } from 'lucide-react';

const notifications = [
  { id: 1, type: 'event', title: 'Nouvel événement créé', message: "La réunion mensuelle du Dahira a été programmée pour le 5 Avril.", time: "Il y a 2 heures", read: false, icon: Calendar, color: 'text-blue-500 bg-blue-50' },
  { id: 2, type: 'message', title: 'Nouveau message de l\'Admin', message: "Votre demande de participation a été approuvée.", time: "Il y a 5 heures", read: false, icon: MessageSquare, color: 'text-green-500 bg-green-50' },
  { id: 3, type: 'info', title: 'Rappel de cotisation', message: "N'oubliez pas de régler votre cotisation pour le mois de Mars.", time: "Hier", read: true, icon: Info, color: 'text-orange-500 bg-orange-50' },
  { id: 4, type: 'success', title: 'Paiement confirmé', message: "Votre don de 50,000 FCFA a été bien reçu. Merci !", time: "Il y a 2 jours", read: true, icon: CheckCircle2, color: 'text-primary bg-primary/10' },
  { id: 5, type: 'event', title: 'Événement annulé', message: "La sortie culturelle prévue demain est reportée à une date ultérieure.", time: "Il y a 3 jours", read: true, icon: Calendar, color: 'text-red-500 bg-red-50' },
];

const NotificationsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500">Restez informé des dernières activités et alertes.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="text-sm font-bold text-primary hover:underline px-4 py-2">
            Tout marquer comme lu
          </button>
          <button className="p-2 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative p-6 rounded-3xl border transition-all ${
              notif.read 
                ? 'bg-white border-gray-100 opacity-70' 
                : 'bg-white border-primary/20 shadow-lg shadow-primary/5'
            }`}
          >
            {!notif.read && (
              <div className="absolute top-6 right-6 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
            )}
            
            <div className="flex items-start gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                <notif.icon className="w-7 h-7" />
              </div>
              
              <div className="flex-grow pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold text-lg ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notif.time}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {notif.message}
                </p>
                
                <div className="mt-4 flex items-center gap-4">
                  <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                    Voir les détails
                  </button>
                  {!notif.read && (
                    <button className="text-xs font-bold text-gray-400 hover:text-primary uppercase tracking-widest">
                      Marquer comme lu
                    </button>
                  )}
                </div>
              </div>
              
              <button className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State Mockup */}
      {notifications.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto mb-6">
            <Bell className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Aucune notification</h3>
          <p className="text-gray-500">Vous êtes à jour ! Revenez plus tard pour voir les nouveautés.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
