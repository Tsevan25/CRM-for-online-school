import { z } from 'zod'

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

export const transactionSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  amount: z.coerce.number(),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
})

export type TransactionFormData = z.infer<typeof transactionSchema>