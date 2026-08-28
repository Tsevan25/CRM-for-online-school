import { supabase } from '@/shared/api/supabase'
import type { LessonWithNames } from '../model/types'

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

export const fetchLessonsByStudent = async (studentId: string): Promise<LessonWithNames[]> => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)')
    .eq('student_id', studentId)
  if (error) throw error
  return data as LessonWithNames[]
}