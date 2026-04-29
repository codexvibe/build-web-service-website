'use client'

import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { 
  Search, Bell, Plus, Users, Trash2, LayoutDashboard, Activity, Settings
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
    <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-brand/30 selection:text-brand font-sans overflow-hidden flex flex-col md:flex-row">
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={async () => { await logoutAction(); window.location.href = '/admin'; }} />

      <main className="flex-1 relative overflow-y-auto custom-scrollbar bg-[#0a0c10]">
        <header className="sticky top-0 z-40 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-10 py-8 flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center lg:hidden">
                 <LayoutDashboard size={24} className="text-brand" />
              </div>
              <h2 className="text-3xl font-display font-bold tracking-tight">
                {activeTab === 'requests' && 'Gestion des Demandes'}
                {activeTab === 'stats' && 'Statistiques de l\'Agence'}
                {activeTab === 'team' && 'Équipe Administrative'}
                {activeTab === 'settings' && 'Configuration Système'}
              </h2>
           </div>

           <div className="flex items-center gap-8">
              <div className="hidden xl:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Serveur Opérationnel (DZ)</span>
              </div>
              <div className="h-10 w-px bg-white/10 mx-2" />
              <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all hover:border-brand/50 group">
                 <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                 <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand rounded-full border-2 border-[#0a0c10]" />
              </button>
           </div>
        </header>

        <div className="p-10 lg:p-14 2xl:p-20 w-full max-w-full">
           <AnimatePresence mode="wait">
              {activeTab === 'requests' && (
                <motion.div key="requests" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                  <StatsOverview 
                    totalLeads={requests.length} 
                    pendingLeads={requests.filter(r => r.status === 'pending').length}
                    completedLeads={requests.filter(r => r.status === 'completed').length}
                    totalRevenue={`${totalEstimatedRevenue.toLocaleString()} DA`}
                  />

                  <div className="bg-[#0f1117] p-4 rounded-4xl border border-white/5 flex flex-col lg:flex-row gap-6 items-center shadow-2xl">
                    <div className="relative flex-1 w-full">
                       <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                       <input 
                         type="text" 
                         placeholder="Rechercher un client, un service ou une localisation..."
                         value={searchTerm}
                         onChange={e => setSearchTerm(e.target.value)}
                         className="w-full bg-transparent border-none focus:ring-0 text-base py-5 pl-20 text-white placeholder:text-white/20"
                       />
                    </div>
                    <div className="flex gap-4 w-full lg:w-auto">
                      <select 
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="flex-1 lg:w-60 bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm font-bold text-white/60 cursor-pointer focus:border-brand/50 transition-all outline-none"
                      >
                        <option value="all">Tous les Statuts</option>
                        <option value="pending">⏳ En Attente</option>
                        <option value="contacted">📞 Contacté</option>
                        <option value="in_progress">⚙️ En Cours</option>
                        <option value="completed">✅ Terminé</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-4 xl:col-span-4 space-y-4 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
                       {filteredRequests.map(req => (
                         <button
                           key={req.id}
                           onClick={() => setSelectedRequest(req)}
                           className={`w-full text-left p-8 rounded-4xl transition-all duration-500 border group relative overflow-hidden ${
                             selectedRequest?.id === req.id 
                             ? 'bg-brand/10 border-brand shadow-2xl shadow-brand/10' 
                             : 'bg-[#0f1117] border-white/5 hover:border-white/20 hover:scale-[1.02]'
                           }`}
                         >
                            <div className="flex justify-between items-start mb-6">
                               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${
                                 selectedRequest?.id === req.id ? 'bg-brand text-white' : 'bg-white/10 text-white/60 group-hover:bg-brand/20 group-hover:text-brand'
                               }`}>
                                 {req.full_name.charAt(0).toUpperCase()}
                               </div>
                               <span className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-[0.15em] ${
                                 req.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                 req.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                               }`}>
                                 {req.status}
                               </span>
                            </div>
                            <h5 className="font-display font-bold text-xl mb-2 group-hover:text-brand transition-colors">{req.full_name}</h5>
                            <div className="flex items-center gap-3">
                               <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest">{req.service_type}</p>
                               <span className="w-1 h-1 rounded-full bg-white/10" />
                               <p className="text-[11px] text-white/20 font-bold">{req.location}</p>
                            </div>
                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                               <span className="text-sm font-bold text-white/80">{req.budget}</span>
                               <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{new Date(req.created_at).toLocaleDateString()}</span>
                            </div>
                         </button>
                       ))}
                    </div>

                    <div className="lg:col-span-8 xl:col-span-8">
                       {selectedRequest ? (
                         <LeadDetails lead={selectedRequest} onDelete={handleDeleteRequest} onClose={() => setSelectedRequest(null)} onUpdateStatus={handleUpdateStatus} />
                       ) : (
                         <div className="h-[800px] flex items-center justify-center bg-[#0f1117]/50 rounded-[3.5rem] border-2 border-dashed border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="text-center space-y-8 relative z-10">
                               <div className="w-32 h-32 rounded-[2.5rem] bg-brand/5 border border-brand/10 flex items-center justify-center mx-auto text-brand/20 group-hover:text-brand/40 group-hover:scale-110 transition-all duration-700">
                                  <LayoutDashboard size={64} />
                               </div>
                               <div className="space-y-4">
                                  <h3 className="text-2xl font-display font-bold text-white/40">Visualiseur de Projet Pro</h3>
                                  <p className="text-[11px] text-white/10 font-bold uppercase tracking-[0.4em] max-w-[320px] mx-auto leading-loose">
                                     Sélectionnez un dossier client pour accéder à l'interface de gestion prioritaire.
                                  </p>
                               </div>
                               <div className="flex justify-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand/20" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand/40" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand/20" />
                               </div>
                            </div>
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div key="stats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                      <div className="bg-[#0f1117] p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 left-0 w-64 h-64 bg-brand/10 blur-[100px] -ml-32 -mt-32" />
                         <h3 className="text-3xl font-display font-bold mb-14 flex items-center gap-6">
                            <Activity className="text-brand" size={32} /> Performance par Service
                         </h3>
                         <div className="space-y-10">
                            {['vitrine', 'ecommerce', 'application', 'seo'].map(id => {
                               const count = requests.filter(r => r.service_type.toLowerCase().includes(id)).length
                               const percent = requests.length ? (count / requests.length) * 100 : 0
                               return (
                                 <div key={id} className="space-y-4">
                                    <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-[0.2em]">
                                       <span className="text-white/40">{id}</span>
                                       <span className="text-brand">{count} Leads</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                       <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-brand rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                                    </div>
                                 </div>
                               )
                            })}
                         </div>
                      </div>
                      <div className="bg-[#0f1117] p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                         <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand/5 blur-[80px] -mr-24 -mb-24" />
                         <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-white/10 mb-8 border border-white/5"><Activity size={40} /></div>
                         <h4 className="text-2xl font-display font-bold text-white/40 mb-4">Graphiques de Croissance</h4>
                         <p className="text-[11px] text-white/10 font-bold uppercase tracking-[0.3em] max-w-[320px] leading-loose">Activation automatique dès que le volume de données atteint 50 entrées.</p>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                   <div className="bg-[#0f1117] p-12 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
                      <div>
                        <h3 className="text-4xl font-display font-bold mb-2">Gestion d'Équipe</h3>
                        <p className="text-white/30 text-sm">Administrez les accès et rôles de votre équipe.</p>
                      </div>
                      <button onClick={() => setIsAdminModalOpen(true)} className="btn-brand px-12 py-6 rounded-3xl flex items-center gap-4 text-lg active:scale-95 transition-all"><Plus size={24} /> Nouvel Administrateur</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {admins.map(admin => (
                        <div key={admin.id} className="bg-[#0f1117] p-10 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center group transition-all hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5">
                           <div className="w-20 h-20 rounded-4xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-brand group-hover:text-white transition-all duration-500 mb-6 shadow-xl"><Users size={32} /></div>
                           <h5 className="font-display font-bold text-xl mb-1">{admin.name}</h5>
                           <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-8">Administrateur Senior</p>
                           <button onClick={() => handleDeleteAdmin(admin.id)} className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20"><Trash2 size={20} /></button>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                   <SettingsView />
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
         {isAdminModalOpen && (
           <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-lg bg-[#0f1117] border border-white/10 p-14 rounded-3xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand/10 blur-[80px] -mr-24 -mt-24" />
                 <h3 className="text-4xl font-display font-bold mb-10">Accès Équipe</h3>
                 <form onSubmit={handleAddAdmin} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Nom Complet</label>
                       <input required type="text" value={adminFormData.name} onChange={e => setAdminFormData(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-10 text-white focus:border-brand transition-all outline-none" placeholder="Ex: Jean Dupont" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] ml-2">Code d'accès sécurisé</label>
                       <input required type="password" value={adminFormData.passcode} onChange={e => setAdminFormData(p => ({ ...p, passcode: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-10 text-white focus:border-brand transition-all outline-none" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn-brand w-full py-6 rounded-3xl font-bold text-lg mt-4 shadow-2xl shadow-brand/20">Valider l'Accès</button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  )
}
