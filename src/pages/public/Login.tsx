import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Email ou mot de passe incorrect.');
      setLoading(false);
    }
  };

  // Effect to navigate after successful login
  React.useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/member');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-stretch bg-white overflow-hidden">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-900 items-center justify-center p-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Login background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-900/80 to-teal-900/50"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white font-black text-4xl mb-10 shadow-2xl shadow-emerald-500/20">D</div>
            <h2 className="text-5xl font-black text-white mb-8 leading-tight">L'excellence au service de votre <span className="text-emerald-400">Dahira</span>.</h2>
            <div className="space-y-6">
              {[
                'Gestion centralisée des membres',
                'Suivi des événements en temps réel',
                'Communication fluide et sécurisée'
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-4 text-emerald-50/80">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <span className="text-lg font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32 relative bg-gray-50/50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <Link to="/" className="absolute top-12 left-8 md:left-20 flex items-center space-x-2 text-gray-500 hover:text-emerald-600 font-bold transition-colors group z-10">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Retour à l'accueil</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto relative z-10"
        >
          <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[48px] border border-white shadow-2xl shadow-emerald-900/5">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Connexion</h1>
              <p className="text-gray-500 font-medium">Accédez à votre espace personnel sécurisé.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2">Adresse Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-[24px] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2">
                    <label className="text-sm font-bold text-gray-700">Mot de passe</label>
                    <button type="button" className="text-xs font-bold text-emerald-600 hover:underline">Oublié ?</button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-[24px] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium shadow-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 text-red-600 bg-red-50 p-5 rounded-2xl text-sm font-bold border border-red-100"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-5 rounded-[24px] font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center space-x-3 disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="w-6 h-6" />
                    <span>Se connecter</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-gray-500 font-medium text-sm">
                Pas encore de compte ? <Link to="/contact" className="text-emerald-600 font-black hover:underline">Contactez le bureau</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
