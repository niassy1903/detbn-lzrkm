import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Bell, MessageSquare, ArrowRight } from 'lucide-react';

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4"
          >
            Tableau de bord
          </motion.div>
          <h1 className="text-6xl font-black text-neutral-900 tracking-tighter leading-none">Bonjour, <span className="text-gradient">{user?.name}</span> 👋</h1>
          <p className="text-2xl text-neutral-500 mt-4 font-medium">Voici ce qui se passe dans votre Dahira aujourd'hui.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group">
            Participer à un événement
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {[
          { icon: Calendar, label: 'Prochain événement', value: '10 Avril 2026', color: 'bg-primary/10 text-primary', trend: '+2 jours' },
          { icon: Bell, label: 'Notifications non lues', value: '2', color: 'bg-secondary/10 text-amber-600', trend: 'Nouveau' },
          { icon: MessageSquare, label: 'Messages récents', value: '5', color: 'bg-blue-50 text-blue-600', trend: '+1 aujourd\'hui' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-10 rounded-[3.5rem] border-white/60 shadow-2xl shadow-primary/5 card-hover group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors" />
            <div className={`w-20 h-20 ${stat.color} rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform relative z-10 shadow-xl`}>
              <stat.icon size={36} />
            </div>
            <div className="flex items-center justify-between relative z-10 mb-4">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">{stat.label}</p>
              <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-full uppercase tracking-widest">{stat.trend}</span>
            </div>
            <p className="text-5xl font-black text-neutral-900 tracking-tight relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="bg-white p-12 rounded-[3.5rem] border border-neutral-100 shadow-sm card-hover">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Événements <span className="text-gradient">à venir</span></h2>
            <button className="p-3 bg-neutral-50 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="space-y-8">
            {[
              { title: "Grande Réunion Mensuelle", date: "10 Avril, 10:00", type: "Réunion", location: "Siège Social" },
              { title: "Conférence Religieuse", date: "15 Avril, 15:00", type: "Conférence", location: "Grande Mosquée" }
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all cursor-pointer group">
                <div className="flex gap-8 items-center">
                  <div className="w-20 h-20 bg-white rounded-3xl flex flex-col items-center justify-center border border-neutral-100 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="text-xs font-black uppercase tracking-tighter leading-none">{event.date.split(' ')[1]}</span>
                    <span className="text-2xl font-black leading-none mt-1">{event.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{event.type}</p>
                    <p className="font-black text-neutral-900 text-xl leading-tight">{event.title}</p>
                    <p className="text-sm text-neutral-400 font-medium mt-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {event.location}
                    </p>
                  </div>
                </div>
                <button className="w-14 h-14 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:rotate-[-45deg] transition-all shadow-sm">
                  <ArrowRight size={24} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-12 rounded-[3.5rem] border border-neutral-100 shadow-sm card-hover">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Dernières <span className="text-gradient">Annonces</span></h2>
            <button className="p-3 bg-neutral-50 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="space-y-10">
            {[
              { title: "Mise à jour de la plateforme", date: "Il y a 2 jours", desc: "La nouvelle version de Dahira Manager est en ligne avec de nouvelles fonctionnalités.", category: "Système" },
              { title: "Cotisations annuelles", date: "Il y a 1 semaine", desc: "Le bureau rappelle que les cotisations sont ouvertes pour l'année 2026.", category: "Bureau" }
            ].map((news, i) => (
              <div key={i} className="relative pl-10 border-l-4 border-neutral-100 hover:border-primary transition-all group">
                <div className="absolute top-0 left-[-8px] w-3.5 h-3.5 bg-primary rounded-full border-4 border-white shadow-sm group-hover:scale-125 transition-transform" />
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">{news.category}</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{news.date}</span>
                </div>
                <p className="font-black text-neutral-900 text-xl leading-tight mb-3 group-hover:text-primary transition-colors">{news.title}</p>
                <p className="text-base text-neutral-500 leading-relaxed font-medium">{news.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
