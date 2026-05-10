import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardClient from './DashboardClient'

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await verifySession()

  if (!session.isAuth) {
    redirect('/admin')
  }

  const supabase = await createClient()
  
  const [
    { data: requests },
    { data: services },
    { data: settings }
  ] = await Promise.all([
    supabase.from('service_requests').select('*').order('created_at', { ascending: false }),
    supabase.from('services').select('*').order('created_at', { ascending: true }),
    supabase.from('agency_settings').select('*')
  ])

  return <DashboardClient 
    initialRequests={requests || []} 
    initialServices={services || []} 
    initialSettings={settings || []} 
  />
}
