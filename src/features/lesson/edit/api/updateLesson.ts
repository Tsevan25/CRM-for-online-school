import { supabase } from '@/shared/api/supabase'
import type { Lesson, LessonWithNames } from '@/entities/lesson/model/types'

export const updateLesson = async (
  id: string,
  updates: Partial<Lesson>
): Promise<LessonWithNames> => {

  const { data: lessonData, error: lessonError } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', id)
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
    .single()

  if (lessonError) throw lessonError

  if (updates.price !== undefined) {

    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('id')
      .eq('lesson_id', id)
      .eq('type', 'lesson_payment')
      .maybeSingle()

    if (existingTransaction) {

      await supabase
        .from('transactions')
        .update({ amount: -updates.price })
        .eq('id', existingTransaction.id)
    } else {

      await supabase.from('transactions').insert({
        student_id: lessonData.student_id,
        amount: -updates.price,
        type: 'lesson_payment',
        lesson_id: id,
        description: 'Lesson scheduled',
      })
    }
  }

  return lessonData as LessonWithNames
}