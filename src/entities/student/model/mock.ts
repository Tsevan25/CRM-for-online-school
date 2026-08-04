import type { Student, Lesson, Transaction  } from './types'


export const mockStudents: Student[] = [
  {
    id: '1',
    fullName: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 234-567-8901',
    balance: 1200,
    createdBy: 'admin',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    fullName: 'Bob Smith',
    email: 'bob@example.com',
    balance: 850,
    createdBy: 'manager1',
    createdAt: '2025-02-20T12:30:00Z',
  },
  {
    id: '3',
    fullName: 'Charlie Brown',
    phone: '+44 1234-567890',
    balance: 0,
    createdBy: 'manager1',
    createdAt: '2025-03-10T09:00:00Z',
  },
]

export const mockLessons: Lesson[] = [
  { id: 'l1', studentId: '1', teacherName: 'Mr. Smith', startTime: '2025-06-10T09:00:00Z', status: 'completed', price: 50 },
  { id: 'l2', studentId: '1', teacherName: 'Ms. Davis', startTime: '2025-06-12T11:00:00Z', status: 'scheduled', price: 50 },
  { id: 'l3', studentId: '2', teacherName: 'Mr. Smith', startTime: '2025-06-11T10:00:00Z', status: 'completed', price: 40 },
  { id: 'l4', studentId: '3', teacherName: 'Ms. Davis', startTime: '2025-06-10T14:00:00Z', status: 'cancelled', price: 0 },
]

export const mockTransactions: Transaction[] = [
  { id: 't1', studentId: '1', amount: 100, type: 'top_up', date: '2025-06-01T08:00:00Z', description: 'Initial deposit' },
  { id: 't2', studentId: '1', amount: -50, type: 'lesson_payment', date: '2025-06-10T09:00:00Z', description: 'Lesson with Mr. Smith' },
  { id: 't3', studentId: '2', amount: 80, type: 'top_up', date: '2025-06-02T10:00:00Z' },
  { id: 't4', studentId: '2', amount: -40, type: 'lesson_payment', date: '2025-06-11T10:00:00Z' },
  { id: 't5', studentId: '3', amount: 50, type: 'top_up', date: '2025-06-03T12:00:00Z' },
]