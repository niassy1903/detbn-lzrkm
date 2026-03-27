import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Shield, 
  Bell, 
  Database, 
  Palette,
  Save,
  ChevronRight,
  Mail,
  Lock,
  Smartphone,
  Cloud,
  Languages,
  Clock,
  Layout,
  Check
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initial settings state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('dahira_settings');
    return saved ? JSON.parse(saved) : {
      general: {
        orgName: 'Ansaroudine Dahira',
        email: 'contact@ansaroudine.sn',
        language: 'Français',
        timezone: '(GMT+00:00) Dakar'
      },
      security: {
        twoFactor: true,
        activityLogs: true,
        sessionExpiration: false
      },
      notifications: {
        emailAlerts: true,
        pushNotifications: true,
        smsAlerts: false,
        memberJoinAlerts: true,
        eventReminderAlerts: true
      },
      appearance: {
        primaryColor: 'bg-emerald-500',
        darkMode: true
      }
    };
  });

  const tabs = [
    { id: 'general', icon: Globe, title: 'Général', desc: 'Identité et localisation', color: 'text-blue-400' },
    { id: 'security', icon: Shield, title: 'Sécurité', desc: 'Accès et authentification', color: 'text-emerald-400' },
    { id: 'notifications', icon: Bell, title: 'Alertes', desc: 'Emails et notifications', color: 'text-amber-400' },
    { id: 'appearance', icon: Palette, title: 'Design', desc: 'Thèmes et styles visuels', color: 'text-purple-400' },
    { id: 'data', icon: Database, title: 'Données', desc: 'Exports et maintenance', color: 'text-red-400' },
  ];

  const handleGeneralChange = (field: string, value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      general: { ...prev.general, [field]: value }
    }));
  };

  const toggleSetting = (category: string, field: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [field]: !prev[category][field] }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('dahira_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "dahira_settings_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Paramètres Système</h2>
          <p className="text-slate-500 font-medium mt-1">Configurez les options globales de votre plateforme.</p>
        </div>
        <div className="flex items-center space-x-4">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-2 text-emerald-500 font-bold"
              >
                <Check className="w-5 h-5" />
                <span>Enregistré !</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Sauvegarder tout</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-10">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-4">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-4 p-5 rounded-[24px] transition-all border ${
                activeTab === tab.id 
                ? 'bg-slate-900 border-emerald-500/30 text-white shadow-xl shadow-emerald-500/5' 
                : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                activeTab === tab.id ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-500'
              }`}>
                <tab.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">{tab.title}</p>
                <p className="text-[10px] font-medium opacity-60">{tab.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden"
          >
            <div className="p-10">
              {activeTab === 'general' && (
                <div className="space-y-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Identité du Dahira</h3>
                      <p className="text-xs text-slate-500 font-medium">Informations publiques et localisation.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Nom de l'organisation</label>
                      <input 
                        type="text" 
                        value={settings.general.orgName}
                        onChange={(e) => handleGeneralChange('orgName', e.target.value)}
                        className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Email officiel</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="email" 
                          value={settings.general.email}
                          onChange={(e) => handleGeneralChange('email', e.target.value)}
                          className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Langue par défaut</label>
                      <div className="relative">
                        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select 
                          value={settings.general.language}
                          onChange={(e) => handleGeneralChange('language', e.target.value)}
                          className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                        >
                          <option>Français</option>
                          <option>Wolof</option>
                          <option>Arabe</option>
                          <option>Anglais</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Fuseau Horaire</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select 
                          value={settings.general.timezone}
                          onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                          className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                        >
                          <option>(GMT+00:00) Dakar</option>
                          <option>(GMT+01:00) Paris</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Sécurité & Accès</h3>
                      <p className="text-xs text-slate-500 font-medium">Protégez votre plateforme et vos données.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { id: 'twoFactor', title: 'Authentification à deux facteurs', desc: 'Ajoutez une couche de sécurité supplémentaire.' },
                      { id: 'activityLogs', title: 'Logs d\'activité', desc: 'Enregistrez toutes les actions administratives.' },
                      { id: 'sessionExpiration', title: 'Expiration de session', desc: 'Déconnectez automatiquement après 30 min d\'inactivité.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-slate-950 rounded-3xl border border-slate-800">
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting('security', item.id)}
                          className={`w-12 h-6 rounded-full transition-all relative ${settings.security[item.id as keyof typeof settings.security] ? 'bg-emerald-500' : 'bg-slate-800'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.security[item.id as keyof typeof settings.security] ? 'right-1' : 'left-1'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Alertes & Notifications</h3>
                      <p className="text-xs text-slate-500 font-medium">Gérez comment vous êtes informé.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { id: 'emailAlerts', title: 'Notifications par Email', desc: 'Recevoir des résumés d\'activité par email.' },
                      { id: 'pushNotifications', title: 'Notifications Push', desc: 'Alertes en temps réel sur votre navigateur.' },
                      { id: 'smsAlerts', title: 'Alertes SMS', desc: 'Notifications critiques par SMS (frais applicables).' },
                      { id: 'memberJoinAlerts', title: 'Nouveaux Membres', desc: 'Alerte lors de l\'inscription d\'un nouveau membre.' },
                      { id: 'eventReminderAlerts', title: 'Rappels d\'Événements', desc: 'Notifications automatiques avant le début des événements.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-slate-950 rounded-3xl border border-slate-800">
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting('notifications', item.id)}
                          className={`w-12 h-6 rounded-full transition-all relative ${settings.notifications[item.id as keyof typeof settings.notifications] ? 'bg-emerald-500' : 'bg-slate-800'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.notifications[item.id as keyof typeof settings.notifications] ? 'right-1' : 'left-1'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                      <Palette className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Apparence & Design</h3>
                      <p className="text-xs text-slate-500 font-medium">Personnalisez l'interface visuelle.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Couleur Primaire</label>
                      <div className="flex flex-wrap gap-4">
                        {['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500'].map((color) => (
                          <button 
                            key={color} 
                            onClick={() => setSettings((prev: any) => ({ ...prev, appearance: { ...prev.appearance, primaryColor: color } }))}
                            className={`w-10 h-10 rounded-xl ${color} border-4 ${settings.appearance.primaryColor === color ? 'border-white' : 'border-slate-950'} ring-2 ring-transparent hover:ring-white transition-all`}
                          ></button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Thème</label>
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => setSettings((prev: any) => ({ ...prev, appearance: { ...prev.appearance, darkMode: true } }))}
                          className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${settings.appearance.darkMode ? 'bg-slate-950 border-2 border-emerald-500 text-white' : 'bg-slate-950 border border-slate-800 text-slate-500'}`}
                        >
                          Sombre
                        </button>
                        <button 
                          onClick={() => setSettings((prev: any) => ({ ...prev, appearance: { ...prev.appearance, darkMode: false } }))}
                          className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all ${!settings.appearance.darkMode ? 'bg-slate-950 border-2 border-emerald-500 text-white' : 'bg-slate-950 border border-slate-800 text-slate-500'}`}
                        >
                          Clair
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Gestion des Données</h3>
                      <p className="text-xs text-slate-500 font-medium">Sauvegardes et exports du système.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-950 rounded-[32px] border border-slate-800 space-y-6">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                        <Cloud className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Sauvegarde Cloud</h4>
                        <p className="text-xs text-slate-500 mt-1">Dernière sauvegarde : Aujourd'hui à 04:00</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsSaving(true);
                          setTimeout(() => {
                            setIsSaving(false);
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          }, 2000);
                        }}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all"
                      >
                        Sauvegarder maintenant
                      </button>
                    </div>
                    <div className="p-8 bg-slate-950 rounded-[32px] border border-slate-800 space-y-6">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                        <Database className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Export Complet</h4>
                        <p className="text-xs text-slate-500 mt-1">Exportez tous les membres et événements.</p>
                      </div>
                      <button 
                        onClick={handleExport}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all"
                      >
                        Générer l'archive (JSON)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

