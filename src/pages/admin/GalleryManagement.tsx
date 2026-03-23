import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Filter, MoreVertical, Trash2, Image as ImageIcon, 
  Video, FolderPlus, Grid, List, CheckCircle2, XCircle, Edit, 
  Download, Share2, Eye, Maximize2, ChevronRight, UploadCloud, Clock
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

const GalleryManagement: React.FC = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'Événements',
    type: 'image',
    status: 'Publié',
    url: '',
    description: ''
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await api.getGallery();
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (media: any = null) => {
    if (media) {
      setSelectedMedia(media);
      setFormData({
        title: media.title,
        category: media.category,
        type: media.type,
        status: media.status,
        url: media.url || '',
        description: media.description || ''
      });
    } else {
      setSelectedMedia(null);
      setFormData({
        title: '',
        category: 'Événements',
        type: 'image',
        status: 'Publié',
        url: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDeleteMedia = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
      try {
        await api.deleteGalleryItem(id);
        fetchGallery();
      } catch (error) {
        console.error('Error deleting media:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedMedia) {
        await api.updateGalleryItem(selectedMedia._id, formData);
      } else {
        await api.createGalleryItem(formData);
      }
      setIsModalOpen(false);
      fetchGallery();
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const filteredGallery = gallery.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            Médiathèque Numérique
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Gestion de la <span className="text-gradient">Galerie</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Organisez et partagez les moments précieux de votre communauté.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => handleOpenModal()}
            className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Ajouter des médias
          </button>
          <button className="p-5 rounded-[1.5rem] bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
            <FolderPlus className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Total Médias', value: gallery.length.toString(), icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Albums Actifs', value: Array.from(new Set(gallery.map(g => g.category))).length.toString(), icon: FolderPlus, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Espace Utilisé', value: '12.4 GB', icon: UploadCloud, color: 'text-primary', bg: 'bg-primary/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-white/60 flex items-center gap-6 group hover:scale-[1.02] transition-all">
            <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-neutral-900 tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="glass p-6 rounded-[2.5rem] border-white/60 shadow-2xl shadow-primary/5 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-grow group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher par titre, catégorie ou date..." 
            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-neutral-50/50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-neutral-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-neutral-50/50 rounded-2xl p-1.5 border border-neutral-100">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-primary' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-primary' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <List size={20} />
            </button>
          </div>
          <button className="p-5 rounded-2xl bg-neutral-50/50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {loading ? (
            <div className="col-span-full py-20 text-center text-neutral-400 font-bold">Chargement de la galerie...</div>
          ) : filteredGallery.length === 0 ? (
            <div className="col-span-full py-20 text-center text-neutral-400 font-bold">Aucun média trouvé.</div>
          ) : filteredGallery.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-[3rem] border-white/60 overflow-hidden shadow-2xl shadow-primary/5 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.url || `https://picsum.photos/seed/gallery${item._id}/800/600`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                      <Video size={24} className="text-white fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenModal(item); }}
                    className="p-3 rounded-xl bg-white/90 backdrop-blur-md text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteMedia(item._id); }}
                    className="p-3 rounded-xl bg-white/90 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 ${
                    item.status === 'Publié' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {item.status === 'Publié' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight mb-4 truncate group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <FolderPlus size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.category}</span>
                  </div>
                  <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">{item.size || 'N/A'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Add New Placeholder */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOpenModal()}
          className="h-full min-h-[350px] rounded-[3rem] border-4 border-dashed border-neutral-100 flex flex-col items-center justify-center gap-6 text-neutral-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all group"
        >
          <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
            <Plus size={32} />
          </div>
          <div className="text-center">
            <p className="font-black text-lg uppercase tracking-widest mb-1">Ajouter des médias</p>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Photos ou Vidéos</p>
          </div>
        </motion.button>
      </div>

      {/* Add Media Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedMedia ? "Modifier le média" : "Ajouter des médias"}
      >
        <form onSubmit={handleSubmit} className="space-y-8 p-2">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Titre du média</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Gamou 2026 - Cérémonie..."
              className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Album / Catégorie</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
              >
                <option>Événements</option>
                <option>Social</option>
                <option>Éducation</option>
                <option>Infrastructure</option>
                <option>Conférence</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Type de média</label>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'image'})}
                  className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${
                    formData.type === 'image' ? 'bg-primary text-white' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                  }`}
                >
                  <ImageIcon size={14} /> Photo
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, type: 'video'})}
                  className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${
                    formData.type === 'video' ? 'bg-primary text-white' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                  }`}
                >
                  <Video size={14} /> Vidéo
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">URL du média</label>
            <input 
              type="text" 
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder="https://example.com/image.jpg"
              className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Uploader les fichiers</label>
            <div className="border-4 border-dashed border-neutral-100 rounded-[3rem] p-16 flex flex-col items-center justify-center gap-6 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="p-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                <UploadCloud size={40} />
              </div>
              <div className="text-center">
                <p className="font-black text-xl text-neutral-900 uppercase tracking-widest mb-2">Glissez vos fichiers ici</p>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Ou cliquez pour parcourir vos dossiers</p>
                <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mt-4">PNG, JPG, MP4 (Max 50MB par fichier)</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-10 py-5 rounded-2xl bg-neutral-100 text-neutral-600 font-black uppercase tracking-widest hover:bg-neutral-200 transition-all"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="flex-1 px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              {selectedMedia ? "Enregistrer les modifications" : "Ajouter à la galerie"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GalleryManagement;
