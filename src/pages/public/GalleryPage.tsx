import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Image as ImageIcon, Video, Camera } from 'lucide-react';

const galleryItems = [
  { id: 1, type: 'image', category: 'Événements', title: 'Gamou 2026', url: 'https://picsum.photos/seed/gamou1/1200/800' },
  { id: 2, type: 'image', category: 'Social', title: 'Distribution de kits', url: 'https://picsum.photos/seed/social1/800/1200' },
  { id: 3, type: 'image', category: 'Éducation', title: 'Cours de Coran', url: 'https://picsum.photos/seed/edu1/1200/1200' },
  { id: 4, type: 'image', category: 'Infrastructure', title: 'Rénovation Siège', url: 'https://picsum.photos/seed/infra1/1200/800' },
  { id: 5, type: 'image', category: 'Événements', title: 'Conférence Spirituelle', url: 'https://picsum.photos/seed/event1/800/1200' },
  { id: 6, type: 'image', category: 'Social', title: 'Visite aux malades', url: 'https://picsum.photos/seed/social2/1200/800' },
  { id: 7, type: 'image', category: 'Éducation', title: 'Remise de diplômes', url: 'https://picsum.photos/seed/edu2/1200/800' },
  { id: 8, type: 'image', category: 'Événements', title: 'Ziarra Annuelle', url: 'https://picsum.photos/seed/event2/800/1200' },
  { id: 9, type: 'image', category: 'Infrastructure', title: 'Nouveaux bureaux', url: 'https://picsum.photos/seed/infra2/1200/1200' },
];

const GalleryPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [filter, setFilter] = useState('Tous');

  const categories = ['Tous', 'Événements', 'Social', 'Éducation', 'Infrastructure'];
  const filteredItems = filter === 'Tous' ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/gallery-hero/1920/1080" 
            alt="Gallery Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mb-4"
          >
            Notre <span className="text-secondary italic">Galerie</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            Revivez les moments forts de notre communauté à travers ces images.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white sticky top-20 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-1 block">
                          {item.category}
                        </span>
                        <h3 className="text-white font-serif text-xl">
                          {item.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedItem.url} 
                alt={selectedItem.title} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-primary/20"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 text-center">
                <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 block">
                  {selectedItem.category}
                </span>
                <h2 className="text-white text-3xl font-serif">
                  {selectedItem.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ImageIcon, label: 'Photos', value: '1,200+' },
              { icon: Video, label: 'Vidéos', value: '45' },
              { icon: Camera, label: 'Événements', value: '150+' },
              { icon: Maximize2, label: 'Albums', value: '24' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
