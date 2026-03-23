import { motion } from 'motion/react';
import { BookOpen, Users, Calendar, Heart, Music, GraduationCap } from 'lucide-react';

export default function ActivitiesPage() {
  const activities = [
    {
      icon: BookOpen,
      title: "Cours de Coran & Hadith",
      desc: "Séances hebdomadaires d'apprentissage et de mémorisation du Saint Coran et des enseignements du Prophète (PSL).",
      image: "https://picsum.photos/seed/quran/600/400"
    },
    {
      icon: GraduationCap,
      title: "Soutien Scolaire",
      desc: "Cours de renforcement dans les matières principales (Maths, Français, Philo) pour garantir la réussite au Bac.",
      image: "https://picsum.photos/seed/study/600/400"
    },
    {
      icon: Music,
      title: "Chants Religieux (Zikr)",
      desc: "Moments de ferveur spirituelle et de louanges à travers les poèmes de Cheikh Al Islam.",
      image: "https://picsum.photos/seed/zikr/600/400"
    },
    {
      icon: Users,
      title: "Conférences & Débats",
      desc: "Rencontres avec des érudits et des intellectuels pour approfondir notre compréhension du monde.",
      image: "https://picsum.photos/seed/talk/600/400"
    },
    {
      icon: Heart,
      title: "Actions Sociales",
      desc: "Visites aux malades, aide aux nécessiteux et nettoyage du lycée (Set-Setal).",
      image: "https://picsum.photos/seed/social/600/400"
    },
    {
      icon: Calendar,
      title: "Sorties Pédagogiques",
      desc: "Visites de lieux historiques et religieux pour enrichir notre culture générale.",
      image: "https://picsum.photos/seed/trip/600/400"
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Notre Engagement</span>
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 tracking-tighter mb-8 leading-none">
            Des activités qui <span className="text-primary italic">transforment</span>.
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed">
            Nous proposons un programme riche et varié pour nourrir l'esprit, le cœur et l'intellect de nos membres.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[3rem] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg">
                  <act.icon size={24} />
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">{act.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{act.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
