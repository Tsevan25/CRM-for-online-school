export type TransactionType = 'lesson_payment' | 'top_up' | 'refund' | 'adjustment'

export interface Transaction {
  id: string
  studentId: string
  studentName: string
  amount: number       
  type: TransactionType
  date: string
  description?: string
}