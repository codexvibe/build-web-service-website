'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, MapPin, Calendar, DollarSign, Zap, FileText, 
  Trash2, X, ExternalLink, Mail, Clock, CheckCircle2,
  ChevronRight, ArrowRight
} from 'lucide-react'

interface LeadDetailsProps {
  lead: any
  onDelete: (id: string) => void
  onClose: () => void
  onUpdateStatus: (id: string, status: string) => void
}

export default function LeadDetails({ lead, onDelete, onClose, onUpdateStatus }: LeadDetailsProps) {
  const infoCards = [
    { label: 'Contact Direct', val: lead.contact_info, icon: Phone, sub: 'WhatsApp' },
    { label: 'Localisation', val: lead.location, icon: MapPin, sub: 'Ville' },
    { label: 'Échéance', val: lead.preferred_date || 'ASAP', icon: Calendar, sub: 'Planning' },
    { label: 'Budget', val: lead.budget, icon: DollarSign, sub: 'Estimé' },
  ]

  return (
    <div className="bg-[#09090b] rounded-4xl border border-white/5 p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col min-h-[750px]">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/2 blur-[120px] rounded-full -mr-32 -mt-32 pointer-events-none" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Fiche Lead Détaillée</span>
          </div>
          <h3 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white">{lead.full_name}</h3>
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1.5 bg-brand/10 text-brand text-[9px] font-bold rounded-lg border border-brand/10 uppercase tracking-widest">{lead.service_type}</div>
            <div className="px-3 py-1.5 bg-white/5 text-white/40 text-[9px] font-bold rounded-lg border border-white/5 uppercase tracking-widest flex items-center gap-2">
              <Clock size={12} /> {new Date(lead.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
             onClick={() => onDelete(lead.id)}
             className="w-10 h-10 rounded-xl bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-red-500/5 hover:border-red-500/20 flex items-center justify-center"
           >
             <Trash2 size={18} />
           </button>
           <button 
             onClick={onClose}
             className="w-10 h-10 rounded-xl bg-white/5 text-white/20 hover:text-white transition-all border border-white/5 flex items-center justify-center"
           >
             <X size={18} />
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 relative z-10">
        {infoCards.map((info, i) => (
          <div key={i} className="bg-white/2 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
             <div className="w-8 h-8 rounded-lg bg-white/3 flex items-center justify-center text-white/20 mb-4 group-hover:text-brand transition-colors">
                <info.icon size={16} />
             </div>
             <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">{info.label}</p>
             <p className="text-sm font-bold text-white truncate">{info.val}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-auto relative z-10">
         <div className="space-y-6">
            <div className="space-y-3">
               <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
                  <Zap size={12} className="text-brand" /> Options & Urgence
               </h4>
               <div className="flex flex-wrap gap-2">
                  {lead.urgency ? lead.urgency.split(',').map((opt: string, i: number) => (
                    <div key={i} className="px-3 py-1.5 bg-white/5 text-[10px] font-bold rounded-lg border border-white/5 text-white/60">
                      {opt.trim()}
                    </div>
                  )) : <p className="text-[10px] text-white/10 italic">Aucune option additionnelle</p>}
               </div>
            </div>
         </div>

         <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
               <FileText size={12} className="text-brand" /> Description du Projet
            </h4>
            <div className="bg-white/2 p-6 rounded-2xl border border-white/5 text-xs text-white/40 leading-relaxed min-h-[120px]">
               {lead.description}
            </div>
         </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
         <div className="space-y-3 w-full md:w-auto">
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Statut de la demande</p>
            <div className="flex flex-wrap gap-1.5">
               {[
                 { id: 'pending', label: 'En attente', color: 'amber-500' },
                 { id: 'contacted', label: 'Contacté', color: 'blue-500' },
                 { id: 'in_progress', label: 'En cours', color: '#39ff14' },
                 { id: 'completed', label: 'Terminé', color: 'emerald-500' },
               ].map(st => (
                 <button 
                   key={st.id}
                   onClick={() => onUpdateStatus(lead.id, st.id)}
                   className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                     lead.status === st.id 
                     ? `bg-white text-black border-white` 
                     : `bg-white/5 border-white/5 text-white/30 hover:border-white/10`
                   }`}
                 >
                   {st.label}
                 </button>
               ))}
            </div>
         </div>

         <a 
            href={`https://wa.me/${lead.contact_info.replace(/[^0-9]/g, '')}`} 
            target="_blank"
            className="w-full md:w-auto px-8 py-4 bg-brand text-black font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-xl shadow-brand/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
         >
            Ouvrir WhatsApp <ArrowRight size={16} />
         </a>
      </div>
    </div>
  )
}
