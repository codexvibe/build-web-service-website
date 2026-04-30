'use client'

import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { 
  Search, Bell, Plus, Users, Trash2, LayoutDashboard, 
  Activity, Settings, Filter, MoreHorizontal, Download,
  TrendingUp, ArrowUpRight, MousePointer2, UserCheck,
  BarChart3
} from 'lucide-react'
import { 
  updateRequestStatusAction, deleteRequestAction,
  getAgencyStatsAction, getAdminsAction, addAdminAction, deleteAdminAction,
  logoutAction
} from '../actions'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import StatsOverview from './components/StatsOverview'
import LeadDetails from './components/LeadDetails'
import SettingsView from './components/SettingsView'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts'

const CHART_DATA = [
  { name: 'Lun', leads: 4, revenue: 2400 },
  { name: 'Mar', leads: 3, revenue: 1398 },
  { name: 'Mer', leads: 7, revenue: 9800 },
  { name: 'Jeu', leads: 5, revenue: 3908 },
  { name: 'Ven', leads: 9, revenue: 4800 },
  { name: 'Sam', leads: 6, revenue: 3800 },
  { name: 'Dim', leads: 8, revenue: 4300 },
]

interface ServiceRequest {
  id: string
  created_at: string
  full_name: string
  contact_info: string
  service_type: string
  location: string
  description: string
  preferred_date: string
  preferred_time: string
  urgency: string
  budget: string
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
}

interface AdminProfile {
  id: string
  name: string
  passcode: string
}

export default function DashboardClient({ initialRequests }: { initialRequests: any[] }) {
  const [activeTab, setActiveTab] = useState<'requests' | 'stats' | 'team' | 'settings'>('requests')
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests)
  const [admins, setAdmins] = useState<AdminProfile[]>([])
  const [stats, setStats] = useState<any>(null)
  const [isPending, startTransition] = useTransition()
  
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const [adminFormData, setAdminFormData] = useState({ name: '', passcode: '' })
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)

  useEffect(() => {
    if (activeTab === 'stats') fetchStats()
    if (activeTab === 'team') fetchAdmins()
  }, [activeTab])

  const fetchStats = async () => {
    const result = await getAgencyStatsAction()
    setStats(result)
  }

  const fetchAdmins = async () => {
    const result = await getAdminsAction()
    if (result.data) setAdmins(result.data as AdminProfile[])
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    startTransition(async () => {
      const result = await updateRequestStatusAction(id, status)
      if (result.success) {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: status as any } : r))
        if (selectedRequest?.id === id) setSelectedRequest(prev => prev ? { ...prev, status: status as any } : null)
      }
    })
  }

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Supprimer définitivement cette demande ?')) return
    startTransition(async () => {
      const result = await deleteRequestAction(id)
      if (result.success) {
        setRequests(prev => prev.filter(r => r.id !== id))
        setSelectedRequest(null)
      }
    })
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', adminFormData.name)
    data.append('passcode', adminFormData.passcode)
    const result = await addAdminAction(data)
    if (result.success) {
      setIsAdminModalOpen(false)
      setAdminFormData({ name: '', passcode: '' })
      fetchAdmins()
    }
  }

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm('Supprimer cet accès administrateur ?')) return
    startTransition(async () => {
      const result = await deleteAdminAction(id)
      if (result.success) {
        fetchAdmins()
      }
    })
  }

  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      const matchesSearch = r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           r.service_type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || r.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [requests, searchTerm, filterStatus])

  const totalEstimatedRevenue = requests.reduce((acc, r) => acc + parseFloat(String(r.budget || '0').replace(/[^0-9.]/g, '')), 0)

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={async () => { await logoutAction(); window.location.href = '/admin'; }} />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#09090b]">
        {/* Top Navbar */}
        <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <div className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                 <LayoutDashboard size={20} className="text-[#39ff14]" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  {activeTab === 'requests' && 'Management des Leads'}
                  {activeTab === 'stats' && 'Performance Analytics'}
                  {activeTab === 'team' && 'Équipe Administrative'}
                  {activeTab === 'settings' && 'Paramètres Système'}
                </h2>
                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">ProServices Control Panel</p>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Live Cloud DZ</span>
              </div>
              <button className="p-2.5 rounded-xl hover:bg-white/5 text-white/40 transition-colors">
                 <Bell size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/10 to-white/20 border border-white/20 flex items-center justify-center text-[10px] font-bold">
                 AD
              </div>
           </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
           <AnimatePresence mode="wait">
              {activeTab === 'requests' && (
                <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 max-w-[1600px] mx-auto">
                  <StatsOverview 
                    totalLeads={requests.length} 
                    pendingLeads={requests.filter(r => r.status === 'pending').length}
                    completedLeads={requests.filter(r => r.status === 'completed').length}
                    totalRevenue={`${totalEstimatedRevenue.toLocaleString()} DA`}
                  />

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    {/* Left: Requests List */}
                    <div className="xl:col-span-4 space-y-4">
                       <div className="flex flex-col gap-4">
                          <div className="relative group">
                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#39ff14] transition-colors" size={16} />
                             <input 
                               type="text" 
                               placeholder="Rechercher..."
                               value={searchTerm}
                               onChange={e => setSearchTerm(e.target.value)}
                               className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#39ff14]/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                             />
                          </div>
                          <div className="flex gap-2">
                             <select 
                               value={filterStatus}
                               onChange={e => setFilterStatus(e.target.value)}
                               className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 px-4 text-xs font-bold text-white/40 focus:outline-none focus:border-[#39ff14]/50 transition-all appearance-none cursor-pointer"
                             >
                               <option value="all">Tous les Statuts</option>
                               <option value="pending">⏳ En Attente</option>
                               <option value="contacted">📞 Contacté</option>
                               <option value="in_progress">⚙️ En Cours</option>
                               <option value="completed">✅ Terminé</option>
                             </select>
                             <button className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-white/40 hover:text-white transition-colors">
                                <Download size={16} />
                             </button>
                          </div>
                       </div>

                       <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                          {filteredRequests.map(req => (
                            <button
                              key={req.id}
                              onClick={() => setSelectedRequest(req)}
                              className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border relative overflow-hidden group ${
                                selectedRequest?.id === req.id 
                                ? 'bg-[#39ff14]/5 border-[#39ff14]/30' 
                                : 'bg-[#09090b] border-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.02]'
                              }`}
                            >
                               <div className="flex justify-between items-start mb-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                                    selectedRequest?.id === req.id ? 'bg-[#39ff14] text-black' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                                  }`}>
                                    {req.full_name.charAt(0).toUpperCase()}
                                  </div>
                                  <span className={`text-[8px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                                    req.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/10' :
                                    req.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10' :
                                    'bg-blue-500/10 text-blue-500 border border-blue-500/10'
                                  }`}>
                                    {req.status}
                                  </span>
                               </div>
                               <h5 className="font-bold text-sm mb-1 text-white group-hover:text-[#39ff14] transition-colors">{req.full_name}</h5>
                               <div className="flex items-center gap-2">
                                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{req.service_type}</p>
                                  <span className="w-1 h-1 rounded-full bg-white/5" />
                                  <p className="text-[9px] text-white/20 font-medium">{req.location}</p>
                                </div>
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* Right: Detail View */}
                    <div className="xl:col-span-8">
                       <AnimatePresence mode="wait">
                          {selectedRequest ? (
                            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} key={selectedRequest.id}>
                              <LeadDetails lead={selectedRequest} onDelete={handleDeleteRequest} onClose={() => setSelectedRequest(null)} onUpdateStatus={handleUpdateStatus} />
                            </motion.div>
                          ) : (
                            <div className="h-[750px] flex items-center justify-center bg-white/[0.01] rounded-[2rem] border border-dashed border-white/[0.05] relative overflow-hidden group">
                               <div className="text-center space-y-6">
                                  <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mx-auto text-white/5 group-hover:text-[#39ff14]/20 transition-all duration-700">
                                     <MousePointer2 size={40} />
                                  </div>
                                  <div className="space-y-2">
                                     <h3 className="text-xl font-bold text-white/40">Visualiseur de Lead</h3>
                                     <p className="text-[10px] text-white/10 font-bold uppercase tracking-[0.3em] max-w-[280px] mx-auto leading-relaxed">
                                        Sélectionnez un prospect dans la liste pour accéder aux détails et actions rapides.
                                     </p>
                                  </div>
                               </div>
                            </div>
                          )}
                       </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 max-w-[1600px] mx-auto">
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Chart */}
                      <div className="lg:col-span-2 bg-[#09090b] p-8 rounded-[2rem] border border-white/[0.05] shadow-2xl relative overflow-hidden">
                         <div className="flex justify-between items-center mb-10">
                            <div>
                               <h3 className="text-xl font-bold flex items-center gap-3 italic">
                                  <TrendingUp className="text-[#39ff14]" size={24} /> Flux des Prospects
                               </h3>
                               <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Volume hebdomadaire</p>
                            </div>
                            <div className="flex gap-2">
                               {['7j', '30j', '1an'].map(t => (
                                 <button key={t} className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${t === '7j' ? 'bg-[#39ff14] text-black border-[#39ff14]' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'}`}>
                                    {t}
                                 </button>
                               ))}
                            </div>
                         </div>
                         
                         <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={CHART_DATA}>
                                  <defs>
                                     <linearGradient id="colorLeads" x1="0" x1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#39ff14" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#39ff14" stopOpacity={0}/>
                                     </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#ffffff20', fontSize: 10}} dy={10} />
                                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#ffffff20', fontSize: 10}} />
                                  <Tooltip 
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#39ff14', fontSize: '12px', fontWeight: 'bold' }}
                                  />
                                  <Area type="monotone" dataKey="leads" stroke="#39ff14" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={3} />
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </div>

                      {/* Side Stats */}
                      <div className="space-y-8">
                         <div className="bg-[#09090b] p-8 rounded-[2rem] border border-white/[0.05] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#39ff14]/5 blur-[60px] -mr-16 -mt-16" />
                            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Taux de Conversion</h4>
                            <div className="flex items-center justify-between">
                               <h2 className="text-4xl font-heading font-bold">24.8%</h2>
                               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10 group-hover:scale-110 transition-transform">
                                  <ArrowUpRight size={24} />
                               </div>
                            </div>
                            <p className="text-[10px] text-emerald-500 font-bold mt-4">+2.4% <span className="text-white/20">vs mois dernier</span></p>
                         </div>

                         <div className="bg-[#09090b] p-8 rounded-[2rem] border border-white/[0.05] relative overflow-hidden group">
                            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-6">Canaux de Trafic</h4>
                            <div className="space-y-4">
                               {[
                                 { name: 'Recherche Google', p: 45, c: '#39ff14' },
                                 { name: 'Instagram Ads', p: 30, c: '#3b82f6' },
                                 { name: 'Direct / Referral', p: 25, c: '#a855f7' }
                               ].map(c => (
                                 <div key={c.name} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase">
                                       <span className="text-white/40">{c.name}</span>
                                       <span className="text-white">{c.p}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                       <motion.div initial={{ width: 0 }} animate={{ width: `${c.p}%` }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ backgroundColor: c.c }} />
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 max-w-[1600px] mx-auto">
                   <div className="bg-[#09090b] p-8 rounded-[2rem] border border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                      <div>
                        <h3 className="text-2xl font-bold flex items-center gap-4 italic"><UserCheck className="text-[#39ff14]" size={28} /> Accès Équipe</h3>
                        <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">Gestion des privilèges administrateur</p>
                      </div>
                      <button onClick={() => setIsAdminModalOpen(true)} className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#39ff14] transition-all active:scale-95 shadow-xl shadow-white/5">
                         Nouvel Admin
                      </button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {admins.map(admin => (
                        <div key={admin.id} className="bg-[#09090b] p-8 rounded-[2rem] border border-white/[0.05] flex flex-col items-center text-center group hover:border-[#39ff14]/30 transition-all">
                           <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-[#39ff14]/10 group-hover:text-[#39ff14] transition-all duration-500 mb-6 border border-white/5">
                              <Users size={24} />
                           </div>
                           <h5 className="font-bold text-base mb-1">{admin.name}</h5>
                           <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-8">Administrateur Senior</p>
                           <button onClick={() => handleDeleteAdmin(admin.id)} className="p-3 rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-red-500/5 hover:border-red-500/20">
                              <Trash2 size={16} />
                           </button>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-[1000px] mx-auto w-full">
                   <SettingsView />
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
         {isAdminModalOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-lg bg-[#09090b] border border-white/10 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#39ff14]/5 blur-[80px] -mr-24 -mt-24" />
                 <h3 className="text-2xl font-bold italic mb-8">Nouveau Profil Admin</h3>
                 <form onSubmit={handleAddAdmin} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                       <input required type="text" value={adminFormData.name} onChange={e => setAdminFormData(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#39ff14]/50 transition-all outline-none" placeholder="Ex: Karim Ben" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Code d'accès sécurisé</label>
                       <input required type="password" value={adminFormData.passcode} onChange={e => setAdminFormData(p => ({ ...p, passcode: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#39ff14]/50 transition-all outline-none" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-[#39ff14] text-black font-bold rounded-2xl shadow-xl shadow-[#39ff14]/10 hover:scale-[1.02] active:scale-95 transition-all">
                       Créer l'Accès
                    </button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  )
}
