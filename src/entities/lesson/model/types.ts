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

export interface LessonFormData {
  studentId: string
  teacherId: string
  startTime: string
  endTime: string
  price: number
}