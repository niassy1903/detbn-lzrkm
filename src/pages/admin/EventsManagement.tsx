import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, MapPin, Users, Clock, Plus, Search, Filter, 
  MoreVertical, Edit, Trash2, CheckCircle2, AlertCircle,
  ArrowRight, ChevronRight, Share2, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

const EventsManagement: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    category: 'Religieux',
    status: 'À venir'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await api.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      category: 'Religieux',
      status: 'À venir'
    });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date.split('T')[0],
      location: event.location,
      description: event.description || '',
      category: event.category,
      status: event.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await api.deleteEvent(id);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedEvent) {
        await api.updateEvent(selectedEvent._id, formData);
      } else {
        await api.createEvent(formData);
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-primary/5"
          >
            Calendrier & Événements
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Gestion des <span className="text-gradient">Événements</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Planifiez, organisez et suivez tous les rassemblements de votre communauté.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleCreateEvent}
            className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Créer un événement
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="glass p-6 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5 flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="relative flex-grow group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors w-6 h-6" />
          <input 
            type="text" 
            placeholder="Rechercher un événement..." 
            className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-neutral-50 border border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all text-lg font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select className="bg-neutral-50 border-none rounded-[1.5rem] px-8 py-5 text-sm font-black text-neutral-600 focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer hover:bg-neutral-100 transition-colors">
            <option>Toutes les catégories</option>
            <option>Religieux</option>
            <option>Social</option>
            <option>Éducatif</option>
            <option>Culturel</option>
          </select>
          <button className="p-5 rounded-[1.5rem] bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full py-20 text-center text-neutral-400 font-bold">Chargement des événements...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="col-span-full py-20 text-center text-neutral-400 font-bold">Aucun événement trouvé.</div>
        ) : filteredEvents.map((event, i) => (
          <motion.div 
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 overflow-hidden card-hover group"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={event.image || `https://picsum.photos/seed/${event._id}/800/400`} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-6 left-6">
                <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-md border border-white/20 text-white ${
                  event.status === 'À venir' ? 'bg-primary/40' : 'bg-neutral-500/40'
                }`}>
                  {event.status}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-2 block">{event.category}</span>
                <h3 className="text-2xl font-black text-white tracking-tight">{event.title}</h3>
              </div>
            </div>
            
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-neutral-500">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-500">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-500 col-span-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold truncate">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-neutral-400" />
                  <span className="text-sm font-black text-neutral-900">{event.attendees?.length || 0} inscrits</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEditEvent(event)}
                    className="p-3 rounded-2xl hover:bg-primary/10 text-primary transition-all hover:scale-110"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event._id)}
                    className="p-3 rounded-2xl hover:bg-red-50 text-red-500 transition-all hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button className="p-3 rounded-2xl hover:bg-neutral-100 text-neutral-400 transition-all">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Add New Event Card */}
        <motion.button 
          onClick={handleCreateEvent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: events.length * 0.1 }}
          className="rounded-[4rem] border-4 border-dashed border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-10 min-h-[400px]"
        >
          <div className="w-24 h-24 rounded-[2.5rem] bg-neutral-100 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-xl group-hover:scale-110">
            <Plus size={48} />
          </div>
          <span className="text-2xl font-black text-neutral-400 group-hover:text-primary transition-colors tracking-tight">Nouvel Événement</span>
          <p className="text-neutral-400 mt-2 font-medium">Planifiez un nouveau rassemblement</p>
        </motion.button>
      </div>

      {/* Create/Edit Event Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedEvent ? "Modifier l'événement" : "Créer un événement"}
      >
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex items-center gap-8 p-8 bg-primary/5 rounded-[2.5rem] border border-primary/5">
            <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center text-primary shadow-xl">
              <Calendar size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Détails de l'événement</h3>
              <p className="text-neutral-500 font-medium">Définissez les paramètres de votre futur rassemblement.</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Titre de l'événement</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                placeholder="Ex: Gamou Annuel 2024" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all cursor-pointer" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Catégorie</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all cursor-pointer"
                >
                  <option>Religieux</option>
                  <option>Social</option>
                  <option>Éducatif</option>
                  <option>Culturel</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Lieu / Emplacement</label>
              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 w-6 h-6" />
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full pl-16 pr-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                  placeholder="Ex: Grande Mosquée, Médina Baye" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Description</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all min-h-[150px]" 
                placeholder="Détails de l'événement..." 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Image de couverture</label>
              <div className="relative group">
                <div className="w-full p-12 border-4 border-dashed border-neutral-100 rounded-[3rem] bg-neutral-50/50 flex flex-col items-center justify-center text-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-all cursor-pointer">
                  <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-neutral-300 group-hover:text-primary shadow-xl group-hover:scale-110 transition-all mb-6">
                    <ImageIcon size={32} />
                  </div>
                  <p className="text-lg font-black text-neutral-900 tracking-tight">Cliquez ou glissez une image ici</p>
                  <p className="text-sm text-neutral-400 font-medium mt-2">Format paysage recommandé (16:9)</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 pt-10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow btn-secondary !py-6 !text-xl">Annuler</button>
            <button type="submit" className="flex-grow btn-primary !py-6 !text-xl shadow-2xl shadow-primary/20">
              {selectedEvent ? 'Mettre à jour' : 'Publier l\'événement'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventsManagement;
