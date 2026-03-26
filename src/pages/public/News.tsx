import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, User, ArrowRight, BookOpen, Sparkles, Newspaper } from 'lucide-react';
import { useData } from '../../context/DataContext';

const News = () => {
  const { news } = useData();
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tous', ...new Set(news.map(item => item.category))];

  const filteredArticles = news.filter(article => {
    const matchesFilter = filter === 'Tous' || article.category === filter;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredArticle = news[0];

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
            <span className="section-subtitle">Le Fil de la Fayda</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-none tracking-tighter">
              Actualités & <span className="text-emerald-600 italic">Sagesse</span>.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Restez connectés à la vie de notre Dahira et nourrissez votre esprit avec nos derniers articles et annonces.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Featured Post */}
        {featuredArticle && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative grid lg:grid-cols-2 bg-white rounded-[60px] overflow-hidden mb-32 shadow-3xl shadow-emerald-900/5 group border border-emerald-50"
          >
            <div className="h-[400px] lg:h-[700px] overflow-hidden relative">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-700"></div>
            </div>
            <div className="p-12 md:p-24 flex flex-col justify-center relative bg-white">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Newspaper className="w-64 h-64 -rotate-12 text-emerald-900" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em]">
                    À la une
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    {featuredArticle.category}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter group-hover:text-emerald-600 transition-colors">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-xl font-medium">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-8 mb-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span>{new Date(featuredArticle.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span>{featuredArticle.author}</span>
                  </div>
                </div>
                
                <button className="btn-primary group/btn">
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200' 
                    : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un article..."
              className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all font-medium text-slate-900"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, i) => (
              <motion.article 
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[48px] overflow-hidden border border-emerald-50 shadow-xl shadow-emerald-900/5 hover:shadow-emerald-900/10 transition-all group flex flex-col"
              >
                <div className="h-72 overflow-hidden relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-lg">
                    {article.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto pt-8 border-t border-slate-50">
                    <button className="flex items-center space-x-3 text-emerald-600 font-black text-xs uppercase tracking-widest group/btn">
                      <span>Lire la suite</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-slate-50 rounded-[60px] border-2 border-dashed border-slate-200"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">Aucun article trouvé</h3>
            <p className="text-slate-500 font-medium">Désolé, nous n'avons trouvé aucun résultat pour votre recherche.</p>
            <button 
              onClick={() => {setFilter('Tous'); setSearchTerm('');}}
              className="mt-8 text-emerald-600 font-black text-sm uppercase tracking-widest hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>

      {/* Newsletter Section */}
      <section className="py-32 bg-emerald-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-12">
            <Sparkles className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Restez éclairés par la <span className="italic text-emerald-400">Lumière</span>.
          </h2>
          <p className="text-xl text-emerald-50/70 mb-12 font-medium">
            Inscrivez-vous à notre newsletter pour recevoir les dernières sagesses et actualités directement dans votre boîte mail.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              className="flex-grow px-8 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:bg-white/10 outline-none text-white transition-all font-medium"
            />
            <button className="btn-primary px-12 py-5 justify-center">
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default News;
