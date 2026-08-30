import { z } from 'zod'

export interface Student {
  id: string
  full_name: string
  email?: string
  phone?: string
  balance: number
  created_by: string
  created_at: string
}

export const studentSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  initialBalance: z.coerce.number(),
})

export type StudentFormData = z.infer<typeof studentSchema>