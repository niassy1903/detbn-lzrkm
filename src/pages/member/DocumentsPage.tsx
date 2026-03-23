import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Eye, Search, Filter, Folder, MoreVertical, File, Clock, Shield } from 'lucide-react';

const documents = [
  { id: 1, name: "Statuts du Dahira.pdf", type: "PDF", size: "2.4 MB", date: "15 Jan 2026", category: "Administratif", icon: FileText },
  { id: 2, name: "Règlement Intérieur.pdf", type: "PDF", size: "1.8 MB", date: "15 Jan 2026", category: "Administratif", icon: FileText },
  { id: 3, name: "Rapport Annuel 2025.pdf", type: "PDF", size: "5.2 MB", date: "05 Fév 2026", category: "Rapport", icon: FileText },
  { id: 4, name: "Calendrier des Activités.xlsx", type: "XLSX", size: "850 KB", date: "10 Mar 2026", category: "Planning", icon: File },
  { id: 5, name: "Guide du Nouveau Membre.pdf", type: "PDF", size: "3.1 MB", date: "20 Mar 2026", category: "Guide", icon: FileText },
  { id: 6, name: "Formulaire de Cotisation.docx", type: "DOCX", size: "420 KB", date: "22 Mar 2026", category: "Administratif", icon: File },
];

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500">Accédez aux ressources et documents officiels du Dahira.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Rechercher un document..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Administratif', count: 12, color: 'bg-blue-500' },
          { name: 'Rapports', count: 8, color: 'bg-green-500' },
          { name: 'Plannings', count: 5, color: 'bg-purple-500' },
          { name: 'Guides', count: 3, color: 'bg-orange-500' },
        ].map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-2xl ${cat.color} bg-opacity-10 flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110`}>
              <Folder className={`w-6 h-6 ${cat.color.replace('bg-', 'text-')}`} />
            </div>
            <h3 className="font-bold text-gray-900">{cat.name}</h3>
            <p className="text-xs text-gray-500">{cat.count} fichiers</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Documents Table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-gray-900">Tous les documents</h2>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Dernière mise à jour: Aujourd'hui
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Nom du fichier</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Catégorie</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Taille</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {documents.map((doc, index) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <doc.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{doc.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doc.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-xl hover:bg-primary/10 text-primary transition-colors" title="Aperçu">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-xl hover:bg-primary/10 text-primary transition-colors" title="Télécharger">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
          <Shield className="w-8 h-8" />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl font-serif font-bold mb-2">Sécurité des documents</h3>
          <p className="text-white/60 text-sm">
            Tous les documents partagés sur cette plateforme sont strictement confidentiels et réservés aux membres du Dahira. 
            Le partage non autorisé est passible de sanctions.
          </p>
        </div>
        <button className="bg-white text-primary px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors whitespace-nowrap">
          Signaler un abus
        </button>
      </div>
    </div>
  );
};

export default DocumentsPage;
