'use client'

import React from 'react'
import { 
  MessageSquare, Activity, Users, Settings, LogOut 
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
  onLogout: () => void
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'requests', label: 'Leads & Demandes', icon: MessageSquare },
    { id: 'stats', label: 'Analytiques', icon: Activity },
    { id: 'team', label: 'Équipe Interne', icon: Users },
    { id: 'settings', label: 'Configuration', icon: Settings },
  ]

  return (
    <aside className="w-full md:w-24 lg:w-72 bg-[#0f1117] border-r border-white/5 flex flex-col z-50">
      <div className="p-8 flex items-center gap-4">
        <div className="w-14 h-14 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-brand opacity-20 blur-md rounded-full"></div>
          <img src="/logo.png" alt="ProServices" className="relative w-full h-full object-contain" />
        </div>
        <div className="hidden lg:block">
          <h1 className="font-display font-bold text-xl tracking-tight">Agency<span className="text-brand">Hub</span></h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Admin Control</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
              ? 'bg-brand text-white shadow-xl shadow-brand/10' 
              : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-brand transition-colors'} />
            <span className="hidden lg:inline text-[13px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6">
         <button 
           onClick={onLogout}
           className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-bold group"
         >
           <LogOut size={20} />
           <span className="hidden lg:inline text-[13px]">Déconnexion</span>
         </button>
      </div>
    </aside>
  )
}
