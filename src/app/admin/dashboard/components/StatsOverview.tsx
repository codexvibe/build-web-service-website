'use client'

import React from 'react'
import { 
  Users, TrendingUp, CheckCircle2, 
  Clock, DollarSign, ArrowUpRight, ArrowDownRight 
} from 'lucide-react'
import { motion } from 'framer-motion'

interface StatsOverviewProps {
  totalLeads: number
  pendingLeads: number
  completedLeads: number
  totalRevenue: string
}

export default function StatsOverview({ totalLeads, pendingLeads, completedLeads, totalRevenue }: StatsOverviewProps) {
  const stats = [
    { 
      label: 'Total Leads', 
      val: totalLeads, 
      icon: Users, 
      trend: '+12%', 
      trendUp: true,
      description: 'Nouveaux prospects'
    },
    { 
      label: 'En Attente', 
      val: pendingLeads, 
      icon: Clock, 
      trend: '4 active', 
      trendUp: true,
      description: 'À traiter'
    },
    { 
      label: 'Terminés', 
      val: completedLeads, 
      icon: CheckCircle2, 
      trend: '+5', 
      trendUp: true,
      description: 'Projets livrés'
    },
    { 
      label: 'Revenu Est.', 
      val: totalRevenue, 
      icon: DollarSign, 
      trend: '+8.2%', 
      trendUp: true,
      description: 'Potentiel total'
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[#09090b] p-6 rounded-2xl border border-white/[0.05] hover:border-white/[0.1] transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/60 group-hover:text-[#39ff14] transition-colors">
              <stat.icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
              stat.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
            }`}>
              {stat.trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {stat.trend}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.1em]">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-heading font-bold text-white tracking-tight">{stat.val}</h4>
            </div>
            <p className="text-[10px] text-white/20 font-medium">{stat.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
