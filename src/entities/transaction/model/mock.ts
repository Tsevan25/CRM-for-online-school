import type { Transaction } from './types'

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    studentId: '1',
    studentName: 'Alice Johnson',
    amount: 100,
    type: 'top_up',
    date: '2025-06-01T08:00:00Z',
    description: 'Initial deposit',
  },
  {
    id: 't2',
    studentId: '1',
    studentName: 'Alice Johnson',
    amount: -50,
    type: 'lesson_payment',
    date: '2025-06-10T09:00:00Z',
    description: 'Lesson with Mr. Smith',
  },
  {
    id: 't3',
    studentId: '2',
    studentName: 'Bob Smith',
    amount: 80,
    type: 'top_up',
    date: '2025-06-02T10:00:00Z',
  },
  {
    id: 't4',
    studentId: '2',
    studentName: 'Bob Smith',
    amount: -40,
    type: 'lesson_payment',
    date: '2025-06-11T10:00:00Z',
    description: 'Lesson with Ms. Davis',
  },
]