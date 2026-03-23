import { ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User as UserIcon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export default function PublicLayout() {
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Activités', path: '/activities' },
    { name: 'Actualités', path: '/news' },
    { name: 'Galerie', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
        isScrolled ? "py-2" : "py-6"
      )}>
        <div className={cn(
          "max-w-7xl mx-auto h-20 px-8 flex items-center justify-between rounded-[2.5rem] transition-all duration-500 border border-transparent",
          isScrolled ? "glass shadow-2xl shadow-primary/10 border-white/40" : "bg-transparent"
        )}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-neutral-900 leading-none">DETBN</span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">LZR/KM</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={cn(
                  "text-sm font-bold tracking-tight transition-colors relative py-2",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-neutral-500 hover:text-neutral-900"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link 
                to={user?.role === 'admin' ? '/admin' : '/member'} 
                className="btn-primary !px-6 !py-2.5 !text-sm"
              >
                <UserIcon size={16} />
                Mon Espace
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="btn-secondary !px-6 !py-2.5 !text-sm border-neutral-200 text-neutral-900 hover:bg-neutral-100"
              >
                <LogIn size={16} />
                Connexion
              </Link>
            )}
            
            <button 
              className="lg:hidden p-2 text-neutral-500"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="font-black text-xl tracking-tighter">DETBN</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-neutral-500">
                <X size={32} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-tighter text-neutral-900 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-neutral-100">
              {isAuthenticated ? (
                <Link 
                  to={user?.role === 'admin' ? '/admin' : '/member'} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-xl"
                >
                  Mon Espace
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-xl"
                >
                  Connexion
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-neutral-900 text-white py-32 relative overflow-hidden">
        {/* Footer Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-10 group">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform">
                  <span className="text-white font-black text-2xl">D</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-3xl tracking-tighter leading-none">DETBN</span>
                  <span className="text-xs font-black text-primary uppercase tracking-[0.3em] mt-1">LZR/KM</span>
                </div>
              </div>
              <p className="text-xl text-neutral-400 max-w-md leading-relaxed font-medium">
                "La plume et le chapelet pour un avenir prospère." <br />
                <span className="text-white/60">Engagement, spiritualité et excellence académique au service de la communauté étudiante de Keur Massar.</span>
              </p>
            </div>
            <div>
              <h4 className="font-black text-xs mb-10 uppercase tracking-[0.4em] text-neutral-500">Navigation</h4>
              <ul className="space-y-5">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-neutral-400 hover:text-primary transition-all font-bold text-lg flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs mb-10 uppercase tracking-[0.4em] text-neutral-500">Contact</h4>
              <ul className="space-y-6 text-neutral-400">
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Adresse</span>
                  <span className="font-bold text-white/80">Lycée Zone de Recasement, Keur Massar</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Email</span>
                  <span className="font-bold text-white/80">contact@detbn.com</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Téléphone</span>
                  <span className="font-bold text-white/80">+221 33 800 00 00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">© 2026 DETBN - LZR/KM. Tous droits réservés.</p>
            <div className="flex gap-10">
              {['Facebook', 'Instagram', 'YouTube'].map(social => (
                <a key={social} href="#" className="text-neutral-500 hover:text-primary transition-all font-black text-xs uppercase tracking-[0.2em]">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
