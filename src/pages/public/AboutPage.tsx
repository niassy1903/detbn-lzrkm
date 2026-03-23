import { motion } from 'motion/react';
import { BookOpen, Target, History, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-24"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Notre Histoire</span>
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 tracking-tighter mb-8 leading-none">
            Unir la foi et le <span className="text-primary italic">savoir</span>.
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed">
            Le Dahira des Élèves Talibés de Baye Niass (DETBN) est né d'une volonté commune des élèves du Lycée Zone de Recasement de Keur Massar de créer un espace d'épanouissement spirituel et académique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/history/800/1000" alt="History" className="w-full h-full object-cover aspect-[4/5]" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary rounded-full flex items-center justify-center p-8 text-center shadow-2xl">
              <p className="font-black text-neutral-900 leading-tight">10 ANS D'ENGAGEMENT</p>
            </div>
          </div>
          
          <div className="space-y-12">
            {[
              { 
                icon: Target, 
                title: "Notre Mission", 
                desc: "Accompagner chaque élève talibé dans sa quête de savoir, tant religieux que profane, tout en cultivant les valeurs de paix et de tolérance prônées par Cheikh Al Islam El Hadji Ibrahima Niass." 
              },
              { 
                icon: History, 
                title: "Notre Vision", 
                desc: "Devenir un modèle d'organisation estudiantine où l'excellence devient une habitude et la solidarité une seconde nature." 
              },
              { 
                icon: Users, 
                title: "Notre Communauté", 
                desc: "Plus qu'une association, nous sommes une famille. Nous veillons les uns sur les autres pour que personne ne soit laissé pour compte." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 rounded-[4rem] p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tight">Nos Valeurs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Foi', 'Discipline', 'Travail', 'Solidarité'].map((val, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <p className="text-2xl font-bold text-primary">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
