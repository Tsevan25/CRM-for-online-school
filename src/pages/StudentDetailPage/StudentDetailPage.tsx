import { useParams, Navigate } from 'react-router-dom'
import { useAsync } from '@/shared/hooks/useAsync'
import { fetchStudentById } from '@/shared/api/students'
import { fetchLessonsByStudent } from '@/shared/api/lessons'
import { fetchTransactionsByStudent } from '@/shared/api/transactions'
import  StudentDetails  from '@/widgets/StudentDetails/ui/StudentDetails'
import {Spinner} from '@/shared'


const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, loading, error } = useAsync(async () => {
    if (!id) return null
    const student = await fetchStudentById(id)
    const [lessons, transactions] = await Promise.all([
      fetchLessonsByStudent(id),
      fetchTransactionsByStudent(id),
    ])
    return { student, lessons, transactions }
  })

  if (loading) return <Spinner />
  if (error) return <Navigate to="/students" replace />
  if (!data?.student) return <Navigate to="/students" replace />

  return (
    <StudentDetails
      student={data.student}
      lessons={data.lessons}
      transactions={data.transactions}
    />
  )
}

export default StudentDetailPage