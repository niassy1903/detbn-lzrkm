import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Users, 
  Edit2, 
  Trash2,
  ExternalLink,
  X,
  Check,
  Clock,
  Type,
  AlignLeft
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DahiraEvent } from '../../types';
import ImageUpload from '../../components/ImageUpload';

const AdminEvents = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DahiraEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [formData, setFormData] = useState<Partial<DahiraEvent>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    image: 'https://picsum.photos/seed/event/800/600',
    participantsCount: 0,
    status: 'UPCOMING'
  });

  const handleOpenModal = (event?: DahiraEvent) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        image: 'https://picsum.photos/seed/event' + Math.random() + '/800/600',
        participantsCount: 0,
        status: 'UPCOMING'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      // Add missing required fields for the model
      const newEvent = {
        ...formData,
        time: '00:00', // Default time if not provided
        category: 'Général', // Default category if not provided
      };
      addEvent(newEvent as Omit<DahiraEvent, 'id'>);
    }
    setIsModalOpen(false);
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Gestion des Événements</h2>
          <p className="text-slate-500 font-medium mt-1">Planifiez, modifiez et suivez la participation aux événements.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Créer un événement</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-slate-300"
        >
          <option value="ALL">Tous les statuts</option>
          <option value="UPCOMING">À venir</option>
          <option value="ONGOING">En cours</option>
          <option value="COMPLETED">Terminé</option>
        </select>
        <button className="flex items-center justify-center space-x-2 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-slate-800 transition-all">
          <Filter className="w-5 h-5" />
          <span>Plus de filtres</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {filteredEvents.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden group hover:border-emerald-500/30 transition-all"
          >
            <div className="relative h-64">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute top-6 left-6 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {event.status}
              </div>
              <div className="absolute bottom-6 left-8 right-8">
                <h3 className="text-2xl font-black text-white mb-2">{event.title}</h3>
                <div className="flex items-center space-x-4 text-slate-300 text-sm font-medium">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">{event.description}</p>
              
              <div className="flex items-center justify-between p-6 bg-slate-950 rounded-3xl border border-slate-800 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Participants</p>
                    <p className="text-xl font-black text-white">{event.participantsCount}</p>
                  </div>
                </div>
                <button className="text-emerald-500 text-xs font-bold hover:underline flex items-center space-x-1">
                  <span>Voir la liste</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleOpenModal(event)}
                  className="flex-1 bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                <button 
                  onClick={() => deleteEvent(event.id)}
                  className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="p-4 bg-slate-800 text-slate-400 rounded-2xl hover:text-white transition-all border border-slate-700">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
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
              <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    {editingEvent ? <Edit2 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingEvent ? 'Modifier l\'événement' : 'Créer un événement'}</h3>
                    <p className="text-xs text-slate-500 font-medium">Définissez les détails de l'événement.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <ImageUpload 
                      label="Image de couverture"
                      currentImage={formData.image}
                      onImageSelect={(base64) => setFormData({ ...formData, image: base64 })}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Titre de l'événement</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Grande Conférence Religieuse"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Description</label>
                    <div className="relative">
                      <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                      <textarea 
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Détails de l'événement..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Lieu</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: Dakar, Sénégal"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Statut</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                    >
                      <option value="UPCOMING">À venir</option>
                      <option value="ONGOING">En cours</option>
                      <option value="COMPLETED">Terminé</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Participants Max</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="number" 
                        value={formData.participantsCount}
                        onChange={(e) => setFormData({ ...formData, participantsCount: parseInt(e.target.value) })}
                        placeholder="0"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end space-x-4">
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
                    <Check className="w-5 h-5" />
                    <span>{editingEvent ? 'Mettre à jour' : 'Créer l\'événement'}</span>
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

export default AdminEvents;

