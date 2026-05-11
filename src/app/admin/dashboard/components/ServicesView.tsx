'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { addServiceAction, updateServiceAction, deleteServiceAction } from '../../actions'
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
  category: string
  is_available: boolean
}

export default function ServicesView({ initialServices = [] }: { initialServices?: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setServices(initialServices)
  }, [initialServices])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    delivery_time: '',
    category: 'Web',
    is_available: true
  })

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      delivery_time: '',
      category: 'Web',
      is_available: true
    })
    setIsModalOpen(true)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      delivery_time: service.delivery_time,
      category: service.category || 'Web',
      is_available: service.is_available
    })
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (editingService) {
        const result = await updateServiceAction(editingService.id, formData)
        if (result.success) {
          setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } : s))
        }
      } else {
        const result = await addServiceAction(formData)
        if (result.success) {
          // initialServices will be updated via Next.js revalidatePath, useEffect will handle syncing
        }
      }
      setIsModalOpen(false)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce service ?')) return
    startTransition(async () => {
      const result = await deleteServiceAction(id)
      if (result.success) {
        setServices(services.filter(s => s.id !== id))
      }
    })
  }

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
        <button onClick={handleAdd} disabled={isPending} className="px-6 py-3 bg-brand text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-brand/10 disabled:opacity-50">
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
              <button 
                onClick={() => handleEdit(service)}
                className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={14} /> Modifier
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className="p-3 bg-red-500/5 border border-red-500/5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#09090b] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                {editingService ? <Edit2 className="text-brand" size={20} /> : <Plus className="text-brand" size={20} />}
                {editingService ? 'Modifier le Service' : 'Ajouter un Service'}
              </h3>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Nom du service</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors h-24 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Prix</label>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors"
                      placeholder="ex: 45,000 DA"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Délai</label>
                    <input
                      type="text"
                      required
                      value={formData.delivery_time}
                      onChange={(e) => setFormData({...formData, delivery_time: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors"
                      placeholder="ex: 7-10 jours"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Catégorie</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors"
                      placeholder="ex: Web, SEO, Marketing"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, is_available: !formData.is_available})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.is_available ? 'bg-brand' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_available ? 'right-1' : 'left-1'}`} />
                  </button>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    {formData.is_available ? 'Service Disponible' : 'Service Indisponible'}
                  </span>
                </div>

                <div className="pt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-white transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 px-4 py-3 bg-brand hover:bg-brand-dark rounded-xl text-[11px] font-bold uppercase tracking-widest text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check size={16} /> {editingService ? 'Mettre à jour' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
