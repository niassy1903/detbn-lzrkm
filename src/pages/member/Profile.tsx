import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useData } from '../../context/DataContext';
import ImageUpload from '../../components/ImageUpload';

const MemberProfile = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { updateMember } = useData();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+221 77 123 45 67',
    city: user?.city || 'Dakar',
    bio: user?.bio || 'Fidèle membre du Dahira depuis 2024.',
    avatar: user?.avatar || ''
  });

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
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="relative h-64 rounded-[48px] overflow-hidden bg-emerald-600">
        <img 
          src="https://images.unsplash.com/photo-1518005020453-eb5853477b9b?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-30"
          alt="Profile cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-12 left-12 flex items-end space-x-8">
          <div className="relative group">
            <img 
              src={formData.avatar} 
              alt={formData.name} 
              className="w-40 h-40 rounded-[40px] border-8 border-white shadow-2xl object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-[40px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white cursor-pointer">
              <Camera className="w-8 h-8" />
            </div>
          </div>
          <div className="pb-16">
            <h2 className="text-4xl font-black text-white drop-shadow-md">{formData.name}</h2>
            <div className="flex items-center space-x-3 mt-2">
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {user?.role}
              </span>
              <span className="text-white/70 text-sm font-medium">Membre depuis Janvier 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 grid lg:grid-cols-3 gap-10">
        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Informations Rapides</h3>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: formData.email },
                { icon: Phone, label: 'Téléphone', value: formData.phone },
                { icon: MapPin, label: 'Adresse', value: formData.city + ', Sénégal' },
                { icon: Calendar, label: 'Inscrit le', value: '15 Janvier 2024' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 p-8 rounded-[40px] text-white shadow-xl shadow-emerald-100">
            <Shield className="w-10 h-10 mb-6 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Sécurité du compte</h3>
            <p className="text-emerald-50/70 text-sm mb-6 leading-relaxed">Votre compte est protégé par une authentification sécurisée.</p>
            <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all">
              Changer le mot de passe
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-gray-900">Modifier mon profil</h3>
            <Settings className="w-6 h-6 text-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Prénom & Nom</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Email Professionnel</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Téléphone</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+221 ..."
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2">Ville de résidence</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: Dakar"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">Photo de profil</label>
              <ImageUpload 
                value={formData.avatar}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">Bio / Description</label>
              <textarea 
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Parlez-nous un peu de vous..."
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none"
              ></textarea>
            </div>

            <div className="pt-6 flex items-center justify-end space-x-4">
              <button 
                type="button" 
                onClick={() => setFormData({
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '+221 77 123 45 67',
                  city: user?.city || 'Dakar',
                  bio: user?.bio || 'Fidèle membre du Dahira depuis 2024.',
                  avatar: user?.avatar || ''
                })}
                className="px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition-all"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                disabled={isSaving}
                className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Enregistrer les modifications</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
