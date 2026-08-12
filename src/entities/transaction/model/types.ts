export type TransactionType = 'lesson_payment' | 'top_up' | 'refund' | 'adjustment'

export interface Transaction {
  id: string
  student_id: string
  amount: number
  type: TransactionType
  created_at: string
  description?: string | null
  lesson_id?: string | null
}

export interface TransactionWithStudent extends Transaction {
  student: { full_name: string } | null
}