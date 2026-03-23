import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  Bell, 
  ShieldCheck, 
  BookOpen, 
  Heart, 
  Star,
  Quote,
  MessageSquare,
  Shield,
  Play,
  ChevronDown,
  Sparkles,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const quotes = [
    {
      arabic: "الْعِلْمُ صَيْدٌ وَالْكِتَابَةُ قَيْدُهُ",
      french: "Le savoir est un gibier, et l'écriture est son lien.",
      wolof: "Xam-xam lu ñu mën a nàmp la, te mbind mooy koom-koomam.",
      author: "Cheikh Al Islam El Hadji Ibrahim Niass"
    },
    {
      arabic: "مَنْ لَمْ يَشْكُرِ الْقَلِيلَ لَمْ يَشْكُرِ الْكَثِيرَ",
      french: "Celui qui ne remercie pas pour le peu ne remerciera pas pour le beaucoup.",
      wolof: "Ku santul ci lu néew, do sant ci lu bare.",
      author: "Cheikh Al Islam El Hadji Ibrahim Niass"
    }
  ];

  const marqueeItems = [
    "La plume et le chapelet",
    "Spiritualité & Excellence",
    "Fayda Tidjania",
    "Keur Massar en Force",
    "Éducation & Engagement",
    "Dahira DETBN",
    "Baye Niass - Le Guide"
  ];

  const features = [
    {
      title: "Éducation",
      desc: "Soutien académique et orientation pour une réussite brillante.",
      icon: BookOpen,
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Spiritualité",
      desc: "Ancrage profond dans les valeurs de la Fayda Tidjania.",
      icon: Heart,
      color: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Communauté",
      desc: "Un réseau de fraternité et d'entraide à Keur Massar.",
      icon: Users,
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div ref={containerRef} className="font-sans overflow-x-hidden bg-white selection:bg-primary selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-left"
        style={{ scaleX: scaleProgress }}
      />

      {/* Hero Section - Immersive & Atmospheric */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=2000" 
            alt="Islamic Architecture" 
            className="w-full h-full object-cover scale-110 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          {/* Animated Gradients */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.5em] mb-12">
              <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
              L'Excellence au Service de la Foi
            </div>
            
            <h1 className="text-[12vw] md:text-[10vw] font-black text-white leading-[0.8] tracking-tighter mb-12 drop-shadow-2xl">
              DAHIRA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary animate-gradient-x">DETBN.</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/80 mb-16 max-w-3xl mx-auto font-medium leading-relaxed backdrop-blur-sm p-4 rounded-3xl">
              Dahira des Élèves Talibés de Baye Niass. <br />
              <span className="text-white font-black">Un avenir prospère par la foi et le savoir.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Link to="/login" className="group relative px-12 py-6 bg-primary text-white text-xl font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40">
                <span className="relative z-10 flex items-center gap-3">
                  Espace Membre
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link to="/about" className="px-12 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white text-xl font-black rounded-full hover:bg-white hover:text-neutral-900 transition-all hover:scale-105 active:scale-95">
                Notre Vision
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-white/50"
        >
          <ChevronDown size={40} />
        </motion.div>
      </section>

      {/* Marquee - Creative Brutalist */}
      <div className="bg-neutral-900 py-12 overflow-hidden border-y border-white/5 relative z-40">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              <span className="text-white/20 font-black text-6xl md:text-8xl uppercase tracking-tighter hover:text-primary transition-colors cursor-default">
                {item}
              </span>
              <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(21,128,61,0.5)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Wisdom Section - Editorial Style */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-8">
                Inspiration Quotidienne
              </div>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-neutral-900 leading-[0.85] mb-12">
                LA SAGESSE <br />
                <span className="text-gradient">ÉTERNELLE.</span>
              </h2>
              <p className="text-2xl text-neutral-500 font-medium leading-relaxed max-w-xl">
                Les enseignements de <span className="text-primary font-black">Cheikh Al Islam</span> sont une boussole pour la jeunesse en quête d'excellence et de paix.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute -inset-10 bg-primary/5 rounded-[5rem] blur-3xl -z-10" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-12 md:p-20 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 relative group"
              >
                <Quote className="absolute top-12 right-12 w-20 h-20 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <div className="space-y-12">
                  <p className="arabic-text text-5xl md:text-7xl leading-[1.4] text-neutral-900 font-arabic text-right">
                    {quotes[0].arabic}
                  </p>
                  <div className="space-y-6">
                    <p className="text-3xl md:text-4xl font-serif italic text-neutral-800 leading-tight">
                      "{quotes[0].french}"
                    </p>
                    <div className="h-1 w-24 bg-primary rounded-full" />
                    <p className="text-lg font-black text-neutral-400 uppercase tracking-[0.3em]">
                      {quotes[0].author}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Split Layout / Immersive */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl card-hover"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-lg text-white/70 font-medium leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    {feature.desc}
                  </p>
                  <div className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest group-hover:gap-6 transition-all">
                    Découvrir <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Brutalist / High Energy */}
      <section className="py-40 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
            {[
              { label: "Membres Actifs", value: "500+", icon: Users },
              { label: "Événements/an", value: "24", icon: Calendar },
              { label: "Projets Réalisés", value: "15", icon: Zap },
              { label: "Ans d'Excellence", value: "10", icon: Award }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-white group-hover:text-primary transition-all duration-500">
                  <stat.icon size={32} />
                </div>
                <p className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter group-hover:scale-110 transition-transform">{stat.value}</p>
                <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.5em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview - Masonry / Artistic */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6">
                Galerie & Médias
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-neutral-900 leading-[0.85]">
                MOMENTS <br />
                <span className="text-gradient">PRÉCIEUX.</span>
              </h2>
            </div>
            <Link to="/gallery" className="btn-secondary !px-10 !py-5 group">
              Voir toute la galerie <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[800px]">
            <motion.div 
              whileHover={{ flex: 2 }}
              className="md:col-span-2 relative rounded-[3rem] overflow-hidden group cursor-pointer transition-all duration-700"
            >
              <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2">Cérémonie</p>
                <h4 className="text-3xl font-black">Gamou Annuel 2024</h4>
              </div>
            </motion.div>
            <div className="grid grid-rows-2 gap-6">
              <motion.div className="relative rounded-[3rem] overflow-hidden group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
              <motion.div className="relative rounded-[3rem] overflow-hidden group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20" />
              </motion.div>
            </div>
            <motion.div className="relative rounded-[3rem] overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Cinematic / High Impact */}
      <section className="py-40 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518005020650-555554218bf2?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-transparent to-neutral-900" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-16 shadow-[0_0_50px_rgba(21,128,61,0.5)]"
            >
              <Star className="w-12 h-12 text-white fill-white animate-pulse" />
            </motion.div>
            
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white mb-12 leading-[0.8]">
              ÉCRIVONS <br />
              <span className="text-gradient">L'HISTOIRE.</span>
            </h2>
            
            <p className="text-2xl md:text-4xl text-white/60 mb-20 max-w-3xl mx-auto font-medium leading-relaxed">
              Rejoignez une communauté qui allie <span className="text-white font-black">foi, excellence et impact social.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Link to="/login" className="px-20 py-8 bg-white text-neutral-900 text-2xl font-black rounded-full hover:bg-primary hover:text-white transition-all hover:scale-110 shadow-2xl">
                S'inscrire maintenant
              </Link>
              <Link to="/contact" className="px-20 py-8 border-2 border-white/20 text-white text-2xl font-black rounded-full hover:bg-white/10 transition-all hover:scale-110 uppercase tracking-widest">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Elegant */}
      <footer className="py-20 bg-neutral-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl">D</div>
                <span className="text-2xl font-black text-white tracking-tighter">DAHIRA DETBN</span>
              </div>
              <p className="text-xl text-white/40 font-medium leading-relaxed max-w-md">
                Une organisation dédiée à l'épanouissement spirituel et académique des jeunes talibés de Keur Massar.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-10">Navigation</h4>
              <ul className="space-y-6">
                {['Accueil', 'À Propos', 'Activités', 'Galerie', 'Contact'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-lg text-white/60 hover:text-primary transition-colors font-bold">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-10">Légal</h4>
              <ul className="space-y-6">
                {['Confidentialité', 'Conditions', 'Mentions Légales'].map(item => (
                  <li key={item}>
                    <Link to="#" className="text-lg text-white/60 hover:text-primary transition-colors font-bold">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/20 font-black text-xs uppercase tracking-widest">
              © 2024 DAHIRA DETBN. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex gap-8">
              {['FB', 'IG', 'TW', 'YT'].map(social => (
                <Link key={social} to="#" className="text-white/20 hover:text-primary font-black text-xs tracking-widest transition-colors">{social}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
