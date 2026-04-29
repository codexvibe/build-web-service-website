'use client'

import React, { useState, useEffect, useTransition, useMemo } from 'react'
import { 
  Trash2, CheckCircle2, Clock, Users, BarChart3, 
  MessageSquare, MapPin, Calendar, DollarSign, 
  ArrowRight, Shield, Search, Filter, MoreHorizontal,
  Mail, Phone, ExternalLink, LogOut, LayoutDashboard,
  Settings, Bell, Plus, FileText, TrendingUp,
  X, ChevronRight, Activity, Zap
} from 'lucide-react'
import { 
  getServiceRequestsAction, updateRequestStatusAction, deleteRequestAction,
  getAgencyStatsAction, getAdminsAction, addAdminAction, deleteAdminAction,
  logoutAction
} from '../actions'
import { motion, AnimatePresence } from 'framer-motion'

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

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-brand/30 selection:text-brand font-sans overflow-hidden flex flex-col md:flex-row">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-24 lg:w-72 bg-[#0f1117] border-r border-white/5 flex flex-col z-50">
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center shadow-2xl shadow-brand/20">
            <Shield size={24} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-display font-bold text-xl tracking-tight">Agency<span className="text-brand">Hub</span></h1>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Admin Control</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {[
            { id: 'requests', label: 'Leads & Demandes', icon: MessageSquare },
            { id: 'stats', label: 'Analytiques', icon: Activity },
            { id: 'team', label: 'Équipe Interne', icon: Users },
            { id: 'settings', label: 'Configuration', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-brand text-white shadow-xl shadow-brand/10' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-brand transition-colors'} />
              <span className="hidden lg:inline text-[13px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6">
           <button 
             onClick={async () => { await logoutAction(); window.location.href = '/admin'; }}
             className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-bold group"
           >
             <LogOut size={20} />
             <span className="hidden lg:inline text-[13px]">Déconnexion</span>
           </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar bg-[#0a0c10]">
        
        {/* Top Header Blur */}
        <header className="sticky top-0 z-40 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-display font-bold tracking-tight">
                {activeTab === 'requests' && 'Gestion des Demandes'}
                {activeTab === 'stats' && 'Statistiques de l\'Agence'}
                {activeTab === 'team' && 'Équipe Administrative'}
                {activeTab === 'settings' && 'Paramètres Système'}
              </h2>
           </div>

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
                <motion.div 
                  key="requests" 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Leads', val: requests.length, icon: MessageSquare, color: 'brand' },
                      { label: 'En Attente', val: requests.filter(r => r.status === 'pending').length, icon: Clock, color: 'amber-500' },
                      { label: 'Terminés', val: requests.filter(r => r.status === 'completed').length, icon: CheckCircle2, color: 'emerald-500' },
                      { label: 'Revenue Est.', val: `${requests.reduce((acc, r) => acc + parseFloat(String(r.budget || '0').replace(/[^0-9.]/g, '')), 0).toLocaleString()} DA`, icon: Zap, color: 'brand' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#0f1117] p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}/5 blur-[40px] rounded-full -mr-8 -mt-8`} />
                        <div className="flex items-center gap-6 relative z-10">
                          <div className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                            <stat.icon size={28} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <h4 className="text-2xl font-display font-bold text-white">{stat.val}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Filter Bar */}
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
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                       <select 
                         value={filterStatus}
                         onChange={e => setFilterStatus(e.target.value)}
                         className="flex-1 lg:w-48 bg-white/5 border border-white/5 rounded-xl py-4 px-6 text-sm text-white/60 cursor-pointer focus:border-brand/50 transition-all"
                       >
                         <option value="all">Tous les Statuts</option>
                         <option value="pending">⏳ En Attente</option>
                         <option value="contacted">📞 Contacté</option>
                         <option value="in_progress">⚙️ En Cours</option>
                         <option value="completed">✅ Terminé</option>
                       </select>
                    </div>
                  </div>

                  {/* Main Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* List */}
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

                    {/* Detail Panel */}
                    <div className="lg:col-span-8 xl:col-span-7">
                       {selectedRequest ? (
                         <motion.div 
                           initial={{ opacity: 0, scale: 0.95 }} 
                           animate={{ opacity: 1, scale: 1 }}
                           className="bg-[#0f1117] rounded-[2.5rem] border border-white/10 p-10 lg:p-14 shadow-2xl relative overflow-hidden"
                         >
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
                            
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12 relative z-10">
                               <div>
                                  <span className="text-[10px] font-bold text-brand uppercase tracking-[0.3em] mb-4 block">Fiche Client Détaillée</span>
                                  <h3 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">{selectedRequest.full_name}</h3>
                                  <div className="flex flex-wrap gap-3">
                                     <span className="px-4 py-2 bg-brand/10 text-brand text-[10px] font-bold rounded-xl border border-brand/20 uppercase tracking-widest">{selectedRequest.service_type}</span>
                                     <span className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-bold rounded-xl border border-white/5 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={14} /> {new Date(selectedRequest.created_at).toLocaleString()}
                                     </span>
                                  </div>
                               </div>
                               <div className="flex gap-3">
                                  <button onClick={() => handleDeleteRequest(selectedRequest.id)} className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                                     <Trash2 size={20} />
                                  </button>
                                  <button onClick={() => setSelectedRequest(null)} className="w-12 h-12 rounded-2xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 sm:hidden">
                                     <X size={20} />
                                  </button>
                               </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 relative z-10">
                               {[
                                 { label: 'Contact Client', val: selectedRequest.contact_info, icon: Phone, sub: 'WhatsApp / Direct' },
                                 { label: 'Localisation', val: selectedRequest.location, icon: MapPin, sub: 'Ville du Client' },
                                 { label: 'Date Souhaitée', val: selectedRequest.preferred_date || 'ASAP', icon: Calendar, sub: 'Planning Souhaité' },
                                 { label: 'Budget Indicatif', val: selectedRequest.budget, icon: DollarSign, sub: 'Total Calculé' },
                               ].map((info, i) => (
                                 <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-brand/30 transition-all group">
                                    <div className="flex items-center gap-4 mb-4">
                                       <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                                          <info.icon size={18} />
                                       </div>
                                       <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{info.label}</span>
                                    </div>
                                    <div className="text-base font-bold text-white truncate">{info.val}</div>
                                    <div className="text-[9px] text-white/10 uppercase font-bold mt-1">{info.sub}</div>
                                 </div>
                               ))}
                            </div>

                            <div className="space-y-10 mb-14 relative z-10">
                               <div className="space-y-4">
                                  <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-3">
                                     <Zap size={14} className="text-brand" /> Options Sélectionnées
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                     {selectedRequest.urgency ? selectedRequest.urgency.split(',').map((opt, i) => (
                                       <span key={i} className="px-4 py-2 bg-white/5 text-[11px] font-bold rounded-xl border border-white/5 text-white/70">
                                          {opt.trim()}
                                       </span>
                                     )) : <p className="text-xs text-white/20 italic">Aucune option supplémentaire</p>}
                                  </div>
                               </div>
                               <div className="space-y-4">
                                  <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-3">
                                     <FileText size={14} className="text-brand" /> Description du Projet
                                  </h4>
                                  <div className="bg-white/5 p-8 rounded-3xl border border-white/5 text-[13px] text-white/60 leading-relaxed font-sans whitespace-pre-wrap">
                                     {selectedRequest.description}
                                  </div>
                               </div>
                            </div>

                            <div className="flex flex-col xl:flex-row gap-6 pt-10 border-t border-white/5 relative z-10">
                               <div className="flex-1 space-y-4">
                                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Modifier le Statut</p>
                                  <div className="flex flex-wrap gap-2">
                                     {[
                                       { s: 'contacted', l: 'Contacté', c: 'blue' },
                                       { s: 'in_progress', l: 'En Cours', c: 'brand' },
                                       { s: 'completed', l: 'Terminé', c: 'emerald' },
                                     ].map(st => (
                                       <button 
                                         key={st.s}
                                         onClick={() => handleUpdateStatus(selectedRequest.id, st.s)}
                                         className={`px-5 py-2.5 text-[11px] font-bold rounded-xl border transition-all ${
                                           selectedRequest.status === st.s 
                                           ? `bg-${st.c}-500 text-white border-transparent` 
                                           : `bg-white/5 border-white/5 text-white/40 hover:border-white/20`
                                         }`}
                                       >
                                          {st.l}
                                       </button>
                                     ))}
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <a 
                                    href={`https://wa.me/${selectedRequest.contact_info.replace(/[^0-9]/g, '')}`} 
                                    target="_blank"
                                    className="btn-brand px-10 py-5 rounded-2xl flex items-center gap-3 shadow-2xl shadow-brand/20 active:scale-95 transition-all"
                                  >
                                     Lancer WhatsApp <ExternalLink size={18} />
                                  </a>
                               </div>
                            </div>
                         </motion.div>
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
                            <BarChart3 className="text-brand" size={24} /> Distribution des Revenus par Service
                         </h3>
                         <div className="space-y-8">
                            {[
                               { l: 'Site Vitrine', id: 'vitrine' },
                               { l: 'E-commerce', id: 'ecommerce' },
                               { l: 'Web Apps', id: 'application' },
                               { l: 'SEO', id: 'seo' }
                            ].map(item => {
                               const count = requests.filter(r => r.service_type.toLowerCase().includes(item.id)).length
                               const percent = requests.length ? (count / requests.length) * 100 : 0
                               return (
                                 <div key={item.id} className="space-y-3">
                                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                                       <span className="text-white/40">{item.l}</span>
                                       <span className="text-brand">{count} leads</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ width: 0 }} 
                                         animate={{ width: `${percent}%` }}
                                         className="h-full bg-brand rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                                       />
                                    </div>
                                 </div>
                               )
                            })}
                         </div>
                      </div>
                      
                      <div className="bg-[#0f1117] p-10 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center">
                         <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 text-white/10 group hover:bg-brand/10 hover:text-brand transition-all duration-500">
                            <TrendingUp size={40} />
                         </div>
                         <h4 className="text-xl font-display font-bold text-white/40 mb-2">Performances Temporelles</h4>
                         <p className="text-[10px] text-white/10 font-bold uppercase tracking-widest max-w-[280px]">
                            Les tendances de conversion seront activées automatiquement dès 20 demandes enregistrées.
                         </p>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                   <div className="bg-[#0f1117] p-10 rounded-[3rem] border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                      <div>
                         <h3 className="text-3xl font-display font-bold">Équipe Administrative</h3>
                         <p className="text-white/30 text-sm mt-1">Gérez les accès collaborateurs de votre agence.</p>
                      </div>
                      <button 
                        onClick={() => setIsAdminModalOpen(true)}
                        className="btn-brand px-10 py-5 rounded-2xl flex items-center gap-3 shadow-2xl shadow-brand/20 active:scale-95 transition-all"
                      >
                         <Plus size={20} /> Nouvel Administrateur
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {admins.map(admin => (
                        <div key={admin.id} className="bg-[#0f1117] p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:border-brand/30 transition-all">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-brand group-hover:text-white transition-all duration-500">
                                 <Users size={24} />
                              </div>
                              <div>
                                 <h5 className="font-display font-bold text-lg">{admin.name}</h5>
                                 <div className="flex items-center gap-2 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <span className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest">Actif</span>
                                 </div>
                              </div>
                           </div>
                           <button onClick={() => handleDeleteAdmin(admin.id)} className="w-12 h-12 rounded-xl text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20">
                              <Trash2 size={20} />
                           </button>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>

      {/* --- MODAL --- */}
      <AnimatePresence>
         {isAdminModalOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="w-full max-w-md bg-[#0f1117] border border-white/10 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-40 h-40 bg-brand/10 blur-[80px] -mr-20 -mt-20" />
                 <h3 className="text-3xl font-display font-bold mb-2">Ajouter un Admin</h3>
                 <p className="text-white/30 text-sm mb-12">Sécurisez l'accès à votre agence.</p>
                 
                 <form onSubmit={handleAddAdmin} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Nom du Collaborateur</label>
                       <input 
                         required 
                         type="text" 
                         value={adminFormData.name} 
                         onChange={e => setAdminFormData(prev => ({ ...prev, name: e.target.value }))}
                         className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-brand/50 transition-all outline-none"
                         placeholder="Ex: Mohamed Ali"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Code d'accès Privé</label>
                       <input 
                         required 
                         type="password" 
                         value={adminFormData.passcode} 
                         onChange={e => setAdminFormData(prev => ({ ...prev, passcode: e.target.value }))}
                         className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-brand/50 transition-all outline-none"
                         placeholder="••••••••"
                       />
                    </div>
                    <button type="submit" className="btn-brand w-full py-5 rounded-2xl uppercase tracking-[0.2em] text-xs font-bold shadow-2xl shadow-brand/20 mt-6">Créer l'accès</button>
                    <button type="button" onClick={() => setIsAdminModalOpen(false)} className="w-full text-center text-[10px] font-bold text-white/20 uppercase tracking-widest mt-4 hover:text-white transition-colors">Annuler</button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  )
}
