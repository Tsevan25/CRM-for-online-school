import { supabase } from './supabase'
import type { Student } from '@/entities/student/model/types'
import type { UserProfile } from '@/entities/user/model/types'
import type { LessonWithNames } from '@/entities/lesson/model/types'
import type { TransactionWithStudent } from '@/entities/transaction/model/types'

export interface DashboardRawData {
  students: Student[]
  totalStudents: number
  teachers: UserProfile[]
  totalTeachers: number
  lessons: LessonWithNames[]
  transactions: TransactionWithStudent[]
}

export async function fetchDashboardData(): Promise<DashboardRawData> {
  const [studentsRes, teachersRes, lessonsRes, transactionsRes] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact' }),
    supabase.from('profiles').select('*', { count: 'exact' }).eq('role', 'teacher'),
    supabase.from('lessons').select('*, student:students(full_name), teacher:profiles!lessons_teacher_id_fkey(full_name)'),
    supabase.from('transactions').select('*, student:students(full_name)'),
  ])

  if (studentsRes.error) throw studentsRes.error
  if (teachersRes.error) throw teachersRes.error
  if (lessonsRes.error) throw lessonsRes.error
  if (transactionsRes.error) throw transactionsRes.error

  return {
    students: (studentsRes.data as Student[]) || [],
    totalStudents: studentsRes.count || 0,
    teachers: (teachersRes.data as UserProfile[]) || [],
    totalTeachers: teachersRes.count || 0,
    lessons: (lessonsRes.data as LessonWithNames[]) || [],
    transactions: (transactionsRes.data as TransactionWithStudent[]) || [],
  }
}