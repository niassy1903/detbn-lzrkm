import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Tag, 
  Edit2, 
  Trash2,
  X,
  Check,
  Type,
  AlignLeft,
  Eye
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { NewsItem } from '../../types';
import ImageUpload from '../../components/ImageUpload';

const AdminNews = () => {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    category: 'Actualité',
    image: 'https://picsum.photos/seed/news/800/600',
    author: 'Admin'
  });

  const handleOpenModal = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
      setFormData(item);
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        category: 'Actualité',
        image: 'https://picsum.photos/seed/news' + Math.random() + '/800/600',
        author: 'Admin'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      updateNews(editingNews.id, formData);
    } else {
      addNews(formData as Omit<NewsItem, 'id'>);
    }
    setIsModalOpen(false);
  };

  const filteredNews = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || n.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Gestion des Actualités</h2>
          <p className="text-slate-500 font-medium mt-1">Publiez et gérez les articles et annonces du Dahira.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Nouvel Article</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un article..."
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
          <option value="Actualité">Actualité</option>
          <option value="Événement">Événement</option>
          <option value="Annonce">Annonce</option>
        </select>
        <button className="flex items-center justify-center space-x-2 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold hover:bg-slate-800 transition-all">
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
        </button>
      </div>

      {/* News List */}
      <div className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800">
                <th className="px-10 py-6">Article</th>
                <th className="px-10 py-6">Catégorie</th>
                <th className="px-10 py-6">Date</th>
                <th className="px-10 py-6">Auteur</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredNews.map((item, i) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-10 py-6 max-w-md">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-12 rounded-xl object-cover border border-slate-800" />
                      <div>
                        <p className="text-sm font-bold text-white line-clamp-1">{item.title}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-lg border border-blue-500/20">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-400">{item.date}</td>
                  <td className="px-10 py-6 text-sm text-slate-400">{item.author}</td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2.5 bg-slate-800 text-slate-400 hover:text-blue-400 rounded-xl transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2.5 bg-slate-800 text-slate-400 hover:text-emerald-400 rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteNews(item.id)}
                        className="p-2.5 bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
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
                    {editingNews ? <Edit2 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingNews ? 'Modifier l\'article' : 'Nouvel article'}</h3>
                    <p className="text-xs text-slate-500 font-medium">Rédigez votre contenu ci-dessous.</p>
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
                      label="Image de l'article"
                      currentImage={formData.image}
                      onImageSelect={(base64) => setFormData({ ...formData, image: base64 })}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Titre de l'article</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Les bienfaits du Zikr"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Résumé (Extrait)</label>
                    <div className="relative">
                      <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                      <textarea 
                        required
                        rows={2}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Un court résumé pour la liste..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Contenu Complet</label>
                    <textarea 
                      required
                      rows={8}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Rédigez votre article ici..."
                      className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all resize-none"
                    />
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
                        <option value="Actualité">Actualité</option>
                        <option value="Événement">Événement</option>
                        <option value="Annonce">Annonce</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Auteur</label>
                    <input 
                      type="text" 
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                    />
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
                    <span>{editingNews ? 'Mettre à jour' : 'Publier l\'article'}</span>
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

export default AdminNews;
