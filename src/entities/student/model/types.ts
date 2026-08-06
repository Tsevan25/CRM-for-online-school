import {z} from 'zod';
export interface Student {
  id: string
  fullName: string
  email?: string
  phone?: string
  balance: number
  createdBy: string
  createdAt: string
}

export interface Lesson {
  id: string
  studentId: string
  teacherName: string
  startTime: string
  status: 'scheduled' | 'completed' | 'cancelled'
  price: number
}

export interface Transaction {
  id: string
  studentId: string
  amount: number
  type: 'lesson_payment' | 'top_up' | 'refund' | 'adjustment'
  date: string
  description?: string
}

export const studentSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  initialBalance: z.coerce.number(),
})

export type StudentFormData = z.infer<typeof studentSchema>