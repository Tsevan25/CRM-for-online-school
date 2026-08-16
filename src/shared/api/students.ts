import { supabase } from './supabase'
import type { Student } from '@/entities/student/model/types'

export const fetchStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
  if (error) throw error
  return data as Student[]
}

export const fetchStudentById = async (id: string): Promise<Student> => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Student
}

export const fetchStudentsByIds = async (ids: string[]): Promise<Student[]> => {
  if (ids.length === 0) return []
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .in('id', ids)
  if (error) throw error
  return data as Student[]
}

export const createStudent = async (
  student: Omit<Student, 'id' | 'created_at' | 'created_by'> & { created_by: string }
): Promise<Student> => {
  const { data, error } = await supabase
    .from('students')
    .insert(student)
    .select('*')
    .single()
  if (error) throw error
  return data as Student
}

export const updateStudent = async (
  id: string,
  updates: Partial<Student>
): Promise<Student> => {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data as Student
}

export const deleteStudent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id)
  if (error) throw error
}