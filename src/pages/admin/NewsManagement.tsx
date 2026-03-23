import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Calendar, 
  User, Tag, CheckCircle2, Clock, Image as ImageIcon, FileText, 
  ChevronRight, ArrowUpRight, Globe, MessageSquare
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

const NewsManagement: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Événement',
    status: 'Publié',
    author: 'Admin Dahira'
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await api.getNews();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (article: any = null) => {
    if (article) {
      setSelectedArticle(article);
      setFormData({
        title: article.title,
        content: article.content,
        category: article.category,
        status: article.status,
        author: article.author || 'Admin Dahira'
      });
    } else {
      setSelectedArticle(null);
      setFormData({
        title: '',
        content: '',
        category: 'Événement',
        status: 'Publié',
        author: 'Admin Dahira'
      });
    }
    setIsModalOpen(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await api.deleteNews(id);
        fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedArticle) {
        await api.updateNews(selectedArticle._id, formData);
      } else {
        await api.createNews(formData);
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author?.toLowerCase().includes(searchTerm.toLowerCase())
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
            Communication & Presse
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Gestion des <span className="text-gradient">Actualités</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Diffusez les messages et les nouvelles importantes de la communauté.
          </p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Nouvel article
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Articles Publiés', value: news.filter(n => n.status === 'Publié').length.toString(), icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Vues Totales', value: news.reduce((acc, n) => acc + (n.views || 0), 0).toLocaleString(), icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Engagement', value: '8.4%', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-white/60 flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{stat.label}</p>
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
            placeholder="Rechercher un article par titre ou auteur..." 
            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-neutral-50/50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-neutral-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select className="bg-neutral-50/50 border-none rounded-2xl px-8 py-5 text-sm font-black text-neutral-600 focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer hover:bg-neutral-100 transition-colors">
            <option>Toutes les catégories</option>
            <option>Événement</option>
            <option>Éducation</option>
            <option>Social</option>
          </select>
          <button className="p-5 rounded-2xl bg-neutral-50/50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence>
          {loading ? (
            <div className="col-span-full py-20 text-center text-neutral-400 font-bold">Chargement des actualités...</div>
          ) : filteredNews.length === 0 ? (
            <div className="col-span-full py-20 text-center text-neutral-400 font-bold">Aucun article trouvé.</div>
          ) : filteredNews.map((item, index) => (
            <motion.div 
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-[3rem] border-white/60 overflow-hidden shadow-2xl shadow-primary/5 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image || `https://picsum.photos/seed/${item._id}/800/600`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-6 right-6">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 ${
                    item.status === 'Publié' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {item.status === 'Publié' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                  </div>
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Calendar size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-neutral-300" />
                  <div className="flex items-center gap-2 text-neutral-400">
                    <User size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.author || 'Admin'}</span>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-neutral-900 tracking-tighter mb-6 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between pt-8 border-t border-neutral-100">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Eye size={16} />
                      <span className="text-sm font-bold">{item.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                      <MessageSquare size={16} />
                      <span className="text-sm font-bold">{item.comments?.length || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleOpenModal(item); }}
                      className="p-3 rounded-2xl hover:bg-primary/10 text-primary transition-all hover:scale-110"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteNews(item._id); }}
                      className="p-3 rounded-2xl hover:bg-red-50 text-red-500 transition-all hover:scale-110"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Article Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedArticle ? "Modifier l'article" : "Créer un nouvel article"}
      >
        <form onSubmit={handleSubmit} className="space-y-8 p-2">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Titre de l'article</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Célébration du Gamou 2026..."
              className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Catégorie</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
              >
                <option>Événement</option>
                <option>Éducation</option>
                <option>Social</option>
                <option>Infrastructure</option>
                <option>Conférence</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Statut</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
              >
                <option>Publié</option>
                <option>Brouillon</option>
                <option>Archivé</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Contenu de l'article</label>
            <textarea 
              rows={8}
              required
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Rédigez votre article ici..."
              className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900 resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Image de couverture</label>
            <div className="border-2 border-dashed border-neutral-200 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="p-6 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all">
                <ImageIcon size={32} />
              </div>
              <div className="text-center">
                <p className="font-black text-neutral-900 uppercase tracking-widest text-xs mb-1">Cliquez pour uploader</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">PNG, JPG ou WEBP (Max 5MB)</p>
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
              {selectedArticle ? "Enregistrer les modifications" : "Publier l'article"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewsManagement;
