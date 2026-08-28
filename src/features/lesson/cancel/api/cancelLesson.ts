import { supabase } from '@/shared/api/supabase'

export const cancelLesson = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('lessons')
    .update({ status: 'cancelled' })
    .eq('id', id)
  if (error) throw error
}