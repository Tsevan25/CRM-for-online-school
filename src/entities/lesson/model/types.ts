import { z } from 'zod'


export type LessonStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show'

export interface Lesson {
  id: string
  studentId: string
  studentName: string
  teacherId: string
  teacherName: string
  startTime: string
  endTime: string
  status: LessonStatus
  price: number
}

export const lessonSchema = z.object({
  studentName: z.string().min(1, 'Student is required'),
  teacherName: z.string().min(1, 'Teacher is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  price: z.coerce.number().min(0, 'Price must be 0 or more'),
})

export type LessonFormData = z.infer<typeof lessonSchema>