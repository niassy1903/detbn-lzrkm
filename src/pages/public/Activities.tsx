import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Users, Heart, Music, GraduationCap, Star, Calendar, ArrowRight, Sparkles } from 'lucide-react';

const Activities = () => {
  const activities = [
    {
      title: 'Hadratoul Juma',
      desc: 'Le grand rassemblement du vendredi soir. Un moment d\'intense ferveur spirituelle, de zikr et de louanges au Prophète (PSL).',
      icon: Music,
      tag: 'Spiritualité',
      image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Wazifa Quotidienne',
      desc: 'Séances de zikr quotidiennes après le Fajr et l\'Asr, piliers de la pratique Tidjane pour la purification du cœur.',
      icon: Star,
      tag: 'Discipline',
      image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Conférences & Daara',
      desc: 'Enseignements sur la vie de Baye Niass, le Coran et les sciences islamiques adaptés au milieu scolaire.',
      icon: GraduationCap,
      tag: 'Éducation',
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Actions Sociales',
      desc: 'Soutien aux élèves en difficulté, journées de nettoyage et entraide communautaire au sein du lycée.',
      icon: Heart,
      tag: 'Solidarité',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800'
    }
  ];

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
            <span className="section-subtitle">Notre Vie Communautaire</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-none tracking-tighter">
              Activités & <span className="text-emerald-600 italic">Rayonnement</span>.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Découvrez les moments forts qui rythment la vie de notre Dahira, entre dévotion spirituelle et engagement citoyen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {activities.map((act, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <div className="relative h-[500px] rounded-[60px] overflow-hidden shadow-2xl shadow-emerald-900/10 border border-emerald-50">
                  <img 
                    src={act.image} 
                    alt={act.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                    <div className="flex items-center space-x-3 mb-6">
                      <span className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        {act.tag}
                      </span>
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <act.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                    
                    <h3 className="text-4xl font-black mb-6 leading-tight group-hover:translate-x-2 transition-transform duration-500">
                      {act.title}
                    </h3>
                    
                    <p className="text-emerald-50/70 leading-relaxed mb-8 font-medium max-w-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {act.desc}
                    </p>
                    
                    <button className="flex items-center space-x-3 text-emerald-400 font-bold uppercase tracking-widest text-xs group/btn">
                      <span>En savoir plus</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-emerald-600 rounded-[80px] p-16 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-3xl shadow-emerald-900/40">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full mb-8">
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-100">Agenda 2026</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Ne manquez aucun <span className="italic text-emerald-200">moment fort</span>.
              </h2>
              <p className="text-xl text-emerald-50/80 leading-relaxed font-medium">
                Consultez notre calendrier complet pour rester informé des prochaines conférences, séances de zikr et événements sociaux.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 shrink-0">
              <button className="bg-white text-emerald-900 px-12 py-6 rounded-3xl font-black text-lg hover:bg-emerald-50 transition-all shadow-2xl shadow-emerald-950/20 flex items-center space-x-3">
                <Calendar className="w-6 h-6" />
                <span>Voir le Calendrier</span>
              </button>
              <button className="bg-emerald-700 text-white px-12 py-6 rounded-3xl font-black text-lg hover:bg-emerald-800 transition-all border border-emerald-500/50 flex items-center space-x-3">
                <Sparkles className="w-6 h-6" />
                <span>S'inscrire</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-12">
            <Star className="w-10 h-10 fill-emerald-600" />
          </div>
          <h2 className="text-3xl font-serif italic text-slate-900 leading-relaxed mb-8">
            "L'activité la plus noble est celle qui rapproche le serviteur de son Créateur tout en étant utile à ses semblables."
          </h2>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600">Sagesse de la Fayda</span>
        </div>
      </section>
    </div>
  );
};

export default Activities;
