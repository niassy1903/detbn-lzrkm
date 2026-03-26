import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Info, Calendar, Newspaper, Image as ImageIcon, Mail, LogIn, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PublicNavbar = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'À Propos', path: '/about', icon: Info },
    { name: 'Activités', path: '/activities', icon: Calendar },
    { name: 'Actualités', path: '/news', icon: Newspaper },
    { name: 'Galerie', path: '/gallery', icon: ImageIcon },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-emerald-100 py-3 shadow-lg shadow-emerald-900/5' 
          : isHome ? 'bg-transparent py-6' : 'bg-white py-4 border-b border-emerald-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="src/public/assets/logo.jpeg" 
                alt="Logo" 
                className="w-10 h-10 object-contain relative z-10"
                onError={(e) => {
                  e.currentTarget.src = "src/public/assets/logo.jpeg";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter leading-none ${
                isScrolled || !isHome ? 'text-slate-900' : 'text-white'
              }`}>
                ANSAROUDINE
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 ${
                isScrolled || !isHome ? 'text-emerald-600' : 'text-emerald-400'
              }`}>
                Dahira des Élèves
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all relative group ${
                  location.pathname === item.path 
                    ? (isScrolled || !isHome ? 'text-emerald-600' : 'text-emerald-400')
                    : (isScrolled || !isHome ? 'text-slate-600 hover:text-emerald-600' : 'text-white/70 hover:text-white')
                }`}
              >
                <span>{item.name}</span>
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${
                      isScrolled || !isHome ? 'bg-emerald-600' : 'bg-emerald-400'
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                to={user?.role === 'ADMIN' ? '/admin' : '/member'}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-xl ${
                  isScrolled || !isHome 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200/50' 
                    : 'bg-white text-emerald-900 hover:bg-emerald-50 shadow-emerald-900/20'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Mon Espace</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isScrolled || !isHome 
                    ? 'text-emerald-600 hover:bg-emerald-50' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                isScrolled || !isHome ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-emerald-100 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PublicNavbar;
