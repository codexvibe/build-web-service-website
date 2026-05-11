'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSettingsAction, updateSettingAction } from '../../actions'
import {
  Shield, Globe, Bell, Palette, Database, Lock,
  User, Mail, Phone, Save, RefreshCw, ChevronRight,
  Fingerprint, Key, Eye, EyeOff, Check, Layout, Info,
  MapPin, Type, Share2, MousePointer2
} from 'lucide-react'

export default function SettingsView({ initialSettings = [], mode = 'full' }: { initialSettings?: any[], mode?: 'full' | 'editor' }) {
  const [activeSection, setActiveSection] = useState(mode === 'editor' ? 'appearance' : 'general')
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
    brand_color_dark: getInitialValue('brand_color_dark', '#ffffff'),
    
    // Hero
    hero_badge: getInitialValue('hero_badge', 'AGENCE DIGITALE PREMIUM'),
    hero_title: getInitialValue('hero_title', 'Propulsez votre Business en ligne.'),
    hero_subtitle: getInitialValue('hero_subtitle', 'Nous créons des sites web performants...'),
    hero_cta_primary: getInitialValue('hero_cta_primary', 'Dévis Gratuit'),
    hero_cta_secondary: getInitialValue('hero_cta_secondary', 'Découvrir nos services'),
    show_hero_glow: getInitialValue('show_hero_glow', 'true'),

    // Footer & Contact
    footer_desc: getInitialValue('footer_desc', 'Solutions digitales premium basées en Algérie...'),
    contact_phone: getInitialValue('contact_phone', '+213 555 55 55 55'),
    contact_email: getInitialValue('contact_email', 'contact@proservices.dz'),
    contact_address: getInitialValue('contact_address', 'Alger, Algérie'),
    social_facebook: getInitialValue('social_facebook', ''),
    social_instagram: getInitialValue('social_instagram', ''),
    social_linkedin: getInitialValue('social_linkedin', ''),
    
    // Sections
    about_title: getInitialValue('about_title', 'Expertise et Qualité'),
    about_desc: getInitialValue('about_desc', 'Nous nous engageons à fournir...'),
    cta_title: getInitialValue('cta_title', 'Prêt à lancer votre projet ?'),
    contact_whatsapp: getInitialValue('contact_whatsapp', '213555555555'),

    // Announcement
    show_announcement: getInitialValue('show_announcement', 'true'),
    announcement_text: getInitialValue('announcement_text', '🚀 Promotion Exceptionnelle...'),
    announcement_link: getInitialValue('announcement_link', '/services'),
    header_cta: getInitialValue('header_cta', 'Démarrer'),
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

  const handleSaveHero = () => {
    setSaveStatus('idle')
    startTransition(async () => {
      try {
        await updateSettingAction('hero_badge', formData.hero_badge)
        await updateSettingAction('hero_title', formData.hero_title)
        await updateSettingAction('hero_subtitle', formData.hero_subtitle)
        await updateSettingAction('hero_cta_primary', formData.hero_cta_primary)
        await updateSettingAction('hero_cta_secondary', formData.hero_cta_secondary)
        await updateSettingAction('show_hero_glow', formData.show_hero_glow)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      }
    })
  }

  const handleSaveFooter = () => {
    setSaveStatus('idle')
    startTransition(async () => {
      try {
        await updateSettingAction('footer_desc', formData.footer_desc)
        await updateSettingAction('contact_phone', formData.contact_phone)
        await updateSettingAction('contact_email', formData.contact_email)
        await updateSettingAction('contact_address', formData.contact_address)
        await updateSettingAction('social_facebook', formData.social_facebook)
        await updateSettingAction('social_instagram', formData.social_instagram)
        await updateSettingAction('social_linkedin', formData.social_linkedin)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      }
    })
  }

  const handleSaveSections = () => {
    setSaveStatus('idle')
    startTransition(async () => {
      try {
        await updateSettingAction('about_title', formData.about_title)
        await updateSettingAction('about_desc', formData.about_desc)
        await updateSettingAction('cta_title', formData.cta_title)
        await updateSettingAction('contact_whatsapp', formData.contact_whatsapp)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      }
    })
  }

  const handleSaveHeader = () => {
    setSaveStatus('idle')
    startTransition(async () => {
      try {
        await updateSettingAction('show_announcement', formData.show_announcement)
        await updateSettingAction('announcement_text', formData.announcement_text)
        await updateSettingAction('announcement_link', formData.announcement_link)
        await updateSettingAction('header_cta', formData.header_cta)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      }
    })
  }

  const sections = [
    { id: 'general', label: 'Général', icon: Info },
    { id: 'header', label: 'En-tête & Top', icon: MousePointer2 }, // Use an icon for header
    { id: 'hero', label: 'Section Hero', icon: Layout },
    { id: 'sections', label: 'Sections & CTA', icon: MousePointer2 },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'footer', label: 'Pied de page', icon: Mail },
    { id: 'security', label: 'Sécurité', icon: Shield },
  ].filter(s => mode === 'full' || ['header', 'hero', 'sections', 'appearance', 'footer'].includes(s.id))

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

          {activeSection === 'sections' && (
            <motion.div key="sections" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10 relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Sections de la Page</h3>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Gérez le contenu des blocs secondaires</p>
                </div>
                <button onClick={handleSaveSections} disabled={isPending} className="px-6 py-3 bg-brand text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50">
                   {saveStatus === 'success' ? <Check size={14} /> : <Save size={14} />}
                   {saveStatus === 'success' ? 'Enregistré !' : 'Enregistrer'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white/2 p-8 rounded-3xl border border-white/5 space-y-6">
                  <h4 className="text-sm font-bold flex items-center gap-2 italic"><Info size={16} className="text-brand" /> Section "Qui sommes-nous"</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Titre de la section</label>
                      <input type="text" value={formData.about_title} onChange={(e) => setFormData(p => ({ ...p, about_title: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Description longue</label>
                      <textarea rows={4} value={formData.about_desc} onChange={(e) => setFormData(p => ({ ...p, about_desc: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none resize-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/2 p-8 rounded-3xl border border-white/5 space-y-6">
                  <h4 className="text-sm font-bold flex items-center gap-2 italic"><MousePointer2 size={16} className="text-brand" /> Section CTA (Appel à l'action)</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Titre de l'appel à l'action</label>
                      <input type="text" value={formData.cta_title} onChange={(e) => setFormData(p => ({ ...p, cta_title: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Numéro WhatsApp (Format: 213555...)</label>
                      <input type="text" value={formData.contact_whatsapp} onChange={(e) => setFormData(p => ({ ...p, contact_whatsapp: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                  </div>
                </div>
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

          {activeSection === 'header' && (
            <motion.div key="header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10 relative z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-1">En-tête & Barre Top</h3>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Gérez la partie supérieure du site</p>
                </div>
                <button onClick={handleSaveHeader} disabled={isPending} className="px-6 py-3 bg-brand text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50">
                   {saveStatus === 'success' ? <Check size={14} /> : <Save size={14} />}
                   {saveStatus === 'success' ? 'Enregistré !' : 'Enregistrer'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white/2 p-8 rounded-3xl border border-white/5 space-y-6">
                  <h4 className="text-sm font-bold flex items-center gap-2 italic"><Bell size={16} className="text-brand" /> Barre d'Annonce (Tout en haut)</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white">Afficher la barre</p>
                        <p className="text-[10px] text-white/20">Affiche une barre de promotion tout en haut</p>
                      </div>
                      <button onClick={() => setFormData(p => ({ ...p, show_announcement: p.show_announcement === 'true' ? 'false' : 'true' }))} className={`w-12 h-6 rounded-full relative transition-all ${formData.show_announcement === 'true' ? 'bg-brand' : 'bg-white/10'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.show_announcement === 'true' ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Texte de l'annonce</label>
                      <input type="text" value={formData.announcement_text} onChange={(e) => setFormData(p => ({ ...p, announcement_text: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Lien de l'annonce</label>
                      <input type="text" value={formData.announcement_link} onChange={(e) => setFormData(p => ({ ...p, announcement_link: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/2 p-8 rounded-3xl border border-white/5 space-y-6">
                  <h4 className="text-sm font-bold flex items-center gap-2 italic"><Layout size={16} className="text-brand" /> Menu de Navigation</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Texte du bouton Header</label>
                      <input type="text" value={formData.header_cta} onChange={(e) => setFormData(p => ({ ...p, header_cta: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 relative z-10"
            >
              <div>
                <h3 className="text-2xl font-bold mb-1">Configuration du Hero</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Gérez le contenu principal de votre accueil</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Texte du Badge</label>
                    <input type="text" value={formData.hero_badge} onChange={(e) => setFormData(p => ({ ...p, hero_badge: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Titre Principal</label>
                    <input type="text" value={formData.hero_title} onChange={(e) => setFormData(p => ({ ...p, hero_title: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Sous-titre</label>
                  <textarea rows={3} value={formData.hero_subtitle} onChange={(e) => setFormData(p => ({ ...p, hero_subtitle: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">CTA Primaire (Bouton)</label>
                    <input type="text" value={formData.hero_cta_primary} onChange={(e) => setFormData(p => ({ ...p, hero_cta_primary: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">CTA Secondaire (Lien)</label>
                    <input type="text" value={formData.hero_cta_secondary} onChange={(e) => setFormData(p => ({ ...p, hero_cta_secondary: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/2 border border-white/5">
                  <div className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${formData.show_hero_glow === 'true' ? 'bg-brand' : 'bg-white/10'}`} onClick={() => setFormData(p => ({ ...p, show_hero_glow: p.show_hero_glow === 'true' ? 'false' : 'true' }))}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.show_hero_glow === 'true' ? 'right-1' : 'left-1'}`} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold">Activer l'Effet Glow</h5>
                    <p className="text-[10px] text-white/20">Affiche un halo de couleur derrière le texte du Hero.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <button onClick={handleSaveHero} disabled={isPending} className="px-8 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand transition-all flex items-center gap-2 disabled:opacity-50">
                  {isPending ? <RefreshCw className="animate-spin" size={14} /> : saveStatus === 'success' ? <Check className="text-green-600" size={14} /> : <Save size={14} />}
                  {isPending ? 'Enregistrement...' : saveStatus === 'success' ? 'Enregistré !' : 'Mettre à jour le Hero'}
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'footer' && (
            <motion.div
              key="footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 relative z-10"
            >
              <div>
                <h3 className="text-2xl font-bold mb-1">Pied de Page & Contact</h3>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Coordonnées et informations légales</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Description du Footer</label>
                  <textarea rows={3} value={formData.footer_desc} onChange={(e) => setFormData(p => ({ ...p, footer_desc: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 px-6 text-sm text-white focus:border-brand/50 transition-all outline-none resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Téléphone</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input type="text" value={formData.contact_phone} onChange={(e) => setFormData(p => ({ ...p, contact_phone: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input type="text" value={formData.contact_email} onChange={(e) => setFormData(p => ({ ...p, contact_email: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2">Adresse Physique</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    <input type="text" value={formData.contact_address} onChange={(e) => setFormData(p => ({ ...p, contact_address: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-4 pl-12 pr-6 text-sm text-white focus:border-brand/50 transition-all outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="relative">
                     <Share2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                     <input type="text" placeholder="Facebook URL" value={formData.social_facebook} onChange={(e) => setFormData(p => ({ ...p, social_facebook: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-[11px] text-white focus:border-brand/50 transition-all outline-none" />
                   </div>
                   <div className="relative">
                     <Share2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                     <input type="text" placeholder="Instagram URL" value={formData.social_instagram} onChange={(e) => setFormData(p => ({ ...p, social_instagram: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-[11px] text-white focus:border-brand/50 transition-all outline-none" />
                   </div>
                   <div className="relative">
                     <Share2 size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                     <input type="text" placeholder="LinkedIn URL" value={formData.social_linkedin} onChange={(e) => setFormData(p => ({ ...p, social_linkedin: e.target.value }))} className="w-full bg-white/3 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-[11px] text-white focus:border-brand/50 transition-all outline-none" />
                   </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <button onClick={handleSaveFooter} disabled={isPending} className="px-8 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-brand transition-all flex items-center gap-2 disabled:opacity-50">
                  {isPending ? <RefreshCw className="animate-spin" size={14} /> : saveStatus === 'success' ? <Check className="text-green-600" size={14} /> : <Save size={14} />}
                  {isPending ? 'Enregistrement...' : saveStatus === 'success' ? 'Enregistré !' : 'Mettre à jour le Footer'}
                </button>
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
