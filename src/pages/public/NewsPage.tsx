import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "Célébration du Gamou 2026 : Un moment de grâce",
    excerpt: "Retour sur la célébration exceptionnelle du Gamou cette année, marquée par une ferveur spirituelle sans précédent...",
    date: "20 Mars 2026",
    author: "Admin Dahira",
    category: "Événement",
    image: "https://picsum.photos/seed/gamou/800/600"
  },
  {
    id: 2,
    title: "Nouveau programme de soutien scolaire",
    excerpt: "Le Dahira lance un nouveau programme d'accompagnement pour les étudiants de la communauté afin de favoriser l'excellence académique.",
    date: "15 Mars 2026",
    author: "Commission Éducation",
    category: "Éducation",
    image: "https://picsum.photos/seed/education/800/600"
  },
  {
    id: 3,
    title: "Travaux de rénovation du siège social",
    excerpt: "Grâce à vos généreuses contributions, les travaux de modernisation de notre siège avancent à grands pas. Découvrez les premières images.",
    date: "10 Mars 2026",
    author: "Commission Travaux",
    category: "Infrastructure",
    image: "https://picsum.photos/seed/building/800/600"
  },
  {
    id: 4,
    title: "Conférence sur la Finance Islamique",
    excerpt: "Une conférence thématique sera organisée le mois prochain pour sensibiliser nos membres aux principes de la finance éthique.",
    date: "05 Mars 2026",
    author: "Admin Dahira",
    category: "Conférence",
    image: "https://picsum.photos/seed/finance/800/600"
  },
  {
    id: 5,
    title: "Action Sociale : Distribution de kits alimentaires",
    excerpt: "La commission sociale a procédé à une distribution de kits alimentaires aux familles nécessiteuses du quartier.",
    date: "01 Mars 2026",
    author: "Commission Sociale",
    category: "Social",
    image: "https://picsum.photos/seed/charity/800/600"
  },
  {
    id: 6,
    title: "Lancement de la plateforme Dahira Manager Pro",
    excerpt: "Nous sommes fiers de vous présenter notre nouvel outil digital pour une gestion plus transparente et efficace de notre communauté.",
    date: "25 Février 2026",
    author: "Admin Dahira",
    category: "Digital",
    image: "https://picsum.photos/seed/digital/800/600"
  }
];

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/news-hero/1920/1080" 
            alt="News Hero" 
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
            Actualités & <span className="text-secondary italic">Événements</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-lg"
          >
            Restez informé des dernières nouvelles, activités et projets de notre Dahira.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Rechercher un article..." 
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Tous', 'Événement', 'Éducation', 'Social', 'Infrastructure', 'Digital'].map((cat) => (
                <button 
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    cat === 'Tous' 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {item.author}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <button className="flex items-center gap-2 text-primary font-bold group/btn">
                    Lire la suite 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-20 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                &lt;
              </button>
              {[1, 2, 3].map((page) => (
                <button 
                  key={page}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    page === 1 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
