import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, TrendingUp, Users, Calendar, DollarSign, PieChart as PieChartIcon, 
  ArrowUpRight, ArrowDownRight, Download, Filter, Activity, Target, Zap, 
  ChevronRight, Globe, Award
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { api } from '../../services/api';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState({
    members: 0,
    events: 0,
    news: 0,
    gallery: 0,
    documents: 0,
    transactions: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [members, events, news, gallery, documents, transactions] = await Promise.all([
        api.getMembers(),
        api.getEvents(),
        api.getNews(),
        api.getGallery(),
        api.getDocuments(),
        api.getTransactions(),
      ]);

      setStats({
        members: members.length,
        events: events.length,
        news: news.length,
        gallery: gallery.length,
        documents: documents.length,
        transactions,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate chart data from transactions
  const generateGrowthData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    
    return months.map((month, index) => {
      const monthTransactions = stats.transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === index && date.getFullYear() === currentYear;
      });

      const revenue = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        name: month,
        revenue,
        expenses,
        members: Math.floor(stats.members * (index + 1) / 12), // Mock growth for visualization
        events: Math.floor(stats.events * (index + 1) / 12),
      };
    });
  };

  const growthData = generateGrowthData();

  const categoryData = [
    { name: 'Revenus', value: stats.transactions.filter(t => t.type === 'income').length, color: '#00A859' },
    { name: 'Dépenses', value: stats.transactions.filter(t => t.type === 'expense').length, color: '#FFD700' },
    { name: 'Événements', value: stats.events, color: '#3b82f6' },
    { name: 'Articles', value: stats.news, color: '#a855f7' },
  ];

  if (loading) {
    return <div className="h-full flex items-center justify-center text-neutral-400 font-bold">Chargement des statistiques...</div>;
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-primary/5"
          >
            Analyses & Insights
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Statistiques <span className="text-gradient">Avancées</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Plongez dans les données pour comprendre l'impact de votre Dahira.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="p-5 rounded-[1.5rem] bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
            <Filter className="w-6 h-6" />
          </button>
          <button className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group">
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Exporter le rapport
          </button>
        </div>
      </header>

      {/* High-Level Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Membres Actifs', value: stats.members.toLocaleString(), trend: '+12.5%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Événements', value: stats.events.toLocaleString(), trend: '+4.2%', icon: Calendar, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Total Revenus', value: stats.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toLocaleString() + ' FCFA', trend: '+28.1%', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Articles Publiés', value: stats.news.toLocaleString(), trend: '+15.0%', icon: Target, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-10 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5 group hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 rounded-full">
                <ArrowUpRight size={12} className="text-green-500" />
                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{stat.trend}</span>
              </div>
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-2">{stat.label}</p>
            <h3 className="text-4xl font-black text-neutral-900 tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Growth Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 glass p-12 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-black text-neutral-900 tracking-tighter">Flux de Trésorerie</h3>
              <p className="text-neutral-500 font-medium">Évolution mensuelle des revenus et dépenses.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Dépenses</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A859" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A859" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
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
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    padding: '20px'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00A859" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" stroke="#FFD700" strokeWidth={4} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 glass p-12 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5"
        >
          <h3 className="text-3xl font-black text-neutral-900 tracking-tighter mb-2">Répartition</h3>
          <p className="text-neutral-500 font-medium mb-12">Activités par catégorie.</p>

          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-neutral-900 leading-none">100%</span>
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Total</span>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-bold text-neutral-600">{item.name}</span>
                </div>
                <span className="font-black text-neutral-900">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Secondary Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="glass p-10 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary">
              <Award size={24} />
            </div>
            <h4 className="font-black text-2xl text-neutral-900 tracking-tight">Top Contributeurs</h4>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-black text-neutral-900 tracking-tight leading-none mb-1">Membre #{i}04</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Dakar, Sénégal</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-300 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-secondary/10 text-secondary">
              <Globe size={24} />
            </div>
            <h4 className="font-black text-2xl text-neutral-900 tracking-tight">Répartition Géo</h4>
          </div>
          <div className="space-y-6">
            {[
              { city: 'Dakar', percent: 65 },
              { city: 'Kaolack', percent: 20 },
              { city: 'Touba', percent: 15 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-neutral-600">{item.city}</span>
                  <span className="text-neutral-900">{item.percent}%</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500">
              <Zap size={24} />
            </div>
            <h4 className="font-black text-2xl text-neutral-900 tracking-tight">Engagement</h4>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-6xl font-black text-neutral-900 tracking-tighter mb-2">92%</div>
            <p className="text-neutral-500 font-medium text-center">Taux d'engagement moyen lors des derniers événements.</p>
            <div className="mt-8 flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-2 h-8 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-neutral-100'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
