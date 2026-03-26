import React from 'react';
import { motion } from 'motion/react';
import { Target, Heart, History, Users, Award, ShieldCheck, Star, BookOpen, Globe, Quote } from 'lucide-react';

const About = () => {
  const values = [
    { icon: BookOpen, title: 'Éducation', desc: 'Former des esprits brillants capables d\'allier savoir moderne et sagesse spirituelle.' },
    { icon: Heart, title: 'Amour & Paix', desc: 'Cultiver l\'amour du Prophète (PSL) et de son prochain selon les enseignements de la Fayda.' },
    { icon: Globe, title: 'Engagement', desc: 'Servir la communauté et porter haut les valeurs de l\'Islam dans notre environnement scolaire.' },
  ];

  const milestones = [
    { year: '2015', title: 'Les Prémices', desc: 'Un petit groupe d\'élèves passionnés décide de se réunir pour partager la Fayda au lycée.' },
    { year: '2018', title: 'Reconnaissance', desc: 'L\'Ansaroudine devient une référence au sein du Lycée Zone de Recasement.' },
    { year: '2022', title: 'Expansion', desc: 'Multiplication des activités sociales et spirituelles touchant des centaines d\'élèves.' },
    { year: '2026', title: 'Digitalisation', desc: 'Lancement de notre portail officiel pour une gestion moderne et connectée.' },
  ];

  return (
    <div className="bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="relative py-48 overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/90 to-emerald-950 z-10"></div>
          <img 
            src="public/assets/niass6.jpeg" 
            className="w-full h-full object-cover"
            alt="About background"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-emerald-400 font-bold uppercase tracking-[0.4em] mb-6 block">Notre Identité</span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none">
              Porteurs de <br /> <span className="text-emerald-400 italic">Lumière</span>.
            </h1>
            <p className="text-xl text-emerald-50/70 max-w-2xl mx-auto leading-relaxed font-medium">
              L'Ansaroudine est bien plus qu'un Dahira. C'est une famille d'élèves unis par la foi en Allah et l'amour de Cheikh Al Islam El Hadji Ibrahim Niass.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Baye Niass Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-subtitle">Le Guide Spirituel</span>
              <h2 className="section-title">Cheikh Al Islam El Hadji Ibrahim Niass</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Né en 1900 à Taïba Niassène, Baye Niass a consacré sa vie à l'enseignement de l'Islam et de la Tidjaniya. Sa "Fayda" (l'Inondation spirituelle) a touché des millions de cœurs à travers le monde, prônant la connaissance directe d'Allah (Ma'rifa) et l'excellence humaine.
              </p>
              <div className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-100 italic text-emerald-900 font-serif text-xl relative">
                <Star className="absolute -top-4 -left-4 w-12 h-12 text-emerald-200 fill-emerald-200" />
                "Mon seul but est de faire connaître Allah à Ses créatures et de les unir dans Son amour."
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-[60px] rotate-3 opacity-10"></div>
              <img 
                src="public/assets/niass6.jpeg" 
                alt="Baye Niass Teachings"
                className="rounded-[60px] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="section-subtitle">Nos Piliers</span>
            <h2 className="section-title">Valeurs Fondamentales</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[48px] shadow-xl shadow-emerald-900/5 group hover:shadow-emerald-900/10 transition-all duration-500 border border-emerald-100/50"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  <value.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <span className="section-subtitle">Le Chemin Parcouru</span>
            <h2 className="section-title">Notre Histoire</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-100 hidden md:block"></div>
            <div className="space-y-24">
              {milestones.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className={`bg-white p-10 rounded-[48px] shadow-2xl shadow-emerald-900/5 border border-emerald-50 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      <span className="text-5xl font-black text-emerald-600/20 mb-4 block font-serif">{m.year}</span>
                      <h4 className="text-2xl font-bold text-slate-900 mb-4">{m.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-medium">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-emerald-600 rounded-full border-8 border-white shadow-2xl z-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl relative">
                    <div className="absolute inset-0 bg-emerald-600 rounded-full animate-ping opacity-20"></div>
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-emerald-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Quote className="w-20 h-20 text-emerald-500/20 mx-auto mb-12" />
          <h2 className="text-3xl md:text-5xl font-serif italic leading-relaxed mb-12">
            "Le savoir sans l'action est un fardeau, et l'action sans la sincérité est une illusion."
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <span className="text-xl font-bold uppercase tracking-widest text-emerald-400">Cheikh Ibrahima Niass</span>
        </div>
      </section>
    </div>
  );
};

export default About;
