import { supabase } from '@/shared/api/supabase'
import type { LessonStatus, LessonWithNames } from '@/entities/lesson/model/types'

export const updateLessonStatus = async (
  id: string,
  status: LessonStatus
): Promise<LessonWithNames> => {
  const { data, error } = await supabase
    .from('lessons')
    .update({ status })
    .eq('id', id)
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
    .single()
  if (error) throw error
  return data as LessonWithNames
}