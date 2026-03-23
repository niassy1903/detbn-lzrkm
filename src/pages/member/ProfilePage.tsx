import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, CreditCard, LogOut, Save, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const tabs = [
    { id: 'personal', label: 'Informations Personnelles', icon: User },
    { id: 'security', label: 'Sécurité & Accès', icon: Shield },
    { id: 'notifications', label: 'Préférences Notifications', icon: Bell },
    { id: 'payments', label: 'Cotisations & Paiements', icon: CreditCard },
  ];

  return (
    <div className="space-y-10 relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tighter text-neutral-900 mb-2">Mon Profil</h1>
          <p className="text-neutral-500 font-medium">Gérez vos informations personnelles et vos préférences de compte.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary !px-10 !py-4 shadow-2xl shadow-primary/30"
        >
          {isSaving ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer les modifications
            </>
          )}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-4 space-y-8">
          {/* Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[2.5rem] border-white/40 shadow-2xl shadow-neutral-900/5 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl animate-pulse" />
              <img 
                src="https://picsum.photos/seed/profile/400/400" 
                alt="Profile" 
                className="relative w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-2xl"
              />
              <button className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl hover:bg-primary/90 transition-all hover:scale-110">
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            <h2 className="text-3xl font-black tracking-tighter text-neutral-900 mb-2">Lamine Niassy</h2>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Membre Actif
            </div>
            
            <div className="flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-green-50 text-green-600 border border-green-100">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Compte Vérifié</span>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-4 rounded-[2.5rem] border-white/40 shadow-2xl shadow-neutral-900/5 space-y-2"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all relative group ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                    : 'hover:bg-white/60 text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <tab.icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", activeTab === tab.id ? "text-white" : "text-primary")} />
                <span className="font-black text-sm uppercase tracking-widest">{tab.label}</span>
                <ChevronRight className={cn("ml-auto w-5 h-5 transition-all", activeTab === tab.id ? 'rotate-90 opacity-100' : 'opacity-0 group-hover:opacity-100')} />
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/40">
              <button className="w-full flex items-center gap-4 p-5 rounded-2xl text-red-500 hover:bg-red-50 transition-all group">
                <LogOut className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                <span className="font-black text-sm uppercase tracking-widest">Déconnexion</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-10 md:p-16 rounded-[3rem] border-white/40 shadow-2xl shadow-neutral-900/5 min-h-[600px]"
            >
              {activeTab === 'personal' && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-white/40 pb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <User className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-neutral-900">Informations Personnelles</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-4">Nom complet</label>
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="text" 
                          defaultValue="Lamine Niassy" 
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-4">Email professionnel</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="email" 
                          defaultValue="niassy.lamine10@gmail.com" 
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-4">Téléphone mobile</label>
                      <div className="relative group">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="tel" 
                          defaultValue="+221 77 123 45 67" 
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-4">Adresse de résidence</label>
                      <div className="relative group">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="text" 
                          defaultValue="Dakar, Sénégal" 
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/50 border border-white/60 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-4">Bio / Présentation</label>
                    <textarea 
                      rows={4} 
                      defaultValue="Membre passionné par les actions sociales et le développement communautaire au sein du Dahira."
                      className="w-full p-6 rounded-3xl bg-white/50 border border-white/60 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none font-medium leading-relaxed"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-white/40 pb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Shield className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-neutral-900">Sécurité & Accès</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-white/40 border border-white/60 flex items-center justify-between group hover:bg-white transition-all">
                      <div>
                        <h4 className="font-black text-lg text-neutral-900 mb-1">Changer le mot de passe</h4>
                        <p className="text-sm text-neutral-500 font-medium">Dernière modification: il y a 3 mois</p>
                      </div>
                      <button className="btn-secondary !px-6 !py-2 !text-xs">Modifier</button>
                    </div>
                    
                    <div className="p-8 rounded-3xl bg-white/40 border border-white/60 flex items-center justify-between group hover:bg-white transition-all">
                      <div>
                        <h4 className="font-black text-lg text-neutral-900 mb-1">Double authentification (2FA)</h4>
                        <p className="text-sm text-neutral-500 font-medium">Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-14 h-7 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-white/40 pb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Bell className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-neutral-900">Préférences Notifications</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Nouveaux événements', desc: 'Recevoir une alerte pour chaque nouvel événement créé.' },
                      { title: 'Messages directs', desc: 'Être notifié quand vous recevez un message privé.' },
                      { title: 'Rappels de cotisations', desc: 'Recevoir des rappels pour vos cotisations mensuelles.' },
                      { title: 'Annonces générales', desc: 'Rester informé des annonces importantes du Dahira.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-8 rounded-3xl hover:bg-white/40 transition-all group">
                        <div className="max-w-md">
                          <h4 className="font-black text-lg text-neutral-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-neutral-500 font-medium">{item.desc}</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-14 h-7 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
  
              {activeTab === 'payments' && (
                <div className="space-y-10">
                  <div className="flex items-center gap-4 border-b border-white/40 pb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <CreditCard className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-neutral-900">Cotisations & Paiements</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/20 transition-colors" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Solde Cotisations 2026</p>
                      <h4 className="text-4xl font-black text-neutral-900 tracking-tighter">75,000 FCFA</h4>
                      <p className="text-xs text-neutral-500 font-bold mt-4 uppercase tracking-widest">À jour jusqu'en Mars 2026</p>
                    </div>
                    
                    <div className="p-10 rounded-[2.5rem] bg-secondary/10 border border-secondary/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-secondary/30 transition-colors" />
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Total Dons 2026</p>
                      <h4 className="text-4xl font-black text-neutral-900 tracking-tighter">150,000 FCFA</h4>
                      <p className="text-xs text-neutral-500 font-bold mt-4 uppercase tracking-widest">Merci pour votre générosité !</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="font-black text-xs uppercase tracking-[0.4em] text-neutral-400 ml-4">Historique récent</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Cotisation Mars 2026', amount: '25,000 FCFA', date: '10/03/2026', status: 'Payé' },
                        { label: 'Don Rénovation Siège', amount: '50,000 FCFA', date: '15/02/2026', status: 'Payé' },
                        { label: 'Cotisation Février 2026', amount: '25,000 FCFA', date: '05/02/2026', status: 'Payé' },
                      ].map((pay, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/40 border border-white/60 hover:bg-white transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                              <CheckCircle2 className="text-green-500 w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-black text-neutral-900">{pay.label}</p>
                              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{pay.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-lg text-primary">{pay.amount}</p>
                            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">{pay.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
