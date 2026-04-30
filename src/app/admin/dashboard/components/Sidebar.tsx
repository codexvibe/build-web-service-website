'use client'

import React from 'react'
import { 
  LayoutDashboard, Users, MessageSquare, 
  BarChart3, Settings, LogOut, ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
  onLogout: () => void
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'requests', label: 'Demandes', icon: MessageSquare },
    { id: 'services', label: 'Catalogue', icon: Layout },
    { id: 'stats', label: 'Analytiques', icon: BarChart3 },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ]

  return (
    <aside className="w-full md:w-20 lg:w-72 bg-[#09090b] border-r border-white/[0.05] flex flex-col z-50 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 lg:p-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#39ff14] to-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.2)]">
          <LayoutDashboard size={20} className="text-black" />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <h1 className="font-heading font-bold text-lg tracking-tight text-white leading-none">
            Pro<span className="text-[#39ff14]">Services</span>
          </h1>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mt-1">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive 
                ? 'text-white' 
                : 'text-white/40 hover:text-white/80 hover:bg-white/[0.03]'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white/[0.05] border border-white/[0.08] rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className={`relative z-10 p-1.5 rounded-lg transition-colors ${
                isActive ? 'bg-[#39ff14]/10 text-[#39ff14]' : 'group-hover:text-white/80'
              }`}>
                <item.icon size={18} />
              </div>
              
              <span className="hidden lg:inline relative z-10 text-sm font-medium tracking-tight">
                {item.label}
              </span>

              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden lg:block ml-auto relative z-10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                </motion.div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 mt-auto border-t border-white/[0.05]">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all group"
        >
          <div className="p-1.5 rounded-lg group-hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />
          </div>
          <span className="hidden lg:inline text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}
