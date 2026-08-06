import type { Lesson } from './types'

export const mockLessons: Lesson[] = [
  {
    id: 'l1', studentId: '1', studentName: 'Alice Johnson',
    teacherId: 't1', teacherName: 'Mr. Smith',
    startTime: '2025-07-10T09:00:00Z', endTime: '2025-07-10T10:00:00Z',
    status: 'scheduled', price: 50
  },
  {
    id: 'l2', studentId: '2', studentName: 'Bob Smith',
    teacherId: 't2', teacherName: 'Ms. Davis',
    startTime: '2025-07-10T11:00:00Z', endTime: '2025-07-10T12:00:00Z',
    status: 'completed', price: 40
  },
  {
    id: 'l3', studentId: '1', studentName: 'Alice Johnson',
    teacherId: 't2', teacherName: 'Ms. Davis',
    startTime: '2025-07-11T09:00:00Z', endTime: '2025-07-11T10:00:00Z',
    status: 'cancelled', price: 0
  }
]