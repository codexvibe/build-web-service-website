'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, Globe, Bell, Palette, Database, Lock, 
  User, Mail, Phone, Save, RefreshCw 
} from 'lucide-react'

export default function SettingsView() {
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Apparence', icon: Palette },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Sidebar de réglages */}
      <div className="lg:col-span-3 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
              activeSection === section.id 
              ? 'bg-brand text-white shadow-lg' 
              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
            }`}
          >
            <section.icon size={18} />
            {section.label}
          </button>
        ))}
      </div>

      {/* Panel de contenu */}
      <div className="lg:col-span-9 bg-[#0f1117] rounded-[2.5rem] border border-white/5 p-10 lg:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none" />
        
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
                <h3 className="text-3xl font-display font-bold mb-2">Paramètres Généraux</h3>
                <p className="text-white/40 text-sm">Gérez les informations globales de votre agence.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/20 uppercase tracking-widest block">Nom de l'Agence</label>
                  <input type="text" defaultValue="ProServices" className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-brand/50 transition-all outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/20 uppercase tracking-widest block">Email de Contact</label>
                  <input type="email" defaultValue="contact@proservices.dz" className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-brand/50 transition-all outline-none" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-white/20 uppercase tracking-widest block">Description de l'Agence</label>
                <textarea rows={4} defaultValue="Agence digitale spécialisée dans la création de sites web haute performance." className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-8 text-white focus:border-brand/50 transition-all outline-none resize-none" />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button className="btn-brand px-12 py-5 rounded-2xl flex items-center gap-3">
                  <Save size={18} /> Enregistrer
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
                <h3 className="text-3xl font-display font-bold mb-2">Sécurité</h3>
                <p className="text-white/40 text-sm">Gérez les accès et les clés de sécurité.</p>
              </div>

              <div className="p-8 rounded-4xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500"><Shield size={28} /></div>
                 <div>
                    <h4 className="font-bold text-lg text-amber-500">Mode Protection Activé</h4>
                    <p className="text-sm text-white/40">Le système est actuellement protégé par une double vérification.</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div>
                       <h5 className="font-bold">Clé API Supabase</h5>
                       <p className="text-xs text-white/30 font-mono mt-1">••••••••••••••••••••••••••••••</p>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors"><RefreshCw size={18} /></button>
                 </div>
                 <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div>
                       <h5 className="font-bold">Journal d'Accès</h5>
                       <p className="text-xs text-white/30 mt-1">Dernière connexion: Aujourd'hui à 02:45</p>
                    </div>
                    <button className="text-brand font-bold text-xs hover:underline">Voir les logs</button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


