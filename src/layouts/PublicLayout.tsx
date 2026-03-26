import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import PublicNavbar from '../components/common/PublicNavbar';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      
      <footer className="bg-slate-950 text-white pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-8 group">
                <img 
                  src="/assets/logo.jpeg" 
                  alt="Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.jpeg";
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter leading-none text-white">
                    ANSAROUDINE
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Dahira des Élèves
                  </span>
                </div>
              </Link>
              <p className="text-slate-400 leading-relaxed mb-8 font-medium">
                Unir la science académique et la sagesse spirituelle pour former les leaders de demain dans la lumière de la Fayda Tidjaniya.
              </p>
              <div className="flex items-center space-x-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Navigation</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Accueil', path: '/' },
                  { name: 'À Propos', path: '/about' },
                  { name: 'Activités', path: '/activities' },
                  { name: 'Actualités', path: '/news' },
                  { name: 'Galerie', path: '/gallery' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-slate-400 hover:text-emerald-400 transition-colors font-medium flex items-center space-x-2 group">
                      <div className="w-1 h-1 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-slate-400 font-medium leading-relaxed">
                    Lycée Zone de Recasement,<br />Keur Massar, Dakar, Sénégal
                  </span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-slate-400 font-medium">+221 77 397 96 28</span>
                </li>
                <li className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-slate-400 font-medium">contact@ansaroudine.sn</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xl font-bold mb-8 text-white">Newsletter</h4>
              <p className="text-slate-400 mb-6 font-medium">Recevez les dernières sagesses et actualités de notre Dahira.</p>
              <form className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Votre adresse email"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                />
                <button className="w-full btn-primary justify-center">
                  S'abonner
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-bold uppercase tracking-widest">
            <div>© 2026 Ansaroudine Dahira. Tous droits réservés.</div>
            <div className="flex items-center space-x-2">
              <span>Propulsé par la Fayda</span>
              <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
