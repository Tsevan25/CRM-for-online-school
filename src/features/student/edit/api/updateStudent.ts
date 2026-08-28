import { supabase } from '@/shared/api/supabase'
import type { Student } from '@/entities/student'

export const updateStudent = async (id: string, updates: Partial<Student>): Promise<Student> => {
  const { data, error } = await supabase.from('students').update(updates).eq('id', id).select('*').single()
  if (error) throw error
  return data as Student
}