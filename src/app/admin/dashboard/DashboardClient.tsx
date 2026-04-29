'use client'

import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { 
  Search, Bell, Plus, Users, Trash2, LayoutDashboard, Activity
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
        <header className="sticky top-0 z-40 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex items-center justify-between">
           <h2 className="text-2xl font-display font-bold tracking-tight">
             {activeTab === 'requests' && 'Gestion des Demandes'}
             {activeTab === 'stats' && 'Statistiques de l\'Agence'}
             {activeTab === 'team' && 'Équipe Administrative'}
             {activeTab === 'settings' && 'Paramètres Système'}
           </h2>

           <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Système Opérationnel</span>
              </div>
              <div className="h-8 w-px bg-white/5 mx-2" />
              <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand rounded-full" />
              </button>
           </div>
        </header>

        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
           <AnimatePresence mode="wait">
              {activeTab === 'requests' && (
                <motion.div key="requests" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                  <StatsOverview 
                    totalLeads={requests.length} 
                    pendingLeads={requests.filter(r => r.status === 'pending').length}
                    completedLeads={requests.filter(r => r.status === 'completed').length}
                    totalRevenue={`${totalEstimatedRevenue.toLocaleString()} DA`}
                  />

                  <div className="bg-[#0f1117] p-3 rounded-[1.5rem] border border-white/5 flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                       <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                         type="text" 
                         placeholder="Rechercher par nom, service ou client..."
                         value={searchTerm}
                         onChange={e => setSearchTerm(e.target.value)}
                         className="w-full bg-transparent border-none focus:ring-0 text-sm py-4 pl-16 text-white placeholder:text-white/20"
                       />
                    </div>
                    <select 
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      className="lg:w-48 bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm text-white/60 cursor-pointer focus:border-brand/50 transition-all"
                    >
                      <option value="all">Tous les Statuts</option>
                      <option value="pending">⏳ En Attente</option>
                      <option value="contacted">📞 Contacté</option>
                      <option value="in_progress">⚙️ En Cours</option>
                      <option value="completed">✅ Terminé</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 xl:col-span-5 space-y-4">
                       {filteredRequests.map(req => (
                         <button
                           key={req.id}
                           onClick={() => setSelectedRequest(req)}
                           className={`w-full text-left p-6 rounded-3xl transition-all duration-300 border group ${
                             selectedRequest?.id === req.id 
                             ? 'bg-brand/10 border-brand shadow-2xl shadow-brand/5' 
                             : 'bg-[#0f1117] border-white/5 hover:border-white/20'
                           }`}
                         >
                            <div className="flex justify-between items-start mb-4">
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                                 selectedRequest?.id === req.id ? 'bg-brand text-white' : 'bg-white/5 text-white/40'
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
                            <h5 className="font-display font-bold text-lg mb-1 group-hover:text-brand transition-colors">{req.full_name}</h5>
                            <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest">{req.service_type}</p>
                            <div className="mt-6 flex items-center justify-between">
                               <span className="text-xs font-bold text-white/60">{req.budget}</span>
                               <span className="text-[10px] text-white/20 font-bold">{new Date(req.created_at).toLocaleDateString()}</span>
                            </div>
                         </button>
                       ))}
                    </div>

                    <div className="lg:col-span-8 xl:col-span-7">
                       {selectedRequest ? (
                         <LeadDetails lead={selectedRequest} onDelete={handleDeleteRequest} onClose={() => setSelectedRequest(null)} onUpdateStatus={handleUpdateStatus} />
                       ) : (
                         <div className="h-[700px] flex items-center justify-center bg-[#0f1117]/50 rounded-[3rem] border-2 border-dashed border-white/5">
                            <div className="text-center space-y-6">
                               <div className="w-24 h-24 rounded-full bg-brand/5 flex items-center justify-center mx-auto text-brand/20">
                                  <LayoutDashboard size={48} />
                               </div>
                               <h3 className="text-xl font-display font-bold text-white/40">Visualiseur de Projet</h3>
                               <p className="text-[10px] text-white/10 font-bold uppercase tracking-[0.3em] max-w-[280px] mx-auto leading-loose">
                                  Sélectionnez un lead à gauche pour afficher les détails complets et agir.
                               </p>
                            </div>
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div key="stats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="bg-[#0f1117] p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-32 h-32 bg-brand/10 blur-[60px] -ml-16 -mt-16" />
                         <h3 className="text-2xl font-display font-bold mb-12 flex items-center gap-4">
                            <Activity className="text-brand" size={24} /> Distribution par Service
                         </h3>
                         <div className="space-y-8">
                            {['vitrine', 'ecommerce', 'application', 'seo'].map(id => {
                               const count = requests.filter(r => r.service_type.toLowerCase().includes(id)).length
                               const percent = requests.length ? (count / requests.length) * 100 : 0
                               return (
                                 <div key={id} className="space-y-3">
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                                       <span className="text-white/40">{id}</span>
                                       <span className="text-brand">{count} leads</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} className="h-full bg-brand rounded-full" /></div>
                                 </div>
                               )
                            })}
                         </div>
                      </div>
                      <div className="bg-[#0f1117] p-10 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center">
                         <h4 className="text-xl font-display font-bold text-white/40 mb-2">Performances Temporelles</h4>
                         <p className="text-[10px] text-white/10 font-bold uppercase tracking-widest max-w-[280px]">Automatiquement activé dès 20 demandes.</p>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                   <div className="bg-[#0f1117] p-10 rounded-[3rem] border border-white/5 flex justify-between items-center">
                      <h3 className="text-3xl font-display font-bold">Équipe</h3>
                      <button onClick={() => setIsAdminModalOpen(true)} className="btn-brand px-10 py-5 rounded-2xl flex items-center gap-3"><Plus size={20} /> Nouveau</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {admins.map(admin => (
                        <div key={admin.id} className="bg-[#0f1117] p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between group">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-brand group-hover:text-white transition-all"><Users size={24} /></div>
                              <h5 className="font-display font-bold text-lg">{admin.name}</h5>
                           </div>
                           <button onClick={() => handleDeleteAdmin(admin.id)} className="text-white/20 hover:text-red-500 transition-all"><Trash2 size={20} /></button>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
         {isAdminModalOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-[#0f1117] border border-white/10 p-12 rounded-[3rem] shadow-2xl relative">
                 <h3 className="text-3xl font-display font-bold mb-8">Ajouter un Admin</h3>
                 <form onSubmit={handleAddAdmin} className="space-y-6">
                    <input required type="text" value={adminFormData.name} onChange={e => setAdminFormData(p => ({ ...p, name: e.target.value }))} className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white" placeholder="Nom" />
                    <input required type="password" value={adminFormData.passcode} onChange={e => setAdminFormData(p => ({ ...p, passcode: e.target.value }))} className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white" placeholder="Passcode" />
                    <button type="submit" className="btn-brand w-full py-5 rounded-2xl font-bold">Créer</button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  )
}
