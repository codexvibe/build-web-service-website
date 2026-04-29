'use client'

import React from 'react'
import { MessageSquare, Clock, CheckCircle2, Zap } from 'lucide-react'

interface StatsOverviewProps {
  totalLeads: number
  pendingLeads: number
  completedLeads: number
  totalRevenue: string
}

export default function StatsOverview({ totalLeads, pendingLeads, completedLeads, totalRevenue }: StatsOverviewProps) {
  const stats = [
    { label: 'Total Leads', val: totalLeads, icon: MessageSquare, color: 'brand' },
    { label: 'En Attente', val: pendingLeads, icon: Clock, color: 'amber-500' },
    { label: 'Terminés', val: completedLeads, icon: CheckCircle2, color: 'emerald-500' },
    { label: 'Revenue Est.', val: totalRevenue, icon: Zap, color: 'brand' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#0f1117] p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}/5 blur-[40px] rounded-full -mr-8 -mt-8`} />
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h4 className="text-2xl font-display font-bold text-white">{stat.val}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
