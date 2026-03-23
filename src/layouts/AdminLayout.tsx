import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  Menu,
  X,
  Search,
  CreditCard
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';
import NotificationPanel from '../components/ui/NotificationPanel';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Membres', path: '/admin/members' },
    { icon: Calendar, label: 'Événements', path: '/admin/events' },
    { icon: Newspaper, label: 'Actualités', path: '/admin/news' },
    { icon: ImageIcon, label: 'Galerie', path: '/admin/gallery' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: FileText, label: 'Documents', path: '/admin/documents' },
    { icon: CreditCard, label: 'Finances', path: '/admin/finance' },
    { icon: BarChart3, label: 'Statistiques', path: '/admin/stats' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans">
      {/* Background Blobs for Impact */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-primary/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 bg-[#151619] text-white z-50 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed ? "w-20" : "w-72"
      )}>
        <div className={cn(
          "h-20 flex items-center border-b border-white/5 transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "justify-between px-8"
        )}>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-black font-bold text-lg">D</span>
            </div>
            {!isCollapsed && <span className="font-bold text-xl tracking-tight">Admin Pro</span>}
          </Link>
          {!isCollapsed && (
            <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} className="text-neutral-400" />
            </button>
          )}
        </div>

        <div className="p-4 md:p-6">
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4 px-4">Menu Principal</p>
          )}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center rounded-xl text-sm font-medium transition-all group relative overflow-visible",
                    isActive 
                      ? "bg-white text-black shadow-xl shadow-white/5" 
                      : "text-neutral-400 hover:bg-white/5 hover:text-white",
                    isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
                  )}
                >
                  <item.icon size={18} className={cn(isActive ? "text-black" : "text-neutral-500 group-hover:text-white")} />
                  {!isCollapsed && <span>{item.label}</span>}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-white text-black text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-2xl">
                      {item.label}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-white" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 border-t border-white/5 bg-[#151619]">
          <button 
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all",
              isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
            )}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-grow max-w-md">
            <button className="md:hidden p-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} className="text-neutral-500" />
            </button>
            <button 
              className="hidden md:flex p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full hidden lg:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(true)}
                className="p-3 rounded-xl hover:bg-neutral-50 text-neutral-400 hover:text-primary transition-all relative group"
              >
                <Bell size={24} className="group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-4 border-white shadow-lg">3</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-neutral-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-neutral-900 leading-none">{user?.name}</p>
                <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mt-1">Administrateur</p>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto relative z-10">
          <Outlet />
        </main>
      </div>

      <NotificationPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );
}
