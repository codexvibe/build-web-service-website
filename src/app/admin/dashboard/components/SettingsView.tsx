'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, Globe, Bell, Palette, Database, Lock, 
  User, Mail, Phone, Save, RefreshCw, ChevronRight,
  Fingerprint, Key, Eye, EyeOff
} from 'lucide-react'

export default function SettingsView() {
  const [activeSection, setActiveSection] = useState('general')

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
              className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive 
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
                  <input type="text" defaultValue="ProServices Digital" className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Email Administratif</label>
                  <input type="email" defaultValue="admin@proservices.dz" className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Bio de l'Agence</label>
                <textarea rows={3} defaultValue="Solutions digitales premium basées en Algérie." className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none resize-none" />
              </div>

              <div className="pt-6 border-t border-white/5">
                <button className="px-8 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand transition-all flex items-center gap-2">
                  <Save size={14} /> Mettre à jour
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

              <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl flex items-center gap-5">
                 <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
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
        </AnimatePresence>
      </div>
    </div>
  )
}
