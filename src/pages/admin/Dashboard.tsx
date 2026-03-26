import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  MoreVertical,
  Plus,
  Search,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { members, events, news, gallery } = useData();

  const stats = [
    { label: 'Membres Totaux', value: members.length.toString(), change: '+12%', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Événements', value: events.length.toString(), change: '+2', icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Articles News', value: news.length.toString(), change: '+5%', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Photos Galerie', value: gallery.length.toString(), change: 'Nouveau', icon: ImageIcon, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  const recentMembers = [...members].sort((a, b) => b.joinedAt.localeCompare(a.joinedAt)).slice(0, 4);

  return (
    <div className="space-y-10">
      {/* Quick Actions & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher un membre, un événement..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all text-white"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all text-white">
            Exporter Data
          </button>
          <Link to="/admin/events" className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nouvel Événement</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 p-8 rounded-[32px] border border-slate-800 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-4xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Recent Members */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Derniers Membres Inscrits</h3>
            <Link to="/admin/members" className="text-emerald-500 text-sm font-bold hover:underline">Voir tout</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800">
                  <th className="px-8 py-4">Membre</th>
                  <th className="px-8 py-4">Rôle</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Statut</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentMembers.map((member, i) => (
                  <tr key={member.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            member.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-300">{member.role}</td>
                    <td className="px-8 py-5 text-sm text-slate-500">{member.joinDate}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                        member.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {member.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-slate-900 rounded-[40px] border border-slate-800 p-8">
          <h3 className="text-xl font-bold text-white mb-8">Activité Système</h3>
          <div className="space-y-8">
            {[
              { title: 'Événement créé', desc: events[0]?.title || 'N/A', time: 'Il y a 10 min', color: 'bg-emerald-500' },
              { title: 'Nouveau membre', desc: members[0]?.name + ' a rejoint', time: 'Il y a 1h', color: 'bg-blue-500' },
              { title: 'Article publié', desc: news[0]?.title || 'N/A', time: 'Il y a 3h', color: 'bg-amber-500' },
              { title: 'Galerie mise à jour', desc: gallery.length + ' photos au total', time: 'Hier', color: 'bg-purple-500' },
            ].map((activity, i) => (
              <div key={i} className="relative pl-8 pb-8 last:pb-0">
                {i !== 3 && <div className="absolute left-[7px] top-4 bottom-0 w-[2px] bg-slate-800"></div>}
                <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ${activity.color} border-4 border-slate-950`}></div>
                <div>
                  <h4 className="text-sm font-bold text-white">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{activity.desc}</p>
                  <p className="text-[10px] text-slate-600 font-bold uppercase mt-2 tracking-wider">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-sm font-bold transition-all">
            Voir tout l'historique
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
