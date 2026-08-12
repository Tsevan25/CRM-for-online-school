import { supabase } from './supabase'
import type { Lesson, LessonWithNames } from '@/entities/lesson/model/types'

export const fetchLessons = async (): Promise<LessonWithNames[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
  if (error) throw error
  return data as LessonWithNames[]
}

export const fetchLessonsByTeacher = async (teacherId: string): Promise<LessonWithNames[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
    .eq('teacher_id', teacherId)
  if (error) throw error
  return data as LessonWithNames[]
}

export const createLesson = async (lesson: {
  student_id: string
  teacher_id: string
  start_time: string
  end_time: string
  price: number
  created_by: string
}): Promise<LessonWithNames> => {
  const { data, error } = await supabase
    .from('lessons')
    .insert({ ...lesson, status: 'scheduled' })
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
    .single()
  if (error) throw error
  return data as LessonWithNames
}

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

export const cancelLesson = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('lessons')
    .update({ status: 'cancelled' })
    .eq('id', id)
  if (error) throw error
}