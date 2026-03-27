import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Participation = () => {
  const { events } = useData();
  const { user } = useAuth();

  // Filter events where the user is a participant
  const myEvents = events.filter(event => 
    event.participants?.includes(user?.id || '')
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Ma Participation</h2>
          <p className="text-gray-500 font-medium mt-1">Retrouvez tous les événements auxquels vous participez.</p>
        </div>
        <div className="flex items-center space-x-4 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
          <div className="text-right">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Total Événements</p>
            <p className="text-2xl font-black text-emerald-900">{myEvents.length}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {myEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {myEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-emerald-600 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
                  Inscrit
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{event.title}</h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">{event.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-emerald-600 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold">{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-emerald-600 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold truncate">{event.location}</span>
                  </div>
                </div>

                <Link 
                  to="/member/events" 
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black text-sm hover:bg-emerald-600 hover:text-white transition-all group/btn"
                >
                  <span>Détails de l'événement</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] p-16 text-center border border-dashed border-gray-200 space-y-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <Calendar className="w-12 h-12" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-black text-gray-900">Aucune participation active</h3>
            <p className="text-gray-500 font-medium mt-2">
              Vous n'êtes inscrit à aucun événement pour le moment. Parcourez la liste des événements pour nous rejoindre !
            </p>
          </div>
          <Link 
            to="/member/events" 
            className="inline-flex items-center space-x-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20"
          >
            <span>Découvrir les événements</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Participation;
