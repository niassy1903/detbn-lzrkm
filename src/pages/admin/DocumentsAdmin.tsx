import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Download, Eye, Search, Filter, Folder, MoreVertical, 
  File, Clock, Shield, Upload, Trash2, Edit, Share2, ChevronRight, 
  FileCode, FileImage, FileSpreadsheet, HardDrive, Lock, Globe
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

const DocumentsAdmin: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: 'Administratif',
    status: 'Public',
    description: '',
    url: ''
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await api.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (doc: any = null) => {
    if (doc) {
      setSelectedDoc(doc);
      setFormData({
        title: doc.title,
        category: doc.category,
        status: doc.status,
        description: doc.description || '',
        url: doc.url || ''
      });
    } else {
      setSelectedDoc(null);
      setFormData({
        title: '',
        category: 'Administratif',
        status: 'Public',
        description: '',
        url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDeleteDoc = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await api.deleteDocument(id);
        fetchDocuments();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedDoc) {
        await api.updateDocument(selectedDoc._id, formData);
      } else {
        await api.createDocument(formData);
      }
      setIsModalOpen(false);
      fetchDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const getFileIcon = (type: string) => {
    const upperType = type?.toUpperCase();
    switch (upperType) {
      case 'PDF': return <FileText size={24} className="text-red-500" />;
      case 'XLSX':
      case 'CSV': return <FileSpreadsheet size={24} className="text-green-500" />;
      case 'ZIP':
      case 'RAR': return <FileCode size={24} className="text-orange-500" />;
      case 'JPG':
      case 'PNG': return <FileImage size={24} className="text-blue-500" />;
      default: return <File size={24} className="text-blue-500" />;
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            Archives & Documentation
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Gestion des <span className="text-gradient">Documents</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Centralisez, sécurisez et partagez les ressources essentielles du Dahira.
          </p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
        >
          <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          Téléverser un document
        </button>
      </header>

      {/* Stats Summary Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {[
          { label: 'Total Fichiers', value: documents.length.toString(), icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Stockage Utilisé', value: '4.2 GB', icon: HardDrive, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Téléchargements', value: documents.reduce((acc, d) => acc + (d.downloads || 0), 0).toLocaleString(), icon: Download, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Documents Privés', value: documents.filter(d => d.status === 'Privé').length.toString(), icon: Shield, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-white/60 flex items-center gap-6 group hover:scale-[1.02] transition-all">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tighter">{stat.value}</h3>
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
            placeholder="Rechercher par nom, catégorie ou type..." 
            className="w-full pl-16 pr-8 py-5 rounded-2xl bg-neutral-50/50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-neutral-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select className="bg-neutral-50/50 border-none rounded-2xl px-8 py-5 text-sm font-black text-neutral-600 focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer hover:bg-neutral-100 transition-colors">
            <option>Toutes les catégories</option>
            <option>Administratif</option>
            <option>Rapport</option>
            <option>Planning</option>
            <option>Design</option>
          </select>
          <button className="p-5 rounded-2xl bg-neutral-50/50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="glass rounded-[3rem] border-white/60 overflow-hidden shadow-2xl shadow-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50">
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Document</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Catégorie</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Taille</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Statut</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-neutral-400 font-bold">Chargement des documents...</td>
                </tr>
              ) : filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-neutral-400 font-bold">Aucun document trouvé.</td>
                </tr>
              ) : filteredDocs.map((doc, index) => (
                <motion.tr 
                  key={doc._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-primary/[0.02] transition-colors group cursor-pointer"
                >
                  <td className="px-10 py-8" onClick={() => handleOpenModal(doc)}>
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getFileIcon(doc.type || 'FILE')}
                      </div>
                      <div>
                        <div className="font-black text-neutral-900 text-lg tracking-tight mb-1">{doc.title}</div>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-black uppercase tracking-widest">
                          <Clock size={10} />
                          {new Date(doc.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[10px] font-black text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm font-bold text-neutral-500">{doc.size || 'N/A'}</td>
                  <td className="px-10 py-8">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border w-fit ${
                      doc.status === 'Public' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 
                      doc.status === 'Privé' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 
                      'bg-blue-500/10 text-blue-600 border-blue-500/20'
                    }`}>
                      {doc.status === 'Public' ? <Globe size={12} /> : <Lock size={12} />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{doc.status}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleOpenModal(doc)}
                        className="p-3 rounded-xl hover:bg-primary/10 text-primary transition-all" 
                        title="Modifier"
                      >
                        <Edit size={20} />
                      </button>
                      <button className="p-3 rounded-xl hover:bg-blue-500/10 text-blue-500 transition-all" title="Partager">
                        <Share2 size={20} />
                      </button>
                      <button 
                        onClick={() => handleDeleteDoc(doc._id)}
                        className="p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all" 
                        title="Supprimer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedDoc ? "Modifier le document" : "Téléverser un document"}
      >
        <form onSubmit={handleSubmit} className="space-y-8 p-2">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Nom du document</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Statuts du Dahira 2026..."
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
                <option>Administratif</option>
                <option>Rapport</option>
                <option>Planning</option>
                <option>Design</option>
                <option>Juridique</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Visibilité / Statut</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
              >
                <option>Public</option>
                <option>Interne</option>
                <option>Privé</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">URL du document</label>
            <input 
              type="text" 
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder="https://example.com/document.pdf"
              className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Description (Optionnel)</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Décrivez brièvement le contenu du document..."
              className="w-full px-8 py-5 rounded-2xl bg-neutral-50 border border-neutral-100 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-neutral-900 resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Sélectionner le fichier</label>
            <div className="border-4 border-dashed border-neutral-100 rounded-[3rem] p-16 flex flex-col items-center justify-center gap-6 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="p-8 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                <Upload size={40} />
              </div>
              <div className="text-center">
                <p className="font-black text-xl text-neutral-900 uppercase tracking-widest mb-2">Glissez votre fichier ici</p>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Ou cliquez pour parcourir vos dossiers</p>
                <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mt-4">PDF, XLSX, DOCX, ZIP (Max 20MB)</p>
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
              {selectedDoc ? "Enregistrer les modifications" : "Téléverser le document"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DocumentsAdmin;
