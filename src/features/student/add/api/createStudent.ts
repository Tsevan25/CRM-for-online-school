import { supabase } from '@/shared/api/supabase'
import type { Student } from '@/entities/student'

export const createStudent = async (
  student: Omit<Student, 'id' | 'created_at' | 'created_by'> & { created_by: string }
): Promise<Student> => {
  const { data, error } = await supabase.from('students').insert(student).select('*').single()
  if (error) throw error
  return data as Student
}