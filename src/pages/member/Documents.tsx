import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Clock, 
  User, 
  ChevronRight, 
  File, 
  FileImage, 
  FileType,
  Share2,
  ExternalLink,
  MoreVertical,
  Info
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const Documents = () => {
  const { documents } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', name: 'Tous les documents' },
    { id: 'ADMIN', name: 'Administration' },
    { id: 'SPIRITUAL', name: 'Spirituel' },
    { id: 'EVENTS', name: 'Événements' },
    { id: 'OTHER', name: 'Autres' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileType className="w-8 h-8 text-red-500" />;
    if (type.includes('image')) return <FileImage className="w-8 h-8 text-blue-500" />;
    if (type.includes('word') || type.includes('doc')) return <FileText className="w-8 h-8 text-blue-600" />;
    return <File className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Documents Partagés</h2>
          <p className="text-gray-500 font-medium mt-2 text-lg">Accédez aux ressources et documents officiels de la Dahira.</p>
        </div>
        <div className="flex items-center space-x-4 bg-emerald-50 px-8 py-4 rounded-[32px] border border-emerald-100 shadow-sm">
          <div className="text-right">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">Ressources Disponibles</p>
            <p className="text-3xl font-black text-emerald-900 leading-none mt-1">{documents.length}</p>
          </div>
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
            <FileText className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher par titre ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border border-gray-100 rounded-[28px] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30 outline-none transition-all font-medium text-gray-900"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-5 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat.id 
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group relative overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-[22px] flex items-center justify-center group-hover:bg-emerald-50 transition-colors duration-500">
                    {getFileIcon(doc.type || '')}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                      {doc.category || 'Général'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {doc.size || '2.4 MB'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight tracking-tight">
                    {doc.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                    {doc.description || 'Aucune description fournie pour ce document.'}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {new Date(doc.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-6 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-gray-900/10 group/btn"
                  >
                    <span>Télécharger</span>
                    <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[50px] p-24 text-center border border-dashed border-gray-200 space-y-8">
          <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center mx-auto text-gray-200 relative">
            <FileText className="w-16 h-16" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
              <Info className="w-5 h-5" />
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Aucun document trouvé</h3>
            <p className="text-gray-500 font-medium mt-4 text-lg leading-relaxed">
              Nous n'avons trouvé aucun document correspondant à vos critères de recherche.
            </p>
          </div>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
            className="px-10 py-5 bg-emerald-600 text-white rounded-[24px] font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/20 uppercase tracking-widest text-sm"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default Documents;
