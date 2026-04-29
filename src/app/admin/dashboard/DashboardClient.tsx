'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { 
  Trash2, CheckCircle2, Clock, Users, BarChart3, 
  MessageSquare, MapPin, Calendar, DollarSign, 
  ArrowRight, Shield, Search, Filter, MoreHorizontal,
  Mail, Phone, ExternalLink
} from 'lucide-react'
import { 
  getServiceRequestsAction, updateRequestStatusAction, deleteRequestAction,
  getAgencyStatsAction, getAdminsAction, addAdminAction, deleteAdminAction
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
  const [activeTab, setActiveTab] = useState<'requests' | 'stats' | 'team'>('requests')
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

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || r.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
            <MessageSquare size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">Total Leads</div>
            <div className="text-2xl font-display font-bold text-text">{requests.length}</div>
          </div>
        </div>
        <div className="card p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">En Attente</div>
            <div className="text-2xl font-display font-bold text-text">{requests.filter(r => r.status === 'pending').length}</div>
          </div>
        </div>
        <div className="card p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">Terminés</div>
            <div className="text-2xl font-display font-bold text-text">{requests.filter(r => r.status === 'completed').length}</div>
          </div>
        </div>
        <div className="card p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">Revenue Est.</div>
            <div className="text-2xl font-display font-bold text-text">
              {requests.reduce((acc, r) => acc + parseFloat(String(r.budget || '0').replace(/[^0-9.]/g, '')), 0).toLocaleString()} DA
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'requests' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-text-sub hover:bg-surface border border-transparent hover:border-border'}`}
          >
            <MessageSquare size={18} /> Demandes
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'stats' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-text-sub hover:bg-surface border border-transparent hover:border-border'}`}
          >
            <BarChart3 size={18} /> Rapports
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'team' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-text-sub hover:bg-surface border border-transparent hover:border-border'}`}
          >
            <Users size={18} /> Équipe Admin
          </button>
        </div>

        <div className="flex-1 min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'requests' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                    <input 
                      type="text" 
                      placeholder="Rechercher un client ou un service..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="input pl-12 py-3.5"
                    />
                  </div>
                  <select 
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="input w-full md:w-48 py-3.5"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="contacted">Contacté</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                  {/* List */}
                  <div className={`xl:col-span-5 space-y-4 ${selectedRequest ? 'hidden xl:block' : 'block'}`}>
                    {filteredRequests.map(request => (
                      <div 
                        key={request.id}
                        onClick={() => setSelectedRequest(request)}
                        className={`card p-5 cursor-pointer transition-all border-l-4 ${selectedRequest?.id === request.id ? 'border-l-brand bg-brand/5' : 'border-l-transparent hover:border-l-brand/50'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-display font-bold text-text">{request.full_name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            request.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                            request.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                            'bg-brand/10 text-brand'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="text-xs text-text-sub font-medium flex items-center gap-2 mb-3">
                          <span className="text-brand">{request.service_type}</span>
                          <span>•</span>
                          <span>{new Date(request.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-text opacity-70">{request.budget}</span>
                          <ArrowRight size={14} className="text-muted" />
                        </div>
                      </div>
                    ))}
                    {filteredRequests.length === 0 && (
                      <div className="text-center py-20 text-muted italic">Aucune demande trouvée</div>
                    )}
                  </div>

                  {/* Details View */}
                  <div className={`xl:col-span-7 ${selectedRequest ? 'block' : 'hidden xl:block'}`}>
                    {selectedRequest ? (
                      <div className="card p-8 sticky top-24 border-brand/20 bg-surface/50 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <button onClick={() => setSelectedRequest(null)} className="xl:hidden text-brand text-xs font-bold mb-4 flex items-center gap-1">
                              ← Retour à la liste
                            </button>
                            <h3 className="text-3xl font-display font-bold text-text mb-2">{selectedRequest.full_name}</h3>
                            <div className="flex flex-wrap gap-3">
                              <span className="badge">{selectedRequest.service_type}</span>
                              <span className="flex items-center gap-1 text-xs text-muted font-bold uppercase tracking-widest">
                                <Calendar size={14} /> {new Date(selectedRequest.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteRequest(selectedRequest.id)}
                            className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-brand">
                                <Phone size={18} />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-muted uppercase">Contact</div>
                                <div className="text-sm font-bold text-text">{selectedRequest.contact_info}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-brand">
                                <MapPin size={18} />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-muted uppercase">Localisation</div>
                                <div className="text-sm font-bold text-text">{selectedRequest.location}</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-brand">
                                <Calendar size={18} />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-muted uppercase">Date Souhaitée</div>
                                <div className="text-sm font-bold text-text">{selectedRequest.preferred_date || 'N/A'}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-brand">
                                <DollarSign size={18} />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-muted uppercase">Budget Estimé</div>
                                <div className="text-sm font-bold text-text">{selectedRequest.budget}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6 mb-10">
                          <div>
                            <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Options Choisies</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedRequest.urgency?.split(',').map((opt, i) => (
                                <span key={i} className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-bold rounded-lg border border-brand/20">
                                  {opt.trim()}
                                </span>
                              )) || <span className="text-xs italic text-muted">Aucune option</span>}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Description du projet</h4>
                            <div className="p-5 bg-surface rounded-2xl border border-border text-sm text-text-sub leading-relaxed whitespace-pre-wrap">
                              {selectedRequest.description}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                          <div className="flex-1">
                             <div className="text-[10px] font-bold text-muted uppercase mb-3">Action Rapide</div>
                             <div className="flex flex-wrap gap-2">
                                <button onClick={() => handleUpdateStatus(selectedRequest.id, 'contacted')} className="px-4 py-2 bg-brand/10 text-brand text-xs font-bold rounded-xl hover:bg-brand hover:text-white transition-all border border-brand/20">Contacté</button>
                                <button onClick={() => handleUpdateStatus(selectedRequest.id, 'in_progress')} className="px-4 py-2 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20">En Cours</button>
                                <button onClick={() => handleUpdateStatus(selectedRequest.id, 'completed')} className="px-4 py-2 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20">Terminé</button>
                             </div>
                          </div>
                          <a 
                            href={`https://wa.me/${selectedRequest.contact_info.replace(/[^0-9]/g, '')}?text=Bonjour ${selectedRequest.full_name}, je vous contacte suite à votre demande pour ${selectedRequest.service_type}.`}
                            target="_blank"
                            className="btn-brand flex items-center gap-2 justify-center"
                          >
                             Contacter WhatsApp <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center card bg-surface/30 border-dashed border-2">
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-brand/5 flex items-center justify-center mx-auto mb-6 text-brand/20">
                            <MessageSquare size={40} />
                          </div>
                          <h3 className="text-lg font-display font-bold text-text-sub">Sélectionnez une demande</h3>
                          <p className="text-xs text-muted max-w-[200px] mx-auto mt-2">Cliquez sur un lead à gauche pour voir les détails complets.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card p-8 bg-surface border-border">
                       <h3 className="text-xl font-display font-bold mb-8">Performance des Services</h3>
                       <div className="space-y-6">
                          {['Site Vitrine', 'Boutique E-commerce', 'Application Web / SaaS', 'SEO & Référencement', 'UI/UX Design'].map(type => {
                            const count = requests.filter(r => r.service_type.includes(type)).length;
                            const percentage = requests.length ? (count / requests.length) * 100 : 0;
                            return (
                              <div key={type} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                  <span>{type}</span>
                                  <span className="text-brand">{count} Leads</span>
                                </div>
                                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${percentage}%` }}
                                    className="h-full bg-brand"
                                  />
                                </div>
                              </div>
                            )
                          })}
                       </div>
                    </div>
                    
                    <div className="card p-8 bg-surface border-border">
                       <h3 className="text-xl font-display font-bold mb-8">Statut des Leads</h3>
                       <div className="flex items-center justify-center h-48">
                          <div className="text-center text-muted italic">Graphique de conversion à venir...</div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex justify-between items-center bg-surface p-6 rounded-2xl border border-border">
                  <h2 className="text-xl font-display font-bold text-text">Équipe Administrative</h2>
                  <button onClick={() => setIsAdminModalOpen(true)} className="btn-brand text-xs px-6">
                    Nouvel Admin
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {admins.map(admin => (
                    <div key={admin.id} className="card p-6 flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                             <Shield size={24} />
                          </div>
                          <div>
                             <h4 className="font-display font-bold text-text uppercase tracking-tight">{admin.name}</h4>
                             <p className="text-[10px] text-muted font-bold tracking-[0.2em] uppercase mt-1">Accès Niveau 1</p>
                          </div>
                       </div>
                       <button onClick={() => handleDeleteAdmin(admin.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Admin Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdminModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-surface border border-border p-8 relative rounded-3xl shadow-2xl">
               <h3 className="text-2xl font-display font-bold text-text mb-8">Ajouter un Collaborateur</h3>
               <form onSubmit={handleAddAdmin} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-muted uppercase tracking-widest">Nom Complet</label>
                     <input type="text" required value={adminFormData.name} onChange={e => setAdminFormData(prev => ({ ...prev, name: e.target.value }))} className="input" placeholder="p.ex. Amine" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-muted uppercase tracking-widest">Passcode de Sécurité</label>
                     <input type="password" required value={adminFormData.passcode} onChange={e => setAdminFormData(prev => ({ ...prev, passcode: e.target.value }))} className="input" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="btn-brand w-full py-4 justify-center">Créer l'accès</button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
