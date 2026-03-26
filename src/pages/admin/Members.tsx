import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Shield, 
  Trash2,
  Download,
  X,
  Check,
  Edit2,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { User } from '../../types';
import { UserRole } from '../../core/constants';
import ImageUpload from '../../components/ImageUpload';

const AdminMembers = () => {
  const { members, addMember, updateMember, deleteMember } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    password: '',
    role: UserRole.MEMBER,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    joinedAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  });

  const handleOpenModal = (member?: User) => {
    if (member) {
      setEditingMember(member);
      setFormData({ ...member, password: '' });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: UserRole.MEMBER,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
        joinedAt: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember(editingMember.id, formData);
    } else {
      addMember(formData as Omit<User, 'id'>);
    }
    setIsModalOpen(false);
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white">Gestion des Membres</h2>
          <p className="text-slate-500 font-medium mt-1">Gérez les accès, les rôles et les informations des membres.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all">
            <Download className="w-4 h-4" />
            <span>Exporter CSV</span>
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Ajouter un membre</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          >
            <option value="ALL">Tous les rôles</option>
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.MEMBER}>Membre</option>
          </select>
          <button className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-500 hover:text-emerald-500 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800">
                <th className="px-10 py-6">Membre</th>
                <th className="px-10 py-6">Rôle</th>
                <th className="px-10 py-6">Date d'inscription</th>
                <th className="px-10 py-6">Statut</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredMembers.map((member, i) => (
                <motion.tr 
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-4">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl border-2 border-slate-800 group-hover:border-emerald-500/30 transition-all" />
                      <div>
                        <p className="text-sm font-bold text-white">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-2">
                      <Shield className={`w-4 h-4 ${member.role === UserRole.ADMIN ? 'text-emerald-500' : 'text-slate-500'}`} />
                      <span className="text-sm font-medium">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-400">{member.joinedAt}</td>
                  <td className="px-10 py-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
                      member.status === 'ACTIVE' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {member.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleOpenModal(member)}
                        className="p-2.5 bg-slate-800 text-slate-400 hover:text-emerald-400 rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteMember(member.id)}
                        className="p-2.5 bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Simulation */}
        <div className="p-8 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Affichage de 1-{filteredMembers.length} sur {filteredMembers.length} membres</p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold disabled:opacity-50">Précédent</button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold">Suivant</button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    {editingMember ? <Edit2 className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{editingMember ? 'Modifier le membre' : 'Ajouter un membre'}</h3>
                    <p className="text-xs text-slate-500 font-medium">Remplissez les informations ci-dessous.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <ImageUpload 
                      label="Photo de profil"
                      currentImage={formData.avatar}
                      onImageSelect={(base64) => setFormData({ ...formData, avatar: base64 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Nom Complet</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Abdoulaye Diop"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: a.diop@mail.com"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Rôle</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all appearance-none"
                      >
                        <option value={UserRole.MEMBER}>Membre</option>
                        <option value={UserRole.ADMIN}>Administrateur</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Téléphone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="tel" 
                        placeholder="+221 77 000 00 00"
                        className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                      />
                    </div>
                  </div>

                  {!editingMember && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Mot de passe</label>
                      <div className="relative">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="password" 
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="********"
                          className="w-full pl-12 pr-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-end space-x-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>{editingMember ? 'Mettre à jour' : 'Créer le membre'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMembers;

