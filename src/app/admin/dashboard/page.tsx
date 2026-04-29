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
  const { data: requests } = await supabase
    .from('service_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return <DashboardClient initialRequests={requests || []} />
}
