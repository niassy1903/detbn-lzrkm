import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowRight, Filter, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

const MemberEvents = () => {
  const { events, participateInEvent } = useData();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [filter, setFilter] = useState<'ALL' | 'UPCOMING' | 'COMPLETED'>('ALL');

  const filteredEvents = events.filter(event => {
    if (filter === 'ALL') return true;
    return event.status === filter;
  });

  const handleParticipate = async (eventId: string, eventTitle: string) => {
    if (!user) return;
    
    try {
      await participateInEvent(eventId, user.id);
      addNotification({
        title: 'Participation confirmée',
        message: `Votre participation à l'événement "${eventTitle}" a été enregistrée.`,
        type: 'event'
      });
    } catch (error) {
      console.error('Error participating:', error);
    }
  };

  const isParticipating = (event: any) => {
    return event.participants?.includes(user?.id || '');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Événements du Dahira</h2>
          <p className="text-gray-500 font-medium">Participez aux activités et restez connecté à la communauté.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'ALL' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Tous
          </button>
          <button 
            onClick={() => setFilter('UPCOMING')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'UPCOMING' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            À venir
          </button>
          <button 
            onClick={() => setFilter('COMPLETED')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'COMPLETED' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Passés
          </button>
          <div className="w-px h-6 bg-gray-100 mx-2"></div>
          <button className="p-2 text-gray-400 hover:text-emerald-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {filteredEvents.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group hover:border-emerald-200 transition-all"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-center">
                <span className="block text-xl font-black text-emerald-600 leading-none">
                  {new Date(event.date).getDate()}
                </span>
                <span className="text-[10px] font-bold uppercase text-gray-500">
                  {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                </span>
              </div>
              <div className={`absolute bottom-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold ${
                event.status === 'UPCOMING' || event.status === 'ONGOING' ? 'bg-emerald-600 text-white' : 'bg-gray-500 text-white'
              }`}>
                {event.status === 'UPCOMING' ? 'À venir' : event.status === 'ONGOING' ? 'En cours' : 'Terminé'}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">{event.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{event.description}</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-gray-500">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">{event.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">{event.participantsCount} participants attendus</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {event.status === 'UPCOMING' || event.status === 'ONGOING' ? (
                  <button 
                    onClick={() => handleParticipate(event.id, event.title)}
                    disabled={isParticipating(event)}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 ${
                      isParticipating(event)
                        ? 'bg-emerald-50 text-emerald-600 cursor-default'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100'
                    }`}
                  >
                    {isParticipating(event) ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Inscrit</span>
                      </>
                    ) : (
                      <span>Je participe</span>
                    )}
                  </button>
                ) : (
                  <button disabled className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-2xl font-bold cursor-not-allowed">
                    Événement terminé
                  </button>
                )}
                <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Aucun événement trouvé</h3>
          <p className="text-gray-500 mt-2">Revenez plus tard pour de nouvelles activités.</p>
        </div>
      )}
    </div>
  );
};

export default MemberEvents;
