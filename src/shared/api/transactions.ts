import { supabase } from './supabase'
import type { Transaction, TransactionWithStudent } from '@/entities/transaction/model/types'

export const fetchTransactions = async (): Promise<TransactionWithStudent[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, student:students(full_name)')
  if (error) throw error
  return data as TransactionWithStudent[]
}

export const createTransaction = async (transaction: {
  student_id: string
  amount: number
  type: Transaction['type']
  description?: string | null
}): Promise<TransactionWithStudent> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select('*, student:students(full_name)')
    .single()
  if (error) throw error
  return data as TransactionWithStudent
}