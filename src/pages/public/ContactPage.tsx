import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Contactez-nous</span>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 tracking-tighter mb-8 leading-none">
              Restons en <span className="text-primary italic">contact</span>.
            </h1>
            <p className="text-xl text-neutral-500 leading-relaxed mb-12">
              Vous avez des questions sur nos activités ou vous souhaitez nous rejoindre ? N'hésitez pas à nous envoyer un message.
            </p>

            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Adresse", value: "Lycée Zone de Recasement, Keur Massar, Sénégal" },
                { icon: Phone, title: "Téléphone", value: "+221 33 800 00 00" },
                { icon: Mail, title: "Email", value: "contact@detbn.com" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 uppercase tracking-widest text-xs mb-1">{item.title}</h4>
                    <p className="text-lg text-neutral-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 md:p-16 rounded-[4rem] border border-neutral-100 shadow-2xl shadow-neutral-900/5"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Nom Complet</label>
                  <input type="text" placeholder="Votre nom" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Email</label>
                  <input type="email" placeholder="votre@email.com" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Sujet</label>
                <input type="text" placeholder="Comment pouvons-nous vous aider ?" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Message</label>
                <textarea rows={5} placeholder="Votre message ici..." className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-5 text-xl">
                Envoyer le message
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
