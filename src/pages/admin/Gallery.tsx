import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2,
  X,
  Check,
  Type,
  Tag,
  Maximize2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { GalleryItem } from '../../types';
import ImageUpload from '../../components/ImageUpload';

const AdminGallery = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Événement',
    url: 'https://picsum.photos/seed/gallery/800/600'
  });

  const handleOpenModal = () => {
    setFormData({
      title: '',
      category: 'Événement',
      url: 'https://picsum.photos/seed/gallery' + Math.random() + '/800/600'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryItem(formData as Omit<GalleryItem, 'id'>);
    setIsModalOpen(false);
  };

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Gestion de la Galerie</h2>
          <p className="text-slate-500 font-medium mt-1">Gérez les photos et albums de la communauté.</p>
        </div>
        <button 
          onClick={handleOpenModal}
          className="flex items-center space-x-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter une photo</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher une photo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
          />
        </div>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-slate-300"
        >
          <option value="ALL">Toutes les catégories</option>
          <option value="Événement">Événement</option>
          <option value="Conférence">Conférence</option>
          <option value="Social">Social</option>
        </select>
        <button className="flex items-center justify-center space-x-2 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-slate-800 transition-all">
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-square bg-slate-900 rounded-[32px] border border-slate-800 overflow-hidden"
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <button 
                onClick={() => deleteGalleryItem(item.id)}
                className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-slate-900/80 backdrop-blur-md text-white rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-500 text-white px-2 py-1 rounded-md mb-2 inline-block">
                {item.category}
              </span>
              <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
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
              className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Ajouter une photo</h3>
                    <p className="text-xs text-slate-500 font-medium">Partagez un moment avec la communauté.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="space-y-8">
                  <ImageUpload 
                    label="Photo"
                    currentImage={formData.url}
                    onImageSelect={(base64) => setFormData({ ...formData, url: base64 })}
                  />

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Titre / Légende</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Conférence à Dakar"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Catégorie</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                      >
                        <option value="Événement">Événement</option>
                        <option value="Conférence">Conférence</option>
                        <option value="Social">Social</option>
                      </select>
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
                    <span>Ajouter à la galerie</span>
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

export default AdminGallery;
