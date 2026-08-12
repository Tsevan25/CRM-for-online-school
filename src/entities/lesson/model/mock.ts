import type { Lesson } from './types'

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    student_id: '1',
    student_name: 'Alice Johnson',
    teacher_id: 't1',
    teacher_name: 'Mr. Smith',
    start_time: '2026-08-10T09:00:00Z',
    end_time: '2026-08-10T10:00:00Z',
    status: 'scheduled',
    price: 50,
  },
  {
    id: 'l2',
    student_id: '2',
    student_name: 'Bob Smith',
    teacher_id: 't2',
    teacher_name: 'Ms. Davis',
    start_time: '2026-08-11T11:00:00Z',
    end_time: '2026-08-11T12:00:00Z',
    status: 'completed',
    price: 40,
  },
  {
    id: 'l3',
    student_id: '1',
    student_name: 'Alice Johnson',
    teacher_id: 't2',
    teacher_name: 'Ms. Davis',
    start_time: '2026-08-12T09:00:00Z',
    end_time: '2026-08-12T10:00:00Z',
    status: 'cancelled',
    price: 0,
  },
]