import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, Shield, Bell, Globe, Database, Mail, Phone, MapPin, 
  Save, ChevronRight, CheckCircle2, XCircle, AlertCircle, Trash2, 
  Key, Users, Lock, Eye, EyeOff, RefreshCw, Download, Cloud,
  Image as ImageIcon
} from 'lucide-react';
import { api } from '../../services/api';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    name: 'Dahira Manager Pro',
    slogan: 'Foi, Fraternité & Solidarité',
    email: 'contact@dahira.com',
    phone: '+221 33 800 00 00',
    address: 'Dakar, Sénégal',
    logo: '',
    banner: '',
    twoFactor: true,
    strictPassword: true,
    accessLogs: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      if (data && !data.error) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.updateSettings(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings, desc: 'Identité & Coordonnées' },
    { id: 'security', label: 'Sécurité', icon: Shield, desc: 'Accès & Authentification' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alertes & Emails' },
    { id: 'database', label: 'Système', icon: Database, desc: 'Données & Sauvegardes' },
  ];

  if (loading) {
    return <div className="h-full flex items-center justify-center text-neutral-400 font-bold">Chargement des paramètres...</div>;
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-primary/5"
          >
            Configuration Système
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Paramètres <span className="text-gradient">Globaux</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Personnalisez l'expérience de votre Dahira et gérez les accès critiques.
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
          {isSaving ? 'Enregistrement...' : 'Sauvegarder'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass p-4 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-6 p-6 rounded-[2rem] transition-all group ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-2xl shadow-primary/20 scale-[1.02]' 
                    : 'hover:bg-neutral-50 text-neutral-500'
                }`}
              >
                <div className={`p-4 rounded-2xl transition-colors ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-400 group-hover:bg-primary/10 group-hover:text-primary'
                }`}>
                  <tab.icon size={24} />
                </div>
                <div className="text-left">
                  <span className="block font-black text-lg tracking-tight leading-none mb-1">{tab.label}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    activeTab === tab.id ? 'text-white/60' : 'text-neutral-400'
                  }`}>{tab.desc}</span>
                </div>
                <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${activeTab === tab.id ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          {/* System Health Widget */}
          <div className="bg-neutral-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Cloud className="text-primary w-6 h-6" />
                  <h3 className="font-black text-xl tracking-tight">État Cloud</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Opérationnel</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Version</span>
                  <span className="font-black text-lg">v2.4.0-pro</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Uptime</span>
                  <span className="font-black text-lg">99.99%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Latence</span>
                  <span className="font-black text-lg text-primary">24ms</span>
                </div>
              </div>

              <button className="w-full mt-10 py-5 rounded-[1.5rem] bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white">
                Diagnostic Complet
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-8">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-16 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 min-h-[600px]"
          >
            {activeTab === 'general' && (
              <div className="space-y-12">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary">
                    <Settings size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-neutral-900 tracking-tighter">Général</h3>
                    <p className="text-neutral-500 font-medium text-lg">Identité visuelle et informations de contact.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Nom du Dahira</label>
                    <input 
                      type="text" 
                      name="name"
                      value={settings.name}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Slogan / Devise</label>
                    <input 
                      type="text" 
                      name="slogan"
                      value={settings.slogan}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Email Principal</label>
                    <input 
                      type="email" 
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Téléphone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                      className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Adresse du Siège</label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 w-6 h-6" />
                    <input 
                      type="text" 
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                      className="w-full pl-16 pr-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-10 border-t border-neutral-100">
                  <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Identité Visuelle</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Logo du Dahira</label>
                      <div className="relative group">
                        <div className="w-40 h-40 rounded-[2.5rem] border-4 border-dashed border-neutral-100 bg-neutral-50/50 flex flex-col items-center justify-center text-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-all cursor-pointer overflow-hidden">
                          {settings.logo ? (
                            <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-neutral-300 group-hover:text-primary shadow-xl group-hover:scale-110 transition-all mb-2">
                                <ImageIcon size={24} />
                              </div>
                              <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest px-4">Uploader Logo</span>
                            </>
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Bannière de couverture</label>
                      <div className="relative group h-40">
                        <div className="w-full h-full rounded-[2.5rem] border-4 border-dashed border-neutral-100 bg-neutral-50/50 flex flex-col items-center justify-center text-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-all cursor-pointer overflow-hidden">
                          {settings.banner ? (
                            <img src={settings.banner} alt="Banner" className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-neutral-300 group-hover:text-primary shadow-xl group-hover:scale-110 transition-all mb-2">
                                <ImageIcon size={24} />
                              </div>
                              <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest px-4">Uploader Bannière</span>
                            </>
                          )}
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-12">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary">
                    <Shield size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-neutral-900 tracking-tighter">Sécurité</h3>
                    <p className="text-neutral-500 font-medium text-lg">Gérez les accès et les clés d'API.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { key: 'twoFactor', title: 'Authentification à deux facteurs', desc: 'Ajoutez une couche de sécurité via SMS ou App.' },
                    { key: 'strictPassword', title: 'Politique de mot de passe stricte', desc: 'Exiger 12+ caractères et symboles.' },
                    { key: 'accessLogs', title: 'Journalisation des accès', desc: 'Suivre toutes les connexions administratives.' },
                  ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all">
                      <div>
                        <h4 className="font-black text-xl text-neutral-900 tracking-tight mb-1">{item.title}</h4>
                        <p className="text-neutral-500 font-medium">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                        className={`w-16 h-8 rounded-full transition-all relative ${settings[item.key as keyof typeof settings] ? 'bg-primary' : 'bg-neutral-200'}`}
                      >
                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all ${settings[item.key as keyof typeof settings] ? 'left-9' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-12 border-t border-neutral-100">
                  <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-6 ml-4">Clés d'API & Intégrations</h4>
                  <div className="p-8 rounded-[2rem] bg-neutral-900 text-white flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-white/10 rounded-2xl text-secondary">
                        <Key size={24} />
                      </div>
                      <div>
                        <code className="text-lg font-mono text-white/60 tracking-tighter">sk_live_************************</code>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">Dernière utilisation: il y a 2h</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white">
                        <Eye size={20} />
                      </button>
                      <button className="px-6 py-4 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                        Régénérer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="space-y-12">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary">
                    <Database size={40} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-neutral-900 tracking-tighter">Système</h3>
                    <p className="text-neutral-500 font-medium text-lg">Maintenance et sauvegardes des données.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-10 rounded-[3rem] bg-neutral-50 border border-neutral-100 group hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      <Download size={32} />
                    </div>
                    <h4 className="font-black text-2xl text-neutral-900 tracking-tight mb-2">Export Complet</h4>
                    <p className="text-neutral-500 font-medium mb-8">Téléchargez l'intégralité de vos données au format JSON ou SQL.</p>
                    <button className="w-full py-5 rounded-[1.5rem] bg-white border border-neutral-200 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white hover:border-primary transition-all">
                      Démarrer l'export
                    </button>
                  </div>

                  <div className="p-10 rounded-[3rem] bg-red-50/30 border border-red-100 group hover:bg-white hover:shadow-2xl hover:shadow-red-500/5 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      <Trash2 size={32} />
                    </div>
                    <h4 className="font-black text-2xl text-red-900 tracking-tight mb-2">Zone Critique</h4>
                    <p className="text-neutral-500 font-medium mb-8">Réinitialisation totale des données. Cette action est irréversible.</p>
                    <button className="w-full py-5 rounded-[1.5rem] bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all">
                      Réinitialiser tout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
