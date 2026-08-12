import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import  StudentDetail  from '@/widgets/StudentDetails/ui/StudentDetails'
import { fetchStudentById } from '@/shared/api/students'
import type { Student } from '@/entities/student/model/types'

const StudentDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        const data = await fetchStudentById(id)
        setStudent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Student not found')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <Navigate to="/students" replace />
  if (!student) return <Navigate to="/students" replace />

  
  return <StudentDetail student={student} lessons={[]} transactions={[]} />
}

export default StudentDetailPage