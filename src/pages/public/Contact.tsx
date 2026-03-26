import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, Sparkles, Heart, Star } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = '221770000000'; // Numéro de téléphone sans espaces ni +
    const text = `*Nouveau message de Ansaroudine Dahira*\n\n*Nom:* ${formData.name}\n*Email:* ${formData.email}\n*Sujet:* ${formData.subject}\n*Message:* ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-subtitle">Nous Joindre</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-none tracking-tighter">
              Contact & <span className="text-emerald-600 italic">Fraternité</span>.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Vous avez des questions sur notre Dahira ou souhaitez nous rejoindre ? Notre équipe est à votre entière disposition.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-3 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-950 p-12 rounded-[60px] text-white relative overflow-hidden shadow-3xl shadow-emerald-900/20"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none"></div>
              <h3 className="text-3xl font-black mb-12 relative z-10">Nos Coordonnées</h3>
              <div className="space-y-10 relative z-10">
                {[
                  { icon: MapPin, label: 'Localisation', value: 'Lycée Zone de Recasement, Keur Massar, Dakar' },
                  { icon: Phone, label: 'Téléphone', value: '+221 77 000 00 00' },
                  { icon: Mail, label: 'Email', value: 'contact@ansaroudine.sn' },
                  { icon: Clock, label: 'Disponibilité', value: 'Hadratoul Juma : Vendredi 21h' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      <p className="text-emerald-50/80 font-medium leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 p-12 rounded-[60px] border border-slate-100"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-emerald-600 mb-8">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Espace Membre</h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                Déjà membre de l'Ansaroudine ? Connectez-vous à votre espace pour accéder aux ressources exclusives.
              </p>
              <button className="w-full btn-primary justify-center">
                Se Connecter
              </button>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-12 md:p-20 rounded-[80px] shadow-3xl shadow-emerald-900/5 border border-emerald-50 relative"
          >
            <div className="absolute top-12 right-12 opacity-5 pointer-events-none">
              <Sparkles className="w-32 h-32 text-emerald-900" />
            </div>
            
            <h3 className="text-4xl font-black text-slate-900 mb-12 tracking-tighter">Envoyez-nous un <span className="text-emerald-600 italic">Message</span></h3>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Nom complet</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all font-medium text-slate-900"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all font-medium text-slate-900"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Sujet</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all font-medium text-slate-900"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Message</label>
                <textarea 
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Votre message ici..."
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:bg-white outline-none transition-all font-medium text-slate-900 resize-none"
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary px-16 py-6 group/btn">
                <Send className="w-5 h-5 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                <span>Envoyer le Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-slate-100 relative grayscale hover:grayscale-0 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.747196347898!2d-17.2917!3d14.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ2JzAwLjAiTiAxN8KwMTcnMzAuMSJX!5e0!3m2!1sfr!2ssn!4v1610000000000!5m2!1sfr!2ssn" 
          className="w-full h-full border-0" 
          allowFullScreen 
          loading="lazy"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]"></div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-12">
            {[Heart, Star, Sparkles].map((Icon, i) => (
              <div key={i} className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Icon className="w-6 h-6" />
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-serif italic text-slate-900 leading-relaxed mb-8">
            "La communication est le pont qui relie les cœurs sincères dans la quête de la vérité."
          </h2>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600">Esprit de l'Ansaroudine</span>
        </div>
      </section>
    </div>
  );
};

export default Contact;
