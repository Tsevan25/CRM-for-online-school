import { supabase } from '@/shared/api/supabase'

export const updateUserRole = async (id: string, role: 'admin' | 'manager' | 'teacher') => {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', id)
  if (error) throw error
}