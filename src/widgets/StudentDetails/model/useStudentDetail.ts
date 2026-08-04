import { useParams } from 'react-router-dom'
import { mockStudents, mockLessons, mockTransactions } from '@/entities/student/model/mock'


export const useStudentDetail = () => {
  const { id } = useParams<{ id: string }>()
  const student = mockStudents.find((s) => s.id === id) ?? null
  const lessons = id ? mockLessons.filter((l) => l.studentId === id) : []
  const transactions = id ? mockTransactions.filter((t) => t.studentId === id) : []

  return { student, lessons, transactions, id }
}