import { supabase } from '@/shared/api/supabase'
import type { Student } from '../model/types'

export const fetchStudents = async (): Promise<Student[]> => {
  const { data, error } = await supabase.from('students').select('*')
  if (error) throw error
  return data as Student[]
}

export const fetchStudentById = async (id: string): Promise<Student> => {
  const { data, error } = await supabase.from('students').select('*').eq('id', id).single()
  if (error) throw error
  return data as Student
}

export const fetchStudentsByIds = async (ids: string[]): Promise<Student[]> => {
  if (ids.length === 0) return []
  const { data, error } = await supabase.from('students').select('*').in('id', ids)
  if (error) throw error
  return data as Student[]
}