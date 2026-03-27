import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Shield, 
  Settings,
  Calendar,
  Save,
  Loader2,
  Heart,
  Star,
  CheckCircle2,
  Lock,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useData } from '../../context/DataContext';
import ImageUpload from '../../components/ImageUpload';

const MemberProfile = () => {
  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();
  const { updateMember } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'INFO' | 'SECURITY' | 'PREFERENCES'>('INFO');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+221 77 123 45 67',
    city: user?.city || 'Dakar',
    bio: user?.bio || 'Fidèle membre du Dahira depuis 2024.',
    avatar: user?.avatar || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+221 77 123 45 67',
        city: user.city || 'Dakar',
        bio: user.bio || 'Fidèle membre du Dahira depuis 2024.',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    try {
      await updateMember(user.id, formData);
      addNotification({
        title: 'Profil mis à jour',
        message: 'Vos informations ont été enregistrées avec succès.',
        type: 'system'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Profile Header Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[48px] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
        <div className="relative bg-white rounded-[48px] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="px-12 pb-12 -mt-16 flex flex-col md:flex-row items-end gap-8 relative z-10">
            <div className="relative group/avatar">
              <div className="absolute inset-0 bg-emerald-500 rounded-[40px] blur-2xl opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
              <img 
                src={formData.avatar || "https://picsum.photos/seed/avatar/200/200"} 
                alt={formData.name} 
                className="w-40 h-40 rounded-[40px] border-8 border-white shadow-2xl object-cover relative z-10"
              />
              <button className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20 border-2 border-white">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 mb-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">{formData.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    {user?.role === 'ADMIN' ? 'Administrateur' : 'Membre Actif'}
                  </span>
                  <div className="flex items-center text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-black ml-1 uppercase tracking-widest">Fayda</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 font-medium mt-2 flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span>Membre depuis le {new Date(user?.joinedAt || Date.now()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <button 
                onClick={logout}
                className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm group"
                title="Déconnexion"
              >
                <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm space-y-2">
            {[
              { id: 'INFO', label: 'Informations Personnelles', icon: User },
              { id: 'SECURITY', label: 'Sécurité & Accès', icon: Shield },
              { id: 'PREFERENCES', label: 'Préférences', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all group ${
                  activeTab === tab.id 
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/20' 
                    : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-50 text-gray-400 group-hover:bg-white'
                  }`}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <span className="font-black text-sm uppercase tracking-widest">{tab.label}</span>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeTab === tab.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <Heart className="w-12 h-12 mb-8 text-emerald-200 opacity-50" />
            <h3 className="text-2xl font-black mb-4 tracking-tight">Engagement Spirituel</h3>
            <p className="text-emerald-50/70 font-medium leading-relaxed mb-8">
              "Le service envers la communauté est le plus haut degré de la foi."
            </p>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span className="text-xs font-black uppercase tracking-widest">Membre Vérifié</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === 'INFO' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Informations Personnelles</h3>
                    <p className="text-gray-500 font-medium mt-1">Gérez vos coordonnées et votre présentation.</p>
                  </div>
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <User className="w-7 h-7" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-emerald-600 uppercase tracking-widest ml-4">Prénom & Nom</label>
                      <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 outline-none transition-all font-bold text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-emerald-600 uppercase tracking-widest ml-4">Adresse Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 outline-none transition-all font-bold text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-emerald-600 uppercase tracking-widest ml-4">Téléphone</label>
                      <div className="relative group">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 outline-none transition-all font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-emerald-600 uppercase tracking-widest ml-4">Ville</label>
                      <div className="relative group">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 outline-none transition-all font-bold text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-emerald-600 uppercase tracking-widest ml-4">Bio / Présentation</label>
                    <textarea 
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-[32px] focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 outline-none transition-all font-bold text-gray-900 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-8 flex items-center justify-end space-x-4">
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-emerald-600 text-white px-12 py-5 rounded-3xl font-black text-lg hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/20 flex items-center space-x-3 disabled:opacity-70 active:scale-[0.98]"
                    >
                      {isSaving ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <Save className="w-6 h-6" />
                      )}
                      <span>Enregistrer les modifications</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'SECURITY' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Sécurité & Accès</h3>
                    <p className="text-gray-500 font-medium mt-1">Protégez votre compte et gérez vos accès.</p>
                  </div>
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                    <Lock className="w-7 h-7" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-emerald-200 transition-all">
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900">Mot de passe</h4>
                        <p className="text-sm text-gray-500 font-medium">Dernière modification il y a 3 mois</p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest border border-gray-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
                      Modifier
                    </button>
                  </div>

                  <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-emerald-200 transition-all">
                    <div className="flex items-center space-x-6">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900">Double Authentification</h4>
                        <p className="text-sm text-gray-500 font-medium">Ajoutez une couche de sécurité supplémentaire</p>
                      </div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
