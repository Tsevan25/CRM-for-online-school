import { supabase } from './supabase'
import type { UserProfile } from '@/entities/user'

export const fetchUsers = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  if (error) throw error
  return data as UserProfile[]
}