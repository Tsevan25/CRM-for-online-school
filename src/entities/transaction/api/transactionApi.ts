import { supabase } from '@/shared/api/supabase'
import type { TransactionWithStudent } from '../model/types'

export const fetchTransactions = async (): Promise<TransactionWithStudent[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, student:students(full_name)')
    .order('created_at', { ascending: false }) 
  if (error) throw error
  return data as TransactionWithStudent[]
}

export const fetchTransactionsByStudent = async (studentId: string): Promise<TransactionWithStudent[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, student:students(full_name)')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false }) 
  if (error) throw error
  return data as TransactionWithStudent[]
}