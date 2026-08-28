import { supabase } from '@/shared/api/supabase'
import type { UserProfile } from '../model/types'

export const fetchUsers = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return data as UserProfile[]
}