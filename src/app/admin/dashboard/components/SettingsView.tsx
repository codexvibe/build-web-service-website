'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSettingsAction, updateSettingAction } from '../../actions'
import {
  Shield, Globe, Bell, Palette, Database, Lock,
  User, Mail, Phone, Save, RefreshCw, ChevronRight,
  Fingerprint, Key, Eye, EyeOff
} from 'lucide-react'

export default function SettingsView({ initialSettings = [] }: { initialSettings?: any[] }) {
  const [activeSection, setActiveSection] = useState('general')
  const [isPending, startTransition] = useTransition()
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Initialize from props if available
  const getInitialValue = (key: string, fallback: string) => {
    const setting = initialSettings.find(s => s.key === key)
    return setting ? setting.value : fallback
  }

  const [formData, setFormData] = useState({
    agency_name: getInitialValue('agency_name', 'ProServices Digital'),
    admin_email: getInitialValue('admin_email', 'admin@proservices.dz'),
    agency_bio: getInitialValue('agency_bio', 'Solutions digitales premium basées en Algérie.'),
    brand_color_light: getInitialValue('brand_color_light', '#3b82f6'),
    brand_color_dark: getInitialValue('brand_color_dark', '#ffffff')
  })

  useEffect(() => {
    // Also fetch to keep in sync if props change (though unlikely in this flow)
    getSettingsAction().then(res => {
      if (res.data) {
        const map = res.data.reduce((acc: any, s: any) => ({ ...acc, [s.key]: s.value }), {})
        setFormData(prev => ({ ...prev, ...map }))
      }
    })
  }, [])

  const handleSaveGeneral = () => {
    setSaveStatus('idle')
    startTransition(async () => {
      try {
        await updateSettingAction('agency_name', formData.agency_name)
        await updateSettingAction('admin_email', formData.admin_email)
        await updateSettingAction('agency_bio', formData.agency_bio)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      }
    })
  }

  const handleSaveAppearance = () => {
    setSaveStatus('idle')
    startTransition(async () => {
      try {
        await updateSettingAction('brand_color_light', formData.brand_color_light)
        await updateSettingAction('brand_color_dark', formData.brand_color_dark)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      }
    })
  }

  const sections = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'billing', label: 'Abonnement', icon: Key },
    { id: 'appearance', label: 'Apparence', icon: Palette },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
      {/* Sidebar de réglages */}
      <div className="lg:col-span-3 space-y-1.5">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 relative group ${isActive
                ? 'text-brand'
                : 'text-white/40 hover:text-white/80 hover:bg-white/3'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="settings-active"
                  className="absolute inset-0 bg-brand/5 border border-brand/10 rounded-xl"
                />
              )}
              <section.icon size={18} className="relative z-10" />
              <span className="relative z-10 text-sm font-medium">{section.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto relative z-10" />}
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="lg:col-span-9 bg-[#09090b] rounded-4xl border border-white/5 p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/2 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />

        <AnimatePresence mode="wait">
          {activeSection === 'general' && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 relative z-10"
            >
              <div>
                <h3 className="text-2xl font-bold mb-1">Paramètres de l'Agence</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Configuration globale de ProServices</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Nom de l'Entité</label>
                  <input type="text" value={formData.agency_name} onChange={(e) => setFormData(p => ({ ...p, agency_name: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Email Administratif</label>
                  <input type="email" value={formData.admin_email} onChange={(e) => setFormData(p => ({ ...p, admin_email: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Bio de l'Agence</label>
                <textarea rows={3} value={formData.agency_bio} onChange={(e) => setFormData(p => ({ ...p, agency_bio: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none resize-none" />
              </div>

              <div className="pt-6 border-t border-white/5">
                <button onClick={handleSaveGeneral} disabled={isPending} className="px-8 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand transition-all flex items-center gap-2 disabled:opacity-50">
                  {isPending ? <RefreshCw className="animate-spin" size={14} /> : saveStatus === 'success' ? <Check className="text-green-600" size={14} /> : <Save size={14} />}
                  {isPending ? 'Enregistrement...' : saveStatus === 'success' ? 'Enregistré !' : 'Mettre à jour'}
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 relative z-10"
            >
              <div>
                <h3 className="text-2xl font-bold mb-1">Protection des Données</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Couches de sécurité et authentification</p>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Fingerprint size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Sécurité Maximale</h4>
                  <p className="text-[11px] text-white/30">Votre connexion est protégée par un chiffrement AES-256 bits.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                      <Lock size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">Double Facteur (2FA)</h5>
                      <p className="text-[10px] text-white/20">Non configuré</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-brand hover:underline uppercase tracking-widest">Activer</button>
                </div>

                <div className="flex items-center justify-between p-5 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                      <Database size={16} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold">Base de données Leads</h5>
                      <p className="text-[10px] text-white/20">Backup auto activé (Daily)</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">Exporter SQL</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'billing' && (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 relative z-10"
            >
              <div>
                <h3 className="text-2xl font-bold mb-1">Abonnement & Facturation</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Gérez votre forfait et vos moyens de paiement</p>
              </div>

              <div className="bg-brand/5 border border-brand/20 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-[40px] -mr-16 -mt-16" />
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-brand/20 text-brand text-[10px] font-bold uppercase tracking-widest rounded-full">Forfait Actuel</span>
                    <h4 className="text-2xl font-bold mt-4 mb-2">ProServices Premium</h4>
                    <p className="text-sm text-white/40">Accès illimité à toutes les fonctionnalités et support prioritaire.</p>
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter">4,500<span className="text-base text-white/30 font-medium">DA/mo</span></h2>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/5">
                  <button className="px-6 py-3 bg-brand text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all">
                    Changer de forfait
                  </button>
                  <button className="px-6 py-3 bg-white/5 text-white/60 hover:text-white font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all border border-white/5">
                    Voir les factures
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 relative z-10"
            >
              <div>
                <h3 className="text-2xl font-bold mb-1">Personnalisation Visuelle</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Adaptez l'interface à votre image de marque</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Thème de l'interface</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-2xl bg-white/5 border border-brand flex flex-col items-center gap-3 transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-brand/5" />
                      <div className="w-full h-16 bg-[#09090b] rounded-lg border border-white/10 flex items-center justify-center relative z-10">
                        <div className="w-8 h-2 bg-white/20 rounded-full" />
                      </div>
                      <span className="text-xs font-bold relative z-10">Mode Sombre</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-white/20 flex flex-col items-center gap-3 transition-all opacity-50 cursor-not-allowed">
                      <div className="w-full h-16 bg-white rounded-lg border border-black/10 flex items-center justify-center">
                        <div className="w-8 h-2 bg-black/20 rounded-full" />
                      </div>
                      <span className="text-xs font-bold">Mode Clair (Bientôt)</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Couleur Brand (Mode Clair)</label>
                    <div className="flex flex-wrap gap-3 bg-white/3 border border-white/5 p-4 rounded-2xl">
                      {['#3b82f6', '#a855f7', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#14b8a6', '#f43f5e', '#000000'].map(color => (
                        <button onClick={() => setFormData(p => ({...p, brand_color_light: color}))} key={color} className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color === formData.brand_color_light ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b]' : ''}`} style={{ backgroundColor: color }}>
                          {color === formData.brand_color_light && <div className="w-2 h-2 bg-black rounded-full" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Couleur Brand (Mode Sombre)</label>
                    <div className="flex flex-wrap gap-3 bg-white/3 border border-white/5 p-4 rounded-2xl">
                      {['#ffffff', '#D4FF00', '#3b82f6', '#a855f7', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#14b8a6', '#f43f5e'].map(color => (
                        <button onClick={() => setFormData(p => ({...p, brand_color_dark: color}))} key={color} className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color === formData.brand_color_dark ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b]' : ''}`} style={{ backgroundColor: color }}>
                          {color === formData.brand_color_dark && <div className="w-2 h-2 bg-black rounded-full" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button onClick={handleSaveAppearance} disabled={isPending} className="px-8 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand transition-all flex items-center gap-2 disabled:opacity-50">
                      {isPending ? <RefreshCw className="animate-spin" size={14} /> : saveStatus === 'success' ? <Check className="text-green-600" size={14} /> : <Save size={14} />}
                      {isPending ? 'Enregistrement...' : saveStatus === 'success' ? 'Enregistré !' : "Mettre à jour l'apparence"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
