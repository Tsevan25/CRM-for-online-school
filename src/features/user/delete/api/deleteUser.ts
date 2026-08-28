import { supabase } from '@/shared/api/supabase'

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw error
}