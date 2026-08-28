import { supabase } from '@/shared/api/supabase'
import type { TransactionWithStudent, TransactionType } from '@/entities/transaction/model/types'

export const createTransaction = async (transaction: {
  student_id: string
  amount: number
  type: TransactionType
  description?: string
}): Promise<TransactionWithStudent> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select('*, student:students(full_name)')
    .single()
  if (error) throw error
  return data as TransactionWithStudent
}