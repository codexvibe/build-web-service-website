'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { 
  Trash2, CheckCircle2, Clock, Users, BarChart3, 
  MessageSquare, MapPin, Calendar, DollarSign, 
  ArrowRight, Shield, Search, Filter, MoreHorizontal,
  Mail, Phone, ExternalLink, LogOut, LayoutDashboard,
  Settings, Bell, Plus, FileText, TrendingUp
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

  const fetchRequests = async () => {
    const result = await getServiceRequestsAction()
    if (result.data) setRequests(result.data as ServiceRequest[])
  }

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

  const handleLogout = async () => {
    await logoutAction()
    window.location.href = '/admin'
  }

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || r.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-brand/30 selection:text-brand dark">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-white/5 z-60 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-bold text-white shadow-lg shadow-brand/20">A</div>
             <span className="font-display font-bold text-lg tracking-tight">Agency<span className="text-brand">Hub</span></span>
           </div>
           
           <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
             <span className="px-3 py-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 rounded-md border border-emerald-400/20 flex items-center gap-1">
               <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> LIVE LEADS
             </span>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <button className="w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-white/60 transition-colors relative">
             <Bell size={20} />
             <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand rounded-full border-2 border-surface" />
           </button>
           <div className="h-6 w-px bg-white/10 mx-2" />
           <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-xs border border-red-500/20">
             <LogOut size={16} /> <span className="hidden sm:inline">Déconnexion</span>
           </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="pt-16 flex h-screen overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-20 lg:w-64 border-r border-white/5 bg-surface/50 p-4 flex flex-col justify-between">
           <nav className="space-y-2">
             {[
               { id: 'requests', label: 'Demandes', icon: MessageSquare },
               { id: 'stats', label: 'Analytiques', icon: BarChart3 },
               { id: 'team', label: 'Équipe Admin', icon: Users },
               { id: 'settings', label: 'Paramètres', icon: Settings },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                   activeTab === tab.id 
                   ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                   : 'text-white/40 hover:bg-white/5 hover:text-white'
                 }`}
               >
                 <tab.icon size={20} className="shrink-0" />
                 <span className="hidden lg:inline text-sm">{tab.label}</span>
               </button>
             ))}
           </nav>

           <div className="p-4 bg-brand/5 rounded-2xl border border-brand/10 hidden lg:block">
              <div className="flex items-center gap-2 mb-3">
                 <TrendingUp size={16} className="text-brand" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-brand">Croissance</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">Votre agence a généré <span className="text-white font-bold">+12%</span> de leads ce mois-ci.</p>
           </div>
        </aside>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
           
           <div className="max-w-6xl mx-auto space-y-10 pb-20">
              
              <AnimatePresence mode="wait">
                 {activeTab === 'requests' && (
                    <motion.div key="requests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                       
                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h1 className="text-3xl font-display font-bold">Gestion des Leads</h1>
                            <p className="text-white/40 text-sm mt-1">Gérez et suivez les demandes de vos clients potentiels.</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                             <div className="flex -space-x-2">
                               {[1,2,3].map(i => (
                                 <div key={i} className="w-8 h-8 rounded-full border-2 border-bg bg-surface flex items-center justify-center text-[10px] font-bold">
                                   {String.fromCharCode(64 + i)}
                                 </div>
                               ))}
                             </div>
                             <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">3 Admins en ligne</div>
                          </div>
                       </div>

                       {/* Stats Row */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                            { label: 'Total Leads', val: requests.length, icon: MessageSquare, color: 'brand' },
                            { label: 'En Attente', val: requests.filter(r => r.status === 'pending').length, icon: Clock, color: 'amber-500' },
                            { label: 'Terminés', val: requests.filter(r => r.status === 'completed').length, icon: CheckCircle2, color: 'emerald-500' },
                            { label: 'Revenue Est.', val: `${requests.reduce((acc, r) => acc + parseFloat(String(r.budget || '0').replace(/[^0-9.]/g, '')), 0).toLocaleString()} DA`, icon: DollarSign, color: 'brand' },
                          ].map((stat, i) => (
                            <div key={i} className="bg-surface p-6 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors group">
                               <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color} group-hover:scale-110 transition-transform`}>
                                 <stat.icon size={24} />
                               </div>
                               <div>
                                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</div>
                                 <div className="text-xl font-display font-bold">{stat.val}</div>
                               </div>
                            </div>
                          ))}
                       </div>

                       {/* Search & Filter */}
                       <div className="flex flex-col md:flex-row gap-4 items-center bg-surface p-2 rounded-2xl border border-white/5">
                          <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input 
                              type="text" 
                              placeholder="Rechercher un client ou un service..."
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                              className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 pl-12 placeholder:text-white/20"
                            />
                          </div>
                          <div className="h-8 w-px bg-white/5 hidden md:block" />
                          <select 
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm py-3 px-6 text-white/60 cursor-pointer"
                          >
                            <option value="all">Tous les statuts</option>
                            <option value="pending">En attente</option>
                            <option value="contacted">Contacté</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminé</option>
                          </select>
                       </div>

                       {/* List and Detail Split */}
                       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                          <div className={`xl:col-span-5 space-y-4 ${selectedRequest ? 'hidden xl:block' : 'block'}`}>
                            {filteredRequests.map(request => (
                              <div 
                                key={request.id}
                                onClick={() => setSelectedRequest(request)}
                                className={`group p-5 cursor-pointer rounded-2xl transition-all border ${selectedRequest?.id === request.id ? 'bg-brand/10 border-brand shadow-lg shadow-brand/5' : 'bg-surface border-white/5 hover:border-white/20'}`}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-display font-bold text-base group-hover:text-brand transition-colors">{request.full_name}</h4>
                                  <span className={`text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                                    request.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                    request.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                    'bg-brand/10 text-brand border border-brand/20'
                                  }`}>
                                    {request.status}
                                  </span>
                                </div>
                                <div className="text-[11px] text-white/40 font-bold flex items-center gap-2 mb-4 uppercase tracking-widest">
                                  <span className="text-brand/80">{request.service_type}</span>
                                  <span>•</span>
                                  <span>{new Date(request.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                  <span className="text-xs font-bold text-white/60">{request.budget}</span>
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                     <ArrowRight size={14} className="text-brand" />
                                  </div>
                                </div>
                              </div>
                            ))}
                            {filteredRequests.length === 0 && (
                              <div className="text-center py-20 bg-surface rounded-2xl border border-dashed border-white/10 text-white/20 italic">
                                 Aucune demande trouvée
                              </div>
                            )}
                          </div>

                          <div className={`xl:col-span-7 ${selectedRequest ? 'block' : 'hidden xl:block'}`}>
                            {selectedRequest ? (
                              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface p-8 rounded-3xl sticky top-4 border border-brand/30 shadow-2xl shadow-brand/5 overflow-hidden">
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand/5 blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                                
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                  <div>
                                    <button onClick={() => setSelectedRequest(null)} className="xl:hidden text-brand text-xs font-bold mb-6 flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                                      <ArrowRight size={14} className="rotate-180" /> Retour à la liste
                                    </button>
                                    <h3 className="text-4xl font-display font-bold tracking-tight mb-4">{selectedRequest.full_name}</h3>
                                    <div className="flex flex-wrap gap-3">
                                      <span className="px-4 py-1.5 bg-brand/10 text-brand text-[10px] font-bold rounded-full border border-brand/20 uppercase tracking-widest">{selectedRequest.service_type}</span>
                                      <span className="flex items-center gap-1.5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                        <Calendar size={14} /> {new Date(selectedRequest.created_at).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                     <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-all">
                                        <MoreHorizontal size={20} />
                                     </button>
                                     <button 
                                       onClick={() => handleDeleteRequest(selectedRequest.id)}
                                       className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                     >
                                       <Trash2 size={20} />
                                     </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 relative z-10">
                                   {[
                                     { label: 'Contact', val: selectedRequest.contact_info, icon: Phone, sub: 'WhatsApp / Mobile' },
                                     { label: 'Localisation', val: selectedRequest.location, icon: MapPin, sub: 'Ville / Wilaya' },
                                     { label: 'Date Souhaitée', val: selectedRequest.preferred_date || 'ASAP', icon: Calendar, sub: 'Planning Client' },
                                     { label: 'Budget Estimé', val: selectedRequest.budget, icon: DollarSign, sub: 'Calculateur Auto' },
                                   ].map((item, i) => (
                                     <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-3 mb-3">
                                           <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                                              <item.icon size={16} />
                                           </div>
                                           <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <div className="text-sm font-bold truncate">{item.val}</div>
                                        <div className="text-[9px] text-white/20 mt-1 uppercase font-bold">{item.sub}</div>
                                     </div>
                                   ))}
                                </div>

                                <div className="space-y-8 mb-12 relative z-10">
                                  <div>
                                    <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-4">Spécifications du Projet</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedRequest.urgency?.split(',').map((opt, i) => (
                                        <span key={i} className="px-4 py-2 bg-white/5 text-white/80 text-[11px] font-bold rounded-xl border border-white/10 hover:border-brand/30 transition-colors">
                                          {opt.trim()}
                                        </span>
                                      )) || <span className="text-xs italic text-white/20">Aucune option spécifique</span>}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-[10px] font-bold text-brand uppercase tracking-[0.2em] mb-4">Description Détaillée</h4>
                                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-sm text-white/60 leading-relaxed font-sans whitespace-pre-wrap">
                                      {selectedRequest.description}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5 relative z-10">
                                  <div className="flex-1">
                                     <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4 text-center sm:text-left">Changer le Statut</div>
                                     <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                        <button onClick={() => handleUpdateStatus(selectedRequest.id, 'contacted')} className="px-4 py-2 bg-brand/10 text-brand text-[10px] font-bold rounded-xl hover:bg-brand hover:text-white transition-all border border-brand/20">Contacté</button>
                                        <button onClick={() => handleUpdateStatus(selectedRequest.id, 'in_progress')} className="px-4 py-2 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20">En Cours</button>
                                        <button onClick={() => handleUpdateStatus(selectedRequest.id, 'completed')} className="px-4 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20">Terminé</button>
                                     </div>
                                  </div>
                                  <a 
                                    href={`https://wa.me/${selectedRequest.contact_info.replace(/[^0-9]/g, '')}?text=Bonjour ${selectedRequest.full_name}, je vous contacte suite à votre demande pour ${selectedRequest.service_type}.`}
                                    target="_blank"
                                    className="btn-brand flex items-center gap-3 justify-center py-4 px-8"
                                  >
                                     Ouvrir WhatsApp <ExternalLink size={18} />
                                  </a>
                                </div>
                              </motion.div>
                            ) : (
                              <div className="h-[600px] flex items-center justify-center bg-surface/50 rounded-3xl border-2 border-dashed border-white/5">
                                <div className="text-center">
                                  <div className="w-24 h-24 rounded-full bg-brand/5 flex items-center justify-center mx-auto mb-8 text-brand/10">
                                    <MessageSquare size={48} />
                                  </div>
                                  <h3 className="text-xl font-display font-bold text-white/40">Détails de la demande</h3>
                                  <p className="text-xs text-white/20 font-bold uppercase tracking-widest max-w-[250px] mx-auto mt-4 leading-loose">Sélectionnez une demande dans la liste pour visualiser les informations client.</p>
                                </div>
                              </div>
                            )}
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {activeTab === 'stats' && (
                    <motion.div key="stats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                       <h1 className="text-3xl font-display font-bold">Rapports & Statistiques</h1>
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="bg-surface p-8 rounded-3xl border border-white/5">
                             <h3 className="text-xl font-display font-bold mb-10 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                                   <TrendingUp size={18} />
                                </div>
                                Répartition des Services
                             </h3>
                             <div className="space-y-8">
                                {['Site Vitrine', 'Boutique E-commerce', 'Application Web / SaaS', 'SEO & Référencement', 'UI/UX Design'].map(type => {
                                  const count = requests.filter(r => r.service_type.includes(type)).length;
                                  const percentage = requests.length ? (count / requests.length) * 100 : 0;
                                  return (
                                    <div key={type} className="space-y-3">
                                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                                        <span className="text-white/60">{type}</span>
                                        <span className="text-brand">{count} Demandes</span>
                                      </div>
                                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5">
                                        <motion.div 
                                          initial={{ width: 0 }} 
                                          animate={{ width: `${percentage}%` }}
                                          className="h-full bg-linear-to-r from-brand to-brand-dark rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                             </div>
                          </div>
                          
                          <div className="bg-surface p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                                <BarChart3 size={32} />
                             </div>
                             <h3 className="text-xl font-display font-bold mb-2 text-white/60">Analyse de Conversion</h3>
                             <p className="text-xs text-white/20 font-bold uppercase tracking-widest max-w-[300px]">Les graphiques temporels seront disponibles dès que vous aurez plus de 20 demandes archivées.</p>
                          </div>
                       </div>
                    </motion.div>
                 )}

                 {activeTab === 'team' && (
                    <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                       <div className="flex justify-between items-center bg-surface p-8 rounded-3xl border border-white/5 shadow-xl">
                         <div>
                            <h2 className="text-3xl font-display font-bold text-white">Équipe Administrative</h2>
                            <p className="text-white/40 text-sm mt-1">Gérez les accès de vos collaborateurs à la plateforme.</p>
                         </div>
                         <button onClick={() => setIsAdminModalOpen(true)} className="btn-brand px-8">
                           <Plus size={20} /> <span className="hidden sm:inline">Nouvel Admin</span>
                         </button>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {admins.map(admin => (
                           <div key={admin.id} className="bg-surface p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-brand/30 transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                                    <Shield size={24} />
                                 </div>
                                 <div>
                                    <h4 className="font-display font-bold text-text uppercase tracking-tight">{admin.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                       <p className="text-[9px] text-emerald-500/60 font-bold tracking-widest uppercase">Connecté</p>
                                    </div>
                                 </div>
                              </div>
                              <button onClick={() => handleDeleteAdmin(admin.id)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-500/20">
                                 <Trash2 size={18} />
                              </button>
                           </div>
                         ))}
                       </div>
                    </motion.div>
                 )}

                 {activeTab === 'settings' && (
                    <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                       <h1 className="text-3xl font-display font-bold">Paramètres de l'Agence</h1>
                       <div className="card p-8 bg-surface border-white/5">
                          <p className="text-white/40 text-sm">Les paramètres de configuration de l'API et du site public seront bientôt disponibles ici.</p>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </main>
      </div>

      {/* Admin Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-md bg-surface border border-white/10 p-10 relative rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 blur-[80px] -mr-10 -mt-10" />
               <h3 className="text-3xl font-display font-bold text-text mb-2 relative z-10">Accès Collaborateur</h3>
               <p className="text-white/40 text-sm mb-10 relative z-10">Créez un nouveau point d'accès sécurisé.</p>
               
               <form onSubmit={handleAddAdmin} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Identifiant</label>
                     <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input type="text" required value={adminFormData.name} onChange={e => setAdminFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 focus:border-brand/50 focus:ring-0 rounded-2xl py-4 pl-12 text-sm text-white placeholder:text-white/10 transition-all" placeholder="Nom du collaborateur" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Passcode Privé</label>
                     <div className="relative">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input type="password" required value={adminFormData.passcode} onChange={e => setAdminFormData(prev => ({ ...prev, passcode: e.target.value }))} className="w-full bg-white/5 border border-white/10 focus:border-brand/50 focus:ring-0 rounded-2xl py-4 pl-12 text-sm text-white placeholder:text-white/10 transition-all" placeholder="••••••••" />
                     </div>
                  </div>
                  <button type="submit" className="btn-brand w-full py-5 text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand/20 mt-4">Créer l'accès</button>
                  <button type="button" onClick={() => setIsAdminModalOpen(false)} className="w-full text-center text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors py-2">Annuler</button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
