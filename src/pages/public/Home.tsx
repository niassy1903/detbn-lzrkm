import React from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Bell, ArrowRight, Heart, BookOpen, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const quotes = [
    {
      text: "Le savoir est la vie de l'âme et la lumière de l'esprit. Cherchez-le avec ardeur et humilité.",
      author: "Cheikh Al Islam El Hadji Ibrahim Niass"
    },
    {
      text: "La Tidjaniya n'est pas une simple confrérie, c'est un chemin de pureté vers la présence divine.",
      author: "Cheikh Al Islam El Hadji Ibrahim Niass"
    },
    {
      text: "Soyez des modèles de droiture, de paix et d'amour pour toute l'humanité.",
      author: "Cheikh Al Islam El Hadji Ibrahim Niass"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/40 z-10"></div>
          <img 
            src="public/assets/niass5.jpeg" 
            className="w-full h-full object-cover"
            alt="Spiritual background"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                <Star className="w-4 h-4 fill-emerald-400" />
                <span>Ansaroudine Dahira</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8">
                La Plume et le <span className="text-emerald-400 italic">Chapelet</span> <span className="border-emerald-50">pour un avenir prospère.</span>
              </h1>
              <p className="text-xl text-emerald-50/80 mb-10 leading-relaxed max-w-xl font-medium">
                Dahira des élèves talibés de Baye Niass du Lycée Zone de Recasement de Keur Massar. Unir la science et la foi pour un avenir prospère.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/login" className="btn-primary group">
                  <span>Rejoindre la Communauté</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10">
                  Notre Histoire
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                <img 
                  src="public/assets/niass5.jpeg" 
                  alt="Ansaroudine Logo"
                  className="w-[450px] h-[450px] object-contain relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                  onError={(e) => {
                    e.currentTarget.src = "public/assets/niass5.jpeg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Découvrir</span>
          <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Sagesse Section */}
      <section className="py-32 relative bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="section-subtitle">Lumières de la Fayda</span>
            <h2 className="section-title">Sagesse de Baye Niass</h2>
            <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {quotes.map((quote, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-12 rounded-[40px] shadow-xl shadow-emerald-900/5 relative group hover:shadow-emerald-900/10 transition-all border border-emerald-100/50"
              >
                <Quote className="w-12 h-12 text-emerald-100 absolute top-8 left-8 group-hover:text-emerald-200 transition-colors" />
                <div className="relative z-10">
                  <p className="text-xl font-serif italic text-slate-800 mb-8 leading-relaxed">
                    "{quote.text}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-px bg-emerald-600"></div>
                    <span className="text-sm font-bold text-emerald-700 uppercase tracking-widest">
                      {quote.author}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tidjanisme Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
              <img 
                src="public/assets/niass3.jpeg" 
                alt="Tidjanisme"
                className="rounded-[60px] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-[32px] z-20 max-w-xs">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900">La Voie de la Pureté</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Le Tidjanisme est une voie spirituelle basée sur l'amour du Prophète (PSL) et le souvenir constant d'Allah.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-subtitle">Notre Identité</span>
              <h2 className="section-title">Le Tidjanisme & la Fayda Tidjaniya</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Notre Dahira s'inscrit dans la lignée de la Fayda Tidjaniya, un mouvement de renouveau spirituel initié par Cheikh Ibrahima Niass. Nous prônons l'excellence académique alliée à une profonde spiritualité.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Éducation Spirituelle', desc: 'Cours de Tarbiya et de connaissance de soi.', icon: BookOpen },
                  { title: 'Fraternité', desc: 'Unir les cœurs dans l\'amour de Dieu.', icon: Users },
                  { title: 'Excellence', desc: 'Réussir ses études pour servir la communauté.', icon: Star },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-emerald-950 rounded-[80px] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 max-w-3xl mx-auto leading-tight">
                Prêt à rejoindre l'aventure <span className="text-emerald-400">spirituelle</span> ?
              </h2>
              <p className="text-emerald-100/70 text-xl mb-12 max-w-2xl mx-auto">
                Devenez membre de l'Ansaroudine et participez activement à la vie de notre Dahira.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/login" className="btn-primary bg-white text-emerald-950 hover:bg-emerald-50 shadow-none">
                  S'inscrire Maintenant
                </Link>
                <Link to="/contact" className="btn-secondary bg-transparent border-white/20 text-white hover:bg-white/10">
                  Nous Contacter
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
