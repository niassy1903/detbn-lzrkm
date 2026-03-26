import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Search, 
  Trash2, 
  Download, 
  Folder, 
  Plus, 
  X, 
  Check,
  File,
  MoreVertical,
  Clock,
  User,
  Shield
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDocuments = () => {
  const { documents, addDocument, deleteDocument } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'ADMIN',
    isPublic: false,
    fileUrl: 'https://example.com/doc.pdf', // Mock URL for now
    fileType: 'pdf',
    fileSize: 1024 * 1024 * 2 // 2MB
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument(formData);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      category: 'ADMIN',
      isPublic: false,
      fileUrl: 'https://example.com/doc.pdf',
      fileType: 'pdf',
      fileSize: 1024 * 1024 * 2
    });
  };

  const filteredDocuments = documents.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Gestion des Documents</h2>
          <p className="text-slate-500 font-medium mt-1">Centralisez et partagez les ressources de votre Dahira.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Upload className="w-4 h-4" />
          <span>Téléverser un document</span>
        </button>
      </div>

      <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-white transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          >
            <option value="ALL">Toutes les catégories</option>
            <option value="ADMIN">Administratif</option>
            <option value="MEMBER">Membres</option>
            <option value="EVENT">Événements</option>
            <option value="OTHER">Autres</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDocuments.map((doc, i) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-slate-900 rounded-[40px] border border-slate-800 p-8 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <FileText className="w-7 h-7" />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => deleteDocument(doc.id)}
                  className="p-2.5 bg-slate-950 text-slate-500 hover:text-red-400 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2.5 bg-slate-950 text-slate-500 hover:text-white rounded-xl transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-2">
                <Folder className="w-3 h-3" />
                <span>{doc.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{doc.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{doc.description}</p>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center text-slate-600">
                  <File className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase">{doc.fileType}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{formatFileSize(doc.fileSize)}</p>
                </div>
              </div>
              <a 
                href={doc.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Téléverser un document</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Titre du document</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Statuts de l'association"
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brève description du contenu..."
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all resize-none"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Catégorie</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                    >
                      <option value="ADMIN">Administratif</option>
                      <option value="MEMBER">Membres</option>
                      <option value="EVENT">Événements</option>
                      <option value="OTHER">Autres</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Visibilité</label>
                    <div className="flex items-center space-x-4 h-[60px]">
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, isPublic: false })}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${!formData.isPublic ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}
                      >
                        Privé
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, isPublic: true })}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${formData.isPublic ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-950 text-slate-500 border-slate-800'}`}
                      >
                        Public
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end space-x-4">
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
                    <span>Téléverser</span>
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

export default AdminDocuments;
