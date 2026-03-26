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
        className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-12 bg-emerald-600 text-white p-1 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">D</div>
            {!isCollapsed && <span className="text-lg font-bold text-gray-900">Espace Membre</span>}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : ''}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 flex-shrink-0 ${location.pathname === item.path ? 'text-emerald-600' : 'text-gray-400'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
              {!isCollapsed && (
                item.badge ? (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {item.badge}
                  </span>
                ) : (
                  location.pathname === item.path && <ChevronRight className="w-4 h-4" />
                )
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-xl mb-4 ${isCollapsed ? 'flex-col space-x-0 space-y-2' : ''}`}>
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">Membre</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-gray-900">
            {menuItems.find(i => i.path === location.pathname)?.name || 'Espace Membre'}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              )}
            </button>
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
