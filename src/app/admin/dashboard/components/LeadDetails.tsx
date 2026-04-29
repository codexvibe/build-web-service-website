'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, MapPin, Calendar, DollarSign, Zap, FileText, 
  Trash2, X, ExternalLink 
} from 'lucide-react'

interface LeadDetailsProps {
  lead: any
  onDelete: (id: string) => void
  onClose: () => void
  onUpdateStatus: (id: string, status: string) => void
}

export default function LeadDetails({ lead, onDelete, onClose, onUpdateStatus }: LeadDetailsProps) {
  const infoCards = [
    { label: 'Contact Client', val: lead.contact_info, icon: Phone, sub: 'WhatsApp / Direct' },
    { label: 'Localisation', val: lead.location, icon: MapPin, sub: 'Ville du Client' },
    { label: 'Date Souhaitée', val: lead.preferred_date || 'ASAP', icon: Calendar, sub: 'Planning Souhaité' },
    { label: 'Budget Indicatif', val: lead.budget, icon: DollarSign, sub: 'Total Calculé' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0f1117] rounded-[2.5rem] border border-white/10 p-10 lg:p-14 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12 relative z-10">
        <div>
          <span className="text-[10px] font-bold text-brand uppercase tracking-[0.3em] mb-4 block">Fiche Client Détaillée</span>
          <h3 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">{lead.full_name}</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-brand/10 text-brand text-[10px] font-bold rounded-xl border border-brand/20 uppercase tracking-widest">{lead.service_type}</span>
            <span className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-bold rounded-xl border border-white/5 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={14} /> {new Date(lead.created_at).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onDelete(lead.id)} className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
            <Trash2 size={20} />
          </button>
          <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/5 text-white/40 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 sm:hidden">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 relative z-10">
        {infoCards.map((info, i) => (
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
            {lead.urgency ? lead.urgency.split(',').map((opt: string, i: number) => (
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
            {lead.description}
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
                onClick={() => onUpdateStatus(lead.id, st.s)}
                className={`px-5 py-2.5 text-[11px] font-bold rounded-xl border transition-all ${
                  lead.status === st.s 
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
            href={`https://wa.me/${lead.contact_info.replace(/[^0-9]/g, '')}`} 
            target="_blank"
            className="btn-brand px-10 py-5 rounded-2xl flex items-center gap-3 shadow-2xl shadow-brand/20 active:scale-95 transition-all"
          >
            Lancer WhatsApp <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
