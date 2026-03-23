import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, BarChart3, TrendingUp, UserPlus, ArrowUpRight, Activity, Plus, Bell, Search, Download, Filter, MoreHorizontal, Settings, HelpCircle, LogOut, Clock, Shield, CheckCircle, AlertCircle, Zap, Globe, MessageSquare, PieChart as PieChartIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    totalNews: 0,
    totalTransactions: 0,
    recentActivity: [] as any[],
    chartData: [] as any[],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [members, events, news, transactions] = await Promise.all([
        api.getMembers(),
        api.getEvents(),
        api.getNews(),
        api.getTransactions(),
      ]);

      // Process chart data (members growth by month)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentYear = new Date().getFullYear();
      const chartData = months.map((month, index) => {
        const count = members.filter((m: any) => {
          const joinDate = new Date(m.joinDate);
          return joinDate.getMonth() === index && joinDate.getFullYear() === currentYear;
        }).length;
        return { name: month, members: count };
      });

      // Accumulate members for growth chart
      let accumulated = 0;
      const growthData = chartData.map(d => {
        accumulated += d.members;
        return { ...d, members: accumulated };
      });

      // Recent activity (combine latest members, events, news)
      const combinedActivity = [
        ...members.slice(-2).map((m: any) => ({ user: m.name, action: "a rejoint le Dahira", target: "", time: new Date(m.joinDate).toLocaleDateString(), avatar: m.photo || `https://picsum.photos/seed/${m._id}/100` })),
        ...events.slice(-1).map((e: any) => ({ user: "Admin", action: "a programmé l'événement", target: e.title, time: new Date(e.date).toLocaleDateString(), avatar: `https://picsum.photos/seed/${e._id}/100` })),
        ...news.slice(-1).map((n: any) => ({ user: "Admin", action: "a publié l'article", target: n.title, time: new Date(n.date).toLocaleDateString(), avatar: `https://picsum.photos/seed/${n._id}/100` })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

      setStats({
        totalMembers: members.length,
        totalEvents: events.length,
        totalNews: news.length,
        totalTransactions: transactions.length,
        recentActivity: combinedActivity,
        chartData: growthData,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center text-neutral-400 font-bold">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-primary/5"
          >
            <Activity size={12} className="animate-pulse" />
            Administration Centrale
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Dashboard <span className="text-gradient">Admin</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Pilotez l'activité de votre Dahira avec une précision chirurgicale et une élégance absolue.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => openModal('Exporter les données')}
            className="btn-secondary !px-10 !py-5 !text-lg border-neutral-200 text-neutral-900 hover:bg-white hover:shadow-2xl group"
          >
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Exporter
          </button>
          <button 
            onClick={() => openModal('Nouvel Événement')}
            className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Nouvel Événement
          </button>
        </div>
      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: 'Total Membres', value: stats.totalMembers.toLocaleString(), icon: Users, trend: '+12.5%', color: 'bg-primary', sub: 'Membres actifs' },
          { label: 'Événements', value: stats.totalEvents.toString(), icon: Calendar, trend: '+3', color: 'bg-emerald-600', sub: 'Cette année' },
          { label: 'Actualités', value: stats.totalNews.toString(), icon: Bell, trend: '+5.2%', color: 'bg-secondary', sub: 'Articles publiés' },
          { label: 'Transactions', value: stats.totalTransactions.toString(), icon: BarChart3, trend: '+8', color: 'bg-neutral-900', sub: 'Ce mois-ci' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-10 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 relative overflow-hidden group card-hover"
          >
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className={`w-20 h-20 ${stat.color} text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-neutral-200 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={36} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-50 px-4 py-2.5 rounded-full uppercase tracking-widest border border-emerald-100 shadow-sm">
                {stat.trend}
                <TrendingUp size={16} />
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] relative z-10">{stat.label}</p>
              <p className="text-6xl font-black text-neutral-900 mt-4 tracking-tight relative z-10">{stat.value}</p>
              <p className="text-xs text-neutral-400 font-bold mt-4 uppercase tracking-widest">{stat.sub}</p>
            </div>
            
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2 glass p-12 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-12 relative z-10">
            <div>
              <h2 className="text-4xl font-black text-neutral-900 tracking-tight">Croissance <span className="text-gradient">Communautaire</span></h2>
              <p className="text-neutral-500 font-medium mt-2">Évolution du nombre de membres sur l'année en cours.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-neutral-50 text-neutral-400 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                <Filter size={20} />
              </button>
              <button className="p-3 bg-neutral-50 text-neutral-400 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
          
          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#064e3b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#064e3b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    padding: '20px'
                  }}
                  itemStyle={{ fontWeight: 900, color: '#064e3b' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#064e3b" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorMembers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass p-12 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-12 relative z-10">
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Répartition <span className="text-gradient">Activités</span></h2>
            <PieChartIcon size={24} className="text-primary" />
          </div>
          
          <div className="flex-grow flex flex-col justify-center relative z-10">
            <div className="space-y-8">
              {[
                { label: 'Réunions', value: 45, color: 'bg-primary' },
                { label: 'Conférences', value: 30, color: 'bg-emerald-500' },
                { label: 'Social', value: 15, color: 'bg-secondary' },
                { label: 'Éducation', value: 10, color: 'bg-neutral-900' },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-lg font-black text-neutral-900">{item.value}%</span>
                  </div>
                  <div className="h-4 w-full bg-neutral-50 rounded-full overflow-hidden p-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full ${item.color} rounded-full shadow-lg`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-primary/5 rounded-3xl border border-primary/5 relative z-10">
            <p className="text-sm text-primary font-bold leading-relaxed">
              "L'organisation est la moitié de la réussite."
            </p>
          </div>
        </section>
      </div>

      {/* Activity and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2 glass p-12 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-neutral-900 tracking-tight">Journal d'<span className="text-gradient">Activité</span></h2>
            <button className="text-sm font-black text-primary uppercase tracking-widest hover:underline">Voir tout</button>
          </div>
          <div className="space-y-8">
            {stats.recentActivity.length === 0 ? (
              <p className="text-center py-10 text-neutral-400 font-bold">Aucune activité récente.</p>
            ) : stats.recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-8 group cursor-pointer p-6 rounded-[2.5rem] hover:bg-white transition-all border border-transparent hover:border-neutral-100 hover:shadow-xl hover:shadow-black/5">
                <div className="w-16 h-16 rounded-3xl overflow-hidden shadow-lg flex-shrink-0 border-4 border-white group-hover:scale-110 transition-transform duration-500">
                  <img src={activity.avatar} alt={activity.user} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <p className="text-xl text-neutral-900 font-medium leading-tight">
                    <span className="font-black">{activity.user}</span> {activity.action} <span className="font-black text-primary">{activity.target}</span>
                  </p>
                  <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                    <Clock size={12} />
                    {activity.time}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl border border-neutral-100 flex items-center justify-center text-neutral-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:rotate-45 transition-all shadow-sm">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-dark text-white p-12 rounded-[4rem] shadow-2xl shadow-neutral-900/40 relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-12 tracking-tight">Actions <span className="text-gold">Prioritaires</span></h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: 'Ajouter un Membre', icon: UserPlus, onClick: () => openModal('Ajouter un Membre') },
                { label: 'Publier une Actualité', icon: Bell, onClick: () => openModal('Publier une Actualité') },
                { label: 'Gérer les Finances', icon: BarChart3, onClick: () => openModal('Gérer les Finances') },
                { label: 'Paramètres Système', icon: Settings, onClick: () => openModal('Paramètres Système') },
              ].map((action, i) => (
                <button 
                  key={i}
                  onClick={action.onClick}
                  className="w-full p-6 bg-white/5 text-white border border-white/10 rounded-[2.5rem] font-black text-lg hover:bg-white/15 transition-all active:scale-95 flex items-center justify-between group/btn"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/btn:bg-secondary group-hover/btn:text-primary transition-colors">
                      <action.icon size={24} />
                    </div>
                    {action.label}
                  </div>
                  <ArrowUpRight size={20} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
            
            <div className="mt-16 p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md group-hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em] mb-8">Statut de l'Infrastructure</p>
              <div className="flex items-center gap-5 text-emerald-400 text-xl font-black">
                <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
                Système Optimal
              </div>
              <div className="mt-12 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Temps de réponse</p>
                  <p className="text-3xl font-black">24ms</p>
                </div>
                <div className="flex gap-2 items-end h-16">
                  {[40, 60, 30, 80, 50, 90, 70, 85, 45, 95, 65, 75].map((h, i) => (
                    <div key={i} className="w-2 bg-emerald-400/30 rounded-full group-hover:bg-emerald-400/60 transition-colors" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-0 group-hover:bg-primary/30 transition-all duration-1000" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-0" />
        </section>
      </div>

      {/* Modal for Actions */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      >
        <div className="space-y-8">
          <p className="text-neutral-500 text-lg">
            Formulaire de gestion pour : <span className="font-black text-neutral-900">{modalTitle}</span>. 
            Veuillez remplir les informations ci-dessous pour continuer.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Nom complet</label>
              <input type="text" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:border-primary outline-none font-bold" placeholder="Ex: Lamine Niassy" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Email</label>
              <input type="email" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:border-primary outline-none font-bold" placeholder="Ex: lamine@niassy.com" />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-2">Description / Notes</label>
              <textarea className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:border-primary outline-none font-bold h-32" placeholder="Informations complémentaires..."></textarea>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button onClick={() => setIsModalOpen(false)} className="flex-grow btn-secondary !py-5">Annuler</button>
            <button onClick={() => setIsModalOpen(false)} className="flex-grow btn-primary !py-5 shadow-2xl shadow-primary/20">Confirmer l'action</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

