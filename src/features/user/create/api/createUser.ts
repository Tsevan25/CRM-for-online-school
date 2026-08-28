import { supabase } from '@/shared/api/supabase'

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