import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Bell, 
  FileText, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const MemberDashboard = () => {
  const { user } = useAuth();
  const { events, news } = useData();

  const stats = [
    { label: 'Participation', value: '85%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Événements', value: events.length.toString(), icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Documents', value: '24', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Messages', value: '5', icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const upcomingEvents = events
    .filter(e => e.status === 'UPCOMING' || e.status === 'ONGOING')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const recentNews = news.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6 text-center md:text-left">
          <div className="relative">
            <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full border-4 border-emerald-50 shadow-lg object-cover" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Assalamou Alaykoum, {user?.name.split(' ')[0]} !</h2>
            <p className="text-gray-500 font-medium">Heureux de vous revoir dans votre espace Dahira.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 px-6 py-3 rounded-2xl">
          <Clock className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-700 font-bold">Dernière activité : Aujourd'hui</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">Prochains Événements</h3>
            <Link to="/member/events" className="text-emerald-600 font-bold text-sm hover:underline">Voir tout</Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between gap-4 group hover:border-emerald-200 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{event.title}</h4>
                    <p className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
                    </p>
                  </div>
                </div>
                <Link to="/member/events" className="p-3 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">Aucun événement à venir pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent News/Announcements */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-900">Dernières Actualités</h3>
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
            {recentNews.map((item, i) => (
              <div key={item.id} className="flex space-x-4">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${i === 0 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                <div>
                  <h5 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h5>
                  <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            ))}
            {recentNews.length === 0 && (
              <p className="text-center text-gray-500 text-sm">Aucune actualité récente.</p>
            )}
            <Link to="/actualites" className="block w-full py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm text-center hover:bg-gray-100 transition-all">
              Toutes les actualités
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
