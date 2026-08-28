import { supabase } from '@/shared/api/supabase'
import type { Lesson, LessonWithNames } from '@/entities/lesson/model/types'

export const updateLesson = async (
  id: string,
  updates: Partial<Lesson>
): Promise<LessonWithNames> => {
  const { data, error } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', id)
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
    .single()
  if (error) throw error
  return data as LessonWithNames
}