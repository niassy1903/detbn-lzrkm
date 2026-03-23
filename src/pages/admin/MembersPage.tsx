import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Phone, Shield, CheckCircle2, XCircle, Download, Trash2, Edit, ArrowRight, ChevronRight, Image as ImageIcon } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Membre Actif',
    status: 'Actif'
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await api.getMembers();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Membre Actif',
      status: 'Actif'
    });
    setIsModalOpen(true);
  };

  const handleEditMember = (member: any) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      role: member.role,
      status: member.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      try {
        await api.deleteMember(id);
        fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedMember) {
        await api.updateMember(selectedMember._id, formData);
      } else {
        await api.createMember(formData);
      }
      setIsModalOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.phone && member.phone.includes(searchTerm))
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-primary/5"
          >
            Gestion des effectifs
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Annuaire <span className="text-gradient">Membres</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Gérez la base de données de votre communauté avec simplicité et élégance.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-secondary !px-10 !py-5 !text-lg border-neutral-200 text-neutral-900 hover:bg-white hover:shadow-2xl group">
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Exporter
          </button>
          <button 
            onClick={handleAddMember}
            className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
          >
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Ajouter un membre
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {[
          { label: 'Total Membres', value: members.length.toString(), icon: Users, color: 'bg-primary', trend: '+12%' },
          { label: 'Nouveaux (Mois)', value: '24', icon: UserPlus, color: 'bg-secondary', trend: '+5' },
          { label: 'Taux Rétention', value: '98%', icon: CheckCircle2, color: 'bg-emerald-600', trend: 'Stable' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-10 rounded-[3.5rem] border-white/60 shadow-2xl shadow-primary/5 card-hover group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className={`w-20 h-20 ${stat.color} text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-neutral-200 group-hover:scale-110 transition-transform`}>
                <stat.icon size={36} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-50 px-4 py-2.5 rounded-full uppercase tracking-widest border border-emerald-100 shadow-sm">
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] relative z-10">{stat.label}</p>
            <p className="text-6xl font-black text-neutral-900 mt-4 tracking-tight relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="glass p-6 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5 flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="relative flex-grow group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors w-6 h-6" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, email ou téléphone..." 
            className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-neutral-50 border border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all text-lg font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select className="bg-neutral-50 border-none rounded-[1.5rem] px-8 py-5 text-sm font-black text-neutral-600 focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer hover:bg-neutral-100 transition-colors">
            <option>Tous les rôles</option>
            <option>Admin</option>
            <option>Membre</option>
          </select>
          <select className="bg-neutral-50 border-none rounded-[1.5rem] px-8 py-5 text-sm font-black text-neutral-600 focus:ring-4 focus:ring-primary/5 outline-none cursor-pointer hover:bg-neutral-100 transition-colors">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Inactif</option>
          </select>
          <button className="p-5 rounded-[1.5rem] bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all shadow-sm">
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="glass rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50">
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Membre</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Contact</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Rôle</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Statut</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Date d'adhésion</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center text-neutral-400 font-bold">Chargement des membres...</td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center text-neutral-400 font-bold">Aucun membre trouvé.</td>
                </tr>
              ) : filteredMembers.map((member, index) => (
                <motion.tr 
                  key={member._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50/50 transition-colors group cursor-pointer"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                        <img src={member.photo || `https://picsum.photos/seed/${member._id}/100/100`} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-black text-neutral-900 text-lg tracking-tight">{member.name}</div>
                        <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">ID: #{member._id.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                        <Mail className="w-4 h-4 text-primary" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-500 font-medium">
                        <Phone className="w-4 h-4 text-primary" />
                        {member.phone || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${
                      member.role === 'Admin' ? 'bg-primary/10 text-primary border border-primary/10' : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${member.status === 'Actif' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                      <span className={`text-sm font-black ${member.status === 'Actif' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm text-neutral-500 font-bold">{new Date(member.joinDate).toLocaleDateString()}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleEditMember(member)}
                        className="p-3 rounded-2xl hover:bg-primary/10 text-primary transition-all hover:scale-110" 
                        title="Modifier"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => handleDeleteMember(member._id)}
                        className="p-3 rounded-2xl hover:bg-red-50 text-red-500 transition-all hover:scale-110" 
                        title="Supprimer"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                      <button className="p-3 rounded-2xl hover:bg-neutral-100 text-neutral-300 transition-all">
                        <MoreVertical className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-10 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between">
          <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">Affichage de {filteredMembers.length} membres</p>
          <div className="flex items-center gap-3">
            <button className="px-8 py-4 rounded-2xl border border-neutral-200 text-sm font-black text-neutral-400 hover:border-primary hover:text-primary transition-all">Précédent</button>
            <button className="w-14 h-14 rounded-2xl bg-primary text-white text-sm font-black shadow-2xl shadow-primary/20">1</button>
            <button className="px-8 py-4 rounded-2xl border border-neutral-200 text-sm font-black text-neutral-600 hover:border-primary hover:text-primary transition-all">Suivant</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Member Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedMember ? "Modifier le Membre" : "Ajouter un Membre"}
      >
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex items-center gap-8 p-8 bg-primary/5 rounded-[2.5rem] border border-primary/5">
            <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center text-primary shadow-xl">
              <UserPlus size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Informations de base</h3>
              <p className="text-neutral-500 font-medium">Remplissez les détails pour {selectedMember ? 'mettre à jour' : 'créer'} le profil.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Nom complet</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                placeholder="Ex: Lamine Niassy" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Email professionnel</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                placeholder="Ex: lamine@niassy.com" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Téléphone</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                placeholder="+221 77 000 00 00" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Rôle assigné</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all cursor-pointer"
              >
                <option>Membre Actif</option>
                <option>Président</option>
                <option>Secrétaire</option>
                <option>Trésorier</option>
                <option>Sympathisant</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Photo de profil</label>
            <div className="relative group">
              <div className="w-full p-12 border-4 border-dashed border-neutral-100 rounded-[3rem] bg-neutral-50/50 flex flex-col items-center justify-center text-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-all cursor-pointer">
                <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-neutral-300 group-hover:text-primary shadow-xl group-hover:scale-110 transition-all mb-6">
                  <ImageIcon size={32} />
                </div>
                <p className="text-lg font-black text-neutral-900 tracking-tight">Cliquez ou glissez une photo ici</p>
                <p className="text-sm text-neutral-400 font-medium mt-2">PNG, JPG ou GIF jusqu'à 5MB</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>
            </div>
          </div>

          <div className="flex gap-6 pt-10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow btn-secondary !py-6 !text-xl">Annuler</button>
            <button type="submit" className="flex-grow btn-primary !py-6 !text-xl shadow-2xl shadow-primary/20">
              {selectedMember ? 'Sauvegarder les modifications' : 'Confirmer l\'adhésion'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MembersPage;
