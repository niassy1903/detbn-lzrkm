import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  ArrowUp, 
  ArrowDown,
  Activity,
  PieChart as PieChartIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminStats = () => {
  const { members, events, news, gallery, documents } = useData();
  const totalMembers = members.length;
  const totalEvents = events.length;
  const totalNews = news.length;
  const totalGallery = gallery.length;
  const totalDocs = documents.length;

  const stats = [
    { label: 'Membres Totaux', value: totalMembers, icon: Users, color: 'text-emerald-400', trend: 'up' },
    { label: 'Événements Organisés', value: totalEvents, icon: Calendar, color: 'text-blue-400', trend: 'up' },
    { label: 'Documents Partagés', value: totalDocs, icon: BarChart3, color: 'text-purple-400', trend: 'up' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">Statistiques & Analyses</h2>
          <p className="text-slate-500 font-medium">Suivez l'évolution et l'engagement de votre Dahira.</p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900 p-8 rounded-[40px] border border-slate-800">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Participation Chart Simulation */}
        <div className="bg-slate-900 p-10 rounded-[48px] border border-slate-800">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-white">Participation aux Événements</h3>
            <BarChart3 className="w-6 h-6 text-slate-700" />
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {[40, 70, 45, 90, 65, 85, 55, 75, 95, 60, 80, 50].map((height, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className="bg-emerald-500/20 group-hover:bg-emerald-500 rounded-t-lg transition-all"
                ></motion.div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <span>Jan</span>
            <span>Juin</span>
            <span>Déc</span>
          </div>
        </div>

        {/* Distribution Chart Simulation */}
        <div className="bg-slate-900 p-10 rounded-[48px] border border-slate-800">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold text-white">Répartition des Membres</h3>
            <PieChartIcon className="w-6 h-6 text-slate-700" />
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48 rounded-full border-[16px] border-emerald-500/20 flex items-center justify-center">
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-emerald-500 border-t-transparent border-r-transparent rotate-45"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-white">{totalMembers}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { label: 'Hommes', value: Math.floor(totalMembers * 0.6), color: 'bg-emerald-500' },
              { label: 'Femmes', value: Math.ceil(totalMembers * 0.4), color: 'bg-emerald-500/30' },
              { label: 'Jeunes', value: Math.floor(totalMembers * 0.3), color: 'bg-blue-500' },
              { label: 'Séniors', value: Math.floor(totalMembers * 0.15), color: 'bg-amber-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs font-bold text-slate-400">{item.label} :</span>
                <span className="text-xs font-black text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
