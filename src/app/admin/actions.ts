'use server'

import { z } from 'zod'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const loginSchema = z.object({
  passcode: z.string().min(1, 'Passcode is required'),
})

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    passcode: formData.get('passcode'),
  })

  if (!validatedFields.success) {
    return { error: 'Passcode requis' }
  }

  const passcode = validatedFields.data.passcode.trim()
  const supabase = await createClient()

  let adminMatch = null
  
  try {
    // 1. Check if passcode exists in the 'admins' table
    const { data } = await supabase
      .from('admins')
      .select('name')
      .eq('passcode', passcode)
      .single()
      
    adminMatch = data
  } catch (err) {
    // Ignore errors (e.g. if table doesn't exist yet)
    console.error('Supabase admin check error:', err)
  }

  // 2. Fallback to Master Passcode (environment variable)
  const masterPasscode = (process.env.ADMIN_PASSCODE || 'proservices2025').trim()
  const isMasterPasscode = passcode === masterPasscode

  if (adminMatch || isMasterPasscode) {
    await createSession('admin')
    redirect('/admin/dashboard')
  }

  return { error: 'Passcode incorrect' }
}

export async function logoutAction() {
  await deleteSession()
  redirect('/admin')
}

// Service Request Management Actions
export async function getServiceRequestsAction() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('service_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return { error: error.message }
  return { data }
}

export async function updateRequestStatusAction(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('service_requests')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function deleteRequestAction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('service_requests')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function getAgencyStatsAction() {
  const supabase = await createClient()
  
  const { data: requests } = await supabase.from('service_requests').select('budget, status')
  const totalRequests = requests?.length || 0
  const pendingRequests = requests?.filter(r => r.status === 'pending').length || 0
  const completedRequests = requests?.filter(r => r.status === 'completed').length || 0
  
  const totalEstimatedRevenue = requests?.reduce((acc, r) => {
    const budgetVal = parseFloat(String(r.budget || '0').replace(/[^0-9.]/g, ''))
    return acc + (isNaN(budgetVal) ? 0 : budgetVal)
  }, 0) || 0

  return {
    totalRequests,
    pendingRequests,
    completedRequests,
    totalEstimatedRevenue
  }
}

// Team Management Actions
export async function getAdminsAction() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('admins').select('*')
  if (error) return { error: error.message }
  return { data }
}

export async function addAdminAction(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const passcode = formData.get('passcode') as string

  const { error } = await supabase.from('admins').insert([{ name, passcode }])
  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function deleteAdminAction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('admins').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/dashboard')
  return { success: true }
}
