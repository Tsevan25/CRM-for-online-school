import { supabase } from './supabase'
import type { UserProfile } from '@/entities/user/model/types'

export const fetchUsers = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  if (error) throw error
  return data as UserProfile[]
}

export const updateUserRole = async (id: string, role: 'admin' | 'manager' | 'teacher') => {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', id)
  if (error) throw error
}

export const deleteUser = async (id: string) => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export const createUser = async (userData: {
  email: string
  password: string
  full_name: string
  role: 'admin' | 'manager' | 'teacher'
}): Promise<void> => {
  const { data, error } = await supabase.functions.invoke('super-service', {
    body: userData,
  })

  if (error) {
    throw new Error(error.message || 'Failed to create user')
  }


  if (data && typeof data === 'object' && 'success' in data && (data as { success: boolean }).success === false) {
    const message = (data as { error?: string }).error || 'Unknown error'
    throw new Error(message)
  }
}