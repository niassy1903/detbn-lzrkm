import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, TrendingDown, DollarSign, Download, Plus, 
  Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar,
  PieChart as PieChartIcon, BarChart3, Wallet, CreditCard,
  ArrowRight, ChevronRight, MoreVertical, FileText,
  Image as ImageIcon, UploadCloud
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import Modal from '../../components/ui/Modal';
import { api } from '../../services/api';

const FinancePage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    type: 'income',
    category: 'Cotisation',
    amount: 0,
    member: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Complété'
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setFormData({
      type,
      category: type === 'income' ? 'Cotisation' : 'Logistique',
      amount: 0,
      member: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      status: 'Complété'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createTransaction(formData);
      setIsModalOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  // Calculate stats
  const totalBalance = transactions.reduce((acc, tx) => 
    tx.type === 'income' ? acc + tx.amount : acc - tx.amount, 0
  );

  const monthlyIncome = transactions
    .filter(tx => tx.type === 'income' && new Date(tx.date).getMonth() === new Date().getMonth())
    .reduce((acc, tx) => acc + tx.amount, 0);

  const monthlyExpenses = transactions
    .filter(tx => tx.type === 'expense' && new Date(tx.date).getMonth() === new Date().getMonth())
    .reduce((acc, tx) => acc + tx.amount, 0);

  // Chart data preparation
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const chartData = months.map((month, index) => {
    const monthIncome = transactions
      .filter(tx => tx.type === 'income' && new Date(tx.date).getMonth() === index)
      .reduce((acc, tx) => acc + tx.amount, 0);
    const monthExpenses = transactions
      .filter(tx => tx.type === 'expense' && new Date(tx.date).getMonth() === index)
      .reduce((acc, tx) => acc + tx.amount, 0);
    return { month, income: monthIncome, expenses: monthExpenses };
  });

  // Category data preparation
  const categories = Array.from(new Set(transactions.filter(tx => tx.type === 'income').map(tx => tx.category)));
  const categoryData = categories.map((cat, index) => {
    const value = transactions
      .filter(tx => tx.category === cat)
      .reduce((acc, tx) => acc + tx.amount, 0);
    const colors = ['#15803d', '#fbbf24', '#3b82f6', '#94a3b8', '#8b5cf6', '#ec4899'];
    return { name: cat, value, color: colors[index % colors.length] };
  });

  const filteredTransactions = transactions.filter(tx => 
    tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.member.toLowerCase().includes(searchTerm.toLowerCase())
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
            Trésorerie & Finances
          </motion.div>
          <h1 className="text-7xl font-black text-neutral-900 tracking-tighter leading-none">
            Gestion <span className="text-gradient">Financière</span>
          </h1>
          <p className="text-2xl text-neutral-500 mt-6 font-medium max-w-2xl">
            Suivez les flux de trésorerie, gérez les cotisations et visualisez la santé financière de votre Dahira.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-secondary !px-10 !py-5 !text-lg border-neutral-200 text-neutral-900 hover:bg-white hover:shadow-2xl group">
            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Rapport PDF
          </button>
          <button 
            onClick={() => handleAddTransaction('income')}
            className="btn-primary !px-10 !py-5 !text-lg shadow-2xl shadow-primary/20 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Nouvelle Entrée
          </button>
        </div>
      </header>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { label: 'Solde Total', value: `${totalBalance.toLocaleString()} FCFA`, icon: Wallet, color: 'bg-primary', trend: '+15.2%', isPositive: true },
          { label: 'Revenus (Mois)', value: `${monthlyIncome.toLocaleString()} FCFA`, icon: TrendingUp, color: 'bg-emerald-600', trend: '+8.4%', isPositive: true },
          { label: 'Dépenses (Mois)', value: `${monthlyExpenses.toLocaleString()} FCFA`, icon: TrendingDown, color: 'bg-red-600', trend: '-2.1%', isPositive: false },
          { label: 'Cotisations à jour', value: '85%', icon: CreditCard, color: 'bg-secondary', trend: '+5%', isPositive: true },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[3rem] border-white/60 shadow-2xl shadow-primary/5 card-hover group"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-16 h-16 ${stat.color} text-white rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <span className={`text-[10px] font-black flex items-center gap-1 px-3 py-1.5 rounded-full uppercase tracking-widest border ${
                stat.isPositive ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 'text-red-500 bg-red-50 border-red-100'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">{stat.label}</p>
            <p className="text-3xl font-black text-neutral-900 mt-3 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass p-10 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-black text-neutral-900 tracking-tight">Flux de Trésorerie</h3>
              <p className="text-neutral-500 font-medium">Comparaison mensuelle des revenus et dépenses</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Dépenses</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#15803d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#15803d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a3a3a3', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#a3a3a3', fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    padding: '20px'
                  }} 
                />
                <Area type="monotone" dataKey="income" stroke="#15803d" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={4} fill="transparent" strokeDasharray="8 8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-10 rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 flex flex-col"
        >
          <h3 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Répartition</h3>
          <p className="text-neutral-500 font-medium mb-10">Sources de revenus principales</p>
          
          <div className="flex-grow flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-neutral-900">100%</span>
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total</span>
            </div>
          </div>

          <div className="space-y-4 mt-10">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-sm font-black text-neutral-700">{cat.name}</span>
                </div>
                <span className="text-sm font-black text-neutral-900">{cat.value.toLocaleString()} FCFA</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <div className="glass rounded-[4rem] border-white/60 shadow-2xl shadow-primary/5 overflow-hidden">
        <div className="p-10 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-neutral-900 tracking-tight">Transactions Récentes</h3>
            <p className="text-neutral-500 font-medium">Historique détaillé des flux financiers</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-6 py-4 rounded-2xl bg-neutral-50 border border-transparent focus:border-primary focus:bg-white outline-none font-bold transition-all"
              />
            </div>
            <button className="p-4 rounded-2xl bg-neutral-50 text-neutral-400 hover:bg-primary hover:text-white transition-all">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50">
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Transaction</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Membre / Entité</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Montant</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Date</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">Statut</th>
                <th className="px-10 py-8 text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center text-neutral-400 font-bold">Chargement des transactions...</td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center text-neutral-400 font-bold">Aucune transaction trouvée.</td>
                </tr>
              ) : filteredTransactions.map((tx, index) => (
                <motion.tr 
                  key={tx._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-neutral-50/50 transition-colors group"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {tx.type === 'income' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                      </div>
                      <div>
                        <div className="font-black text-neutral-900 text-lg tracking-tight">{tx.category}</div>
                        <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-1">Ref: #TX-{tx._id.substring(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-black text-xs">
                        {tx.member?.charAt(0) || '?'}
                      </div>
                      <span className="text-sm font-bold text-neutral-700">{tx.member}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`text-xl font-black tracking-tight ${
                      tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'} {tx.amount.toLocaleString()} FCFA
                    </span>
                  </td>
                  <td className="px-10 py-8 text-sm text-neutral-500 font-bold">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-10 py-8">
                    <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${
                      tx.status === 'Complété' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-3 rounded-2xl hover:bg-primary/10 text-primary transition-all hover:scale-110">
                        <FileText className="w-6 h-6" />
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
      </div>

      {/* Add Transaction Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={transactionType === 'income' ? "Nouvelle Entrée" : "Nouvelle Dépense"}
      >
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className={`flex items-center gap-8 p-8 rounded-[2.5rem] border ${
            transactionType === 'income' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
          }`}>
            <div className={`w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center shadow-xl ${
              transactionType === 'income' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {transactionType === 'income' ? <TrendingUp size={48} /> : <TrendingDown size={48} />}
            </div>
            <div>
              <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Détails de la transaction</h3>
              <p className="text-neutral-500 font-medium">Enregistrez un nouveau flux financier dans la trésorerie.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Catégorie</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all cursor-pointer"
              >
                {transactionType === 'income' ? (
                  <>
                    <option>Cotisation</option>
                    <option>Don</option>
                    <option>Événement</option>
                    <option>Autre Revenu</option>
                  </>
                ) : (
                  <>
                    <option>Logistique</option>
                    <option>Aide Sociale</option>
                    <option>Communication</option>
                    <option>Autre Dépense</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Montant (FCFA)</label>
              <input 
                type="number" 
                required
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                placeholder="0" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Membre concerné</label>
              <input 
                type="text" 
                required
                value={formData.member}
                onChange={(e) => setFormData({...formData, member: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all" 
                placeholder="Nom du membre ou entité" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all cursor-pointer" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Description / Notes</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-8 py-5 bg-neutral-50 border border-neutral-100 rounded-[1.5rem] focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none font-bold text-lg transition-all resize-none" 
              placeholder="Détails supplémentaires..."
            ></textarea>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] ml-4">Justificatif (Photo/PDF)</label>
            <div className="relative group">
              <div className="w-full p-10 rounded-[2.5rem] border-4 border-dashed border-neutral-100 bg-neutral-50/50 flex flex-col items-center justify-center text-center group-hover:border-primary/20 group-hover:bg-primary/5 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-neutral-300 group-hover:text-primary shadow-xl group-hover:scale-110 transition-all mb-4">
                  <UploadCloud size={32} />
                </div>
                <h4 className="text-lg font-black text-neutral-900 tracking-tight mb-1">Uploader un justificatif</h4>
                <p className="text-xs text-neutral-400 font-medium max-w-[240px]">Glissez-déposez ou cliquez pour sélectionner un fichier (Max 5MB)</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex gap-6 pt-10">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow btn-secondary !py-6 !text-xl">Annuler</button>
            <button type="submit" className={`flex-grow btn-primary !py-6 !text-xl shadow-2xl ${
              transactionType === 'income' ? 'shadow-emerald-500/20' : 'shadow-red-500/20'
            }`}>
              Enregistrer la transaction
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FinancePage;

