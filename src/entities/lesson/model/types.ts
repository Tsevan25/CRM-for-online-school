import { z } from 'zod'

export type LessonStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show'

export interface Lesson {
  id: string
  student_id: string
  teacher_id: string
  start_time: string
  end_time: string
  status: LessonStatus
  price: number
  created_by: string
  created_at: string
}

export interface LessonWithNames extends Lesson {
  student: { full_name: string } | null
  teacher: { full_name: string } | null
}

export const lessonSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  teacherId: z.string().min(1, 'Teacher is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  price: z.coerce.number().min(0, 'Price must be 0 or more'),
})

export type LessonFormData = z.infer<typeof lessonSchema>