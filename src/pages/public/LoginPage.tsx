import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email);
      navigate('/');
    } catch (err) {
      setError('Identifiants invalides. Essayez admin@dahira.com ou membre@dahira.com');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50 relative overflow-hidden font-sans">
      {/* Background Blobs for Global Impact */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="glass rounded-[4rem] p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/10">
          <div className="text-center mb-14">
            <Link to="/" className="inline-block mb-10 group">
              <div className="w-24 h-24 bg-primary rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary/30 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <LogIn className="text-white" size={48} />
              </div>
            </Link>
            <h1 className="text-5xl font-black text-neutral-900 tracking-tighter mb-4">Bon retour !</h1>
            <p className="text-lg text-neutral-500 font-medium">Connectez-vous à votre espace <span className="text-gradient font-black">DETBN</span></p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-2">Email Professionnel</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors relative z-10" size={24} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-16 pr-8 py-6 bg-white/50 border border-neutral-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-neutral-900 font-bold text-lg relative z-10 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-2">
                <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">Mot de passe</label>
                <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Oublié ?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors relative z-10" size={24} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-6 bg-white/50 border border-neutral-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-neutral-900 font-bold text-lg relative z-10 shadow-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-6 text-2xl shadow-2xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-4 relative z-10">
                  Se connecter
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-neutral-50 text-center">
            <p className="text-sm text-neutral-500 font-medium">
              Pas encore membre ? <Link to="/contact" className="text-primary font-bold hover:underline">Demander l'adhésion</Link>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-neutral-400 text-xs font-bold uppercase tracking-[0.3em]">
          DETBN - LZR/KM
        </p>
      </motion.div>
    </div>
  );
}
