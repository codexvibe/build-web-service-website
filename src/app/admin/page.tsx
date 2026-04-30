'use client'

import { useState } from 'react'
import { loginAction } from './actions'
import { motion } from 'framer-motion'
import { useActionState } from 'react'
import { ShieldAlert, ShieldCheck, ArrowRight, Lock, Command } from 'lucide-react'

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#39ff14]/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#39ff14]/[0.02] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Decorative Badge */}
        <div className="flex justify-center mb-8">
           <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.3em]">Protocole de Sécurité Actif</span>
           </div>
        </div>

        <div className="bg-[#09090b] border border-white/[0.08] p-10 lg:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
           {/* Glass Effect */}
           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
           
           <div className="text-center mb-10 relative z-10">
             <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mx-auto mb-6 shadow-inner group transition-all">
               <Lock className="text-[#39ff14]" size={28} />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
               Admin <span className="text-[#39ff14]">Console</span>
             </h1>
             <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
               Accès restreint aux administrateurs autorisés de ProServices
             </p>
           </div>

           <form action={formAction} className="space-y-6 relative z-10">
             <div className="space-y-3">
               <div className="flex justify-between items-center px-2">
                  <label htmlFor="passcode" className="text-[9px] font-bold text-white/30 uppercase tracking-widest">
                    Code de Déverrouillage
                  </label>
                  <Command size={12} className="text-white/10" />
               </div>
               <input
                 type="password"
                 name="passcode"
                 id="passcode"
                 required
                 autoFocus
                 placeholder="••••••••"
                 className="w-full bg-white/[0.03] border border-white/[0.05] text-white px-6 py-5 rounded-2xl focus:outline-none focus:border-[#39ff14]/40 focus:bg-white/[0.05] transition-all text-center text-2xl tracking-[0.8em] placeholder:text-white/5 placeholder:tracking-normal"
               />
             </div>

             {state?.error && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-3 text-red-400 text-[10px] font-bold bg-red-500/5 p-4 rounded-xl border border-red-500/10 uppercase tracking-widest"
               >
                 <ShieldAlert size={14} className="shrink-0" />
                 <span>{state.error}</span>
               </motion.div>
             )}

             <button
               type="submit"
               disabled={isPending}
               className="w-full bg-white text-black font-bold text-xs py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] hover:bg-[#39ff14] transition-all group disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-white/5"
             >
               {isPending ? 'Identification...' : (
                 <>
                   Initialiser la Session
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </>
               )}
             </button>
           </form>
        </div>

        <div className="text-center mt-10">
           <p className="text-[9px] text-white/10 font-bold uppercase tracking-[0.4em] mb-4">ProServices Digital Intelligence — 2025</p>
           <div className="flex justify-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white/5" />
              <div className="w-1 h-1 rounded-full bg-[#39ff14]/20" />
              <div className="w-1 h-1 rounded-full bg-white/5" />
           </div>
        </div>
      </motion.div>
    </main>
  )
}
