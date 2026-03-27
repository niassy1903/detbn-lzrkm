import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  UserCheck, 
  MessageSquare, 
  FileText, 
  User, 
  Bell, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const MemberLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Tableau de bord', path: '/member', icon: LayoutDashboard },
    { name: 'Événements', path: '/member/events', icon: Calendar },
    { name: 'Ma Participation', path: '/member/participation', icon: UserCheck },
    { name: 'Messages', path: '/member/messages', icon: MessageSquare },
    { name: 'Documents', path: '/member/documents', icon: FileText },
    { name: 'Mon Profil', path: '/member/profile', icon: User },
    { name: 'Notifications', path: '/member/notifications', icon: Bell, badge: unreadCount },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${isCollapsed ? 'w-24' : 'w-80'} bg-white border-r border-gray-100 flex flex-col transition-all duration-500 relative z-30`}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-12 bg-emerald-600 text-white p-2 rounded-xl shadow-xl z-50 hover:scale-110 active:scale-95 transition-all border-2 border-white"
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        <div className={`p-10 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-emerald-900/20 group-hover:rotate-12 transition-transform">D</div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 tracking-tighter leading-none">ANSAROUDINE</span>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Espace Membre</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : ''}
              className={`flex items-center justify-between px-5 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all group ${
                location.pathname === item.path
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20'
                  : 'text-gray-400 hover:bg-emerald-50 hover:text-emerald-600'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <item.icon className={`w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-emerald-600'
                }`} />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              {!isCollapsed && (
                item.badge ? (
                  <span className="bg-white text-emerald-600 text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
                    {item.badge}
                  </span>
                ) : (
                  location.pathname === item.path && <ChevronRight className="w-4 h-4 opacity-50" />
                )
              )}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <div className={`flex items-center space-x-4 p-4 bg-gray-50 rounded-[28px] mb-4 border border-gray-100 ${isCollapsed ? 'flex-col space-x-0 space-y-3' : ''}`}>
            <div className="relative">
              <img src={user?.avatar || "https://picsum.photos/seed/user/100/100"} alt={user?.name} className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm object-cover" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-gray-900 truncate tracking-tight">{user?.name}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Membre Actif</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-4 px-6 py-4 text-sm font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-[24px] transition-all ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 sticky top-0 z-20">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">
              {menuItems.find(i => i.path === location.pathname)?.name || 'Espace Membre'}
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Ansaroudine Dahira</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-3 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Serveur Actif</span>
            </div>
            <Link to="/member/notifications" className="p-4 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl relative transition-all group">
              <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              {unreadCount > 0 && (
                <span className="absolute top-3 right-3 w-5 h-5 bg-red-500 border-4 border-white rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-lg">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MemberLayout;
