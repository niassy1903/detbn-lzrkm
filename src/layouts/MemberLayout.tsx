import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export default function MemberLayout() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/member' },
    { icon: Calendar, label: 'Événements', path: '/member/events' },
    { icon: MessageSquare, label: 'Messages', path: '/member/messages' },
    { icon: FileText, label: 'Documents', path: '/member/documents' },
    { icon: Bell, label: 'Notifications', path: '/member/notifications', badge: unreadCount },
    { icon: User, label: 'Profil', path: '/member/profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans">
      {/* Background Blobs for Impact */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/40 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 bg-white border-r border-neutral-200 z-50 transform transition-all duration-500 ease-in-out md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-24" : "w-72"
      )}>
        <div className={cn(
          "h-24 flex items-center border-b border-neutral-50 transition-all duration-500",
          isCollapsed ? "justify-center px-0" : "justify-between px-8"
        )}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="font-black text-xl tracking-tighter leading-none">DETBN</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">LZR/KM</span>
              </motion.div>
            )}
          </Link>
          {!isCollapsed && (
            <button className="md:hidden p-2 text-neutral-400" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          )}
        </div>

        <div className="p-4 md:p-6">
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6 px-4">Menu Membre</p>
          )}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center rounded-[1.25rem] text-sm font-bold transition-all group relative overflow-visible",
                    isActive 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900",
                    isCollapsed ? "justify-center p-4" : "justify-between px-4 py-4"
                  )}
                >
                  <div className={cn("flex items-center relative z-10", isCollapsed ? "gap-0" : "gap-4")}>
                    <item.icon size={20} className={cn(isActive ? "text-white" : "text-neutral-400 group-hover:text-primary")} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-neutral-900" />
                    </div>
                  )}
                  {!isCollapsed && item.badge ? (
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-black relative z-10",
                      isActive ? "bg-white text-primary" : "bg-primary/10 text-primary"
                    )}>
                      {item.badge}
                    </span>
                  ) : null}
                  
                  {isCollapsed && item.badge ? (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                  ) : null}

                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary -z-0"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 border-t border-neutral-50">
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full rounded-[1.25rem] text-sm font-bold text-red-500 hover:bg-red-50 transition-all",
              isCollapsed ? "justify-center p-4" : "gap-4 px-4 py-4"
            )}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-neutral-500" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <button 
              className="hidden md:flex p-2 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xl font-black text-neutral-900 tracking-tight">Espace Membre</h2>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Bienvenue sur votre portail</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group">
              <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                <Bell size={22} />
              </div>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-4 border-white">
                  {unreadCount}
                </span>
              )}
            </div>
            
            <div className="h-10 w-[1px] bg-neutral-100" />
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-neutral-900 leading-none">{user?.name}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1.5">Membre Actif</p>
              </div>
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-4 border-neutral-50 shadow-sm">
                <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-12 overflow-y-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
