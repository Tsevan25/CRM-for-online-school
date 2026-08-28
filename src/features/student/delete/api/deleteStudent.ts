import { supabase } from '@/shared/api/supabase';

export const deleteStudent = async (id: string): Promise<void> => {
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) throw error
}