import { supabase } from '@/shared/api/supabase'
import type { LessonWithNames } from '@/entities/lesson/model/types'

export const createLessonWithPayment = async (lesson: {
  student_id: string
  teacher_id: string
  start_time: string
  end_time: string
  price: number
  created_by: string
}): Promise<LessonWithNames> => {
  const { data, error } = await supabase.rpc('create_lesson_with_payment', {
    p_student_id: lesson.student_id,
    p_teacher_id: lesson.teacher_id,
    p_start_time: lesson.start_time,
    p_end_time: lesson.end_time,
    p_price: lesson.price,
    p_created_by: lesson.created_by,
  })
  if (error) throw error
  return data as unknown as LessonWithNames
}