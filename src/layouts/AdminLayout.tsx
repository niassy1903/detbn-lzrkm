import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Newspaper, 
  Image as ImageIcon, 
  MessageSquare, 
  FileText, 
  Bell, 
  Settings, 
  BarChart3,
  LogOut,
  Plus,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Membres', path: '/admin/members', icon: Users },
    { name: 'Événements', path: '/admin/events', icon: Calendar },
    { name: 'Actualités', path: '/admin/news', icon: Newspaper },
    { name: 'Galerie', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Documents', path: '/admin/documents', icon: FileText },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Statistiques', path: '/admin/stats', icon: BarChart3 },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-300">
      {/* Sidebar */}
      <aside 
        className={`${isCollapsed ? 'w-24' : 'w-72'} bg-slate-950 flex flex-col border-r border-slate-800 transition-all duration-300 relative`}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 bg-emerald-500 text-white p-1 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-8 ${isCollapsed ? 'items-center' : ''}`}>
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/20 flex-shrink-0">D</div>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white tracking-tight"
              >
                AdminPanel
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Menu Principal</p>}
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : ''}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${location.pathname === item.path ? 'text-emerald-400' : 'text-slate-500'}`} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className={`bg-slate-900/50 rounded-2xl p-4 border border-slate-800 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            <div className={`flex items-center space-x-3 mb-4 ${isCollapsed ? 'flex-col space-x-0 space-y-2' : ''}`}>
              <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full border-2 border-emerald-500/30" />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Administrateur</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-xs font-bold transition-all border border-slate-700 hover:border-red-500/20 ${isCollapsed ? 'px-2' : ''}`}
            >
              <LogOut className="w-4 h-4" />
              {!isCollapsed && <span>Déconnexion</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {menuItems.find(i => i.path === location.pathname)?.name || 'Backoffice'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Gestion complète de votre Dahira</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-400">Système en ligne</span>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
