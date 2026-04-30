'use client'

import React, { useState } from 'react'
import { 
  Plus, Edit2, Trash2, Globe, ShoppingCart, 
  Layout, Search, Check, X, Clock, Tag
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  id: string
  name: string
  description: string
  price: string
  delivery_time: string
  is_available: boolean
}

export default function ServicesView() {
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Site Vitrine Pro', description: 'Idéal pour les entreprises et indépendants.', price: '45,000 DA', delivery_time: '7-10 jours', is_available: true },
    { id: '2', name: 'E-commerce Complet', description: 'Boutique en ligne avec gestion de stock.', price: '85,000 DA', delivery_time: '15-20 jours', is_available: true },
    { id: '3', name: 'Landing Page High-Conv', description: 'Optimisé pour vos campagnes publicitaires.', price: '25,000 DA', delivery_time: '3-5 jours', is_available: true },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="bg-[#09090b] p-8 rounded-4xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 italic">
            <Layout className="text-brand" size={24} /> Catalogue de Services
          </h3>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Gérez vos offres et tarifs</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-brand text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-brand/10">
          <Plus size={16} /> Ajouter un Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#09090b] border border-white/5 p-8 rounded-4xl hover:border-brand/20 transition-all group flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-bl-[4rem] flex items-center justify-center">
              <Tag size={20} className="text-white/10" />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/3 flex items-center justify-center text-brand">
                {service.name.includes('Vitrine') ? <Globe size={24} /> : service.name.includes('E-commerce') ? <ShoppingCart size={24} /> : <Layout size={24} />}
              </div>
              <div className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-wider ${service.is_available ? 'bg-brand/10 text-brand' : 'bg-red-500/10 text-red-500'}`}>
                {service.is_available ? 'Disponible' : 'Indisponible'}
              </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{service.name}</h4>
            <p className="text-xs text-white/30 leading-relaxed mb-8 flex-1">{service.description}</p>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                <span>Prix de base</span>
                <span className="text-brand text-sm">{service.price}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                <span>Délai moyen</span>
                <span className="text-white flex items-center gap-2"><Clock size={12} /> {service.delivery_time}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Edit2 size={14} /> Modifier
              </button>
              <button className="p-3 bg-red-500/5 border border-red-500/5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
