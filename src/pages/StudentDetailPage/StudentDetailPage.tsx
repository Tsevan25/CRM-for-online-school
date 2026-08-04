import { Navigate } from 'react-router-dom'
import { useStudentDetail } from '@/widgets/StudentDetails/model/useStudentDetail'
import  StudentDetails  from '@/widgets/StudentDetails/ui/StudentDetails'

const StudentDetailPage = () => {
  const { student, lessons, transactions } = useStudentDetail()

  if (!student) return <Navigate to="/students" replace />

  return <StudentDetails student={student} lessons={lessons} transactions={transactions} />
}

export default StudentDetailPage