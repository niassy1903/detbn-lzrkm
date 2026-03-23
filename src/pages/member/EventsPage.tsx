import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, Users, ChevronRight, Filter, Search } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Réunion Mensuelle du Dahira",
    date: "2026-04-05",
    time: "15:00 - 18:00",
    location: "Siège Social, Dakar",
    category: "Réunion",
    description: "Discussion sur les projets en cours et les prochaines activités spirituelles.",
    status: "Confirmé",
    attendees: 45
  },
  {
    id: 2,
    title: "Conférence : L'éthique dans le travail",
    date: "2026-04-12",
    time: "10:00 - 13:00",
    location: "Grande Mosquée",
    category: "Conférence",
    description: "Une session d'apprentissage sur l'application des valeurs spirituelles dans le milieu professionnel.",
    status: "À venir",
    attendees: 120
  },
  {
    id: 3,
    title: "Journée de Solidarité",
    date: "2026-04-18",
    time: "09:00 - 17:00",
    location: "Quartier Médina",
    category: "Social",
    description: "Distribution de repas et assistance aux personnes âgées de la communauté.",
    status: "À venir",
    attendees: 30
  },
  {
    id: 4,
    title: "Cours de Perfectionnement Coranique",
    date: "2026-04-25",
    time: "16:00 - 19:00",
    location: "Salle de Formation",
    category: "Éducation",
    description: "Session intensive de révision et de mémorisation pour tous les niveaux.",
    status: "Confirmé",
    attendees: 25
  }
];

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Événements</h1>
          <p className="text-gray-500">Consultez et inscrivez-vous aux prochaines activités.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Featured Event */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-primary text-white p-8 md:p-12"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <CalendarIcon className="w-full h-full -rotate-12 translate-x-1/4 translate-y-1/4" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            Événement Phare
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Grand Magal de Touba 2026</h2>
          <p className="text-white/80 text-lg mb-8">
            Préparez-vous pour le plus grand rassemblement spirituel de l'année. Organisation du convoi et hébergement en cours.
          </p>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-secondary" />
              <span>15 Septembre 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>Touba, Sénégal</span>
            </div>
          </div>
          
          <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary transition-colors">
            Voir les détails
          </button>
        </div>
      </motion.div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row md:items-center gap-6"
          >
            {/* Date Box */}
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/5 flex flex-col items-center justify-center text-primary">
              <span className="text-2xl font-bold">{event.date.split('-')[2]}</span>
              <span className="text-xs font-bold uppercase tracking-widest">
                {new Date(event.date).toLocaleString('fr-FR', { month: 'short' })}
              </span>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/5 px-2 py-1 rounded">
                  {event.category}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  event.status === 'Confirmé' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {event.status}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {event.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {event.attendees} inscrits
                </div>
              </div>
            </div>
            
            <button className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
