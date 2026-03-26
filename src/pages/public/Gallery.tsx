import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageIcon, Maximize2, X, Filter, Camera, Sparkles, Heart, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Gallery = () => {
  const { gallery } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', ...new Set(gallery.map(item => item.category))];

  const filteredPhotos = filter === 'Tous' ? gallery : gallery.filter(p => p.category === filter);

  return (
    <div className="bg-white min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-subtitle">Archives Visuelles</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-none tracking-tighter">
              Galerie <span className="text-emerald-600 italic">Dahira</span>.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Une immersion visuelle au cœur de nos activités, de nos rencontres et de notre engagement spirituel quotidien.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200' 
                  : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => (
              <motion.div 
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="relative group rounded-[60px] overflow-hidden cursor-pointer shadow-xl shadow-emerald-900/5 hover:shadow-emerald-900/20 transition-all break-inside-avoid border border-emerald-50"
                onClick={() => setSelectedImage(photo.url)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-12">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                        {photo.category}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-2xl mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.title}</h3>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPhotos.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ImageIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Aucune photo trouvée</h3>
            <p className="text-slate-500 font-medium">Désolé, nous n'avons trouvé aucun résultat pour cette catégorie.</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-emerald-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-6xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                className="max-w-full max-h-[85vh] rounded-[40px] shadow-3xl shadow-emerald-950/50 border border-white/10 object-contain"
                alt="Enlarged view"
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-xs">Ansaroudine Dahira Archives</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Section */}
      <section className="py-32 bg-slate-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="flex justify-center space-x-4 mb-12">
            {[Heart, Star, Sparkles].map((Icon, i) => (
              <div key={i} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-600">
                <Icon className="w-6 h-6" />
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-serif italic text-slate-900 leading-relaxed mb-8">
            "L'image est un reflet de l'instant, mais la lumière qu'elle capture est éternelle."
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mb-6"></div>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600">Esprit de la Dahira</span>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
