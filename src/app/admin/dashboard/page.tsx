import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { logoutAction } from '../actions'
import DashboardClient from './DashboardClient'
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/admin')
  }

  const supabase = await createClient()
  const { data: requests, error } = await supabase
    .from('service_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-bg text-text font-sans transition-colors duration-300">
      <header className="border-b border-border glass px-6 py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-display font-bold uppercase tracking-tighter">
            AGENCY <span className="text-brand">DASHBOARD</span>
          </h1>
          <span className="px-2 py-0.5 rounded bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest border border-brand/20">
            Live Leads
          </span>
        </div>
        
        <form action={logoutAction}>
          <button className="text-xs font-bold text-text-sub hover:text-brand uppercase tracking-widest transition-colors border border-border hover:bg-surface px-4 py-2 rounded-lg">
            Déconnexion
          </button>
        </form>
      </header>

      <main className="container mx-auto p-6">
        <DashboardClient initialRequests={requests || []} />
      </main>

      <footer className="border-t border-black/10 dark:border-white/5 py-8 mt-12 transition-colors duration-300">
        <div className="container mx-auto px-6 flex justify-between items-center opacity-30 grayscale cursor-default select-none transition-all hover:opacity-100 hover:grayscale-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">HM.ZONEDZ SYSTEM v1.0.4</p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
