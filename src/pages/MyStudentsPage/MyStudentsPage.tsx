import { useAppSelector } from '@/app/store'
import  StudentList  from '@/widgets/StudentList'
import { fetchLessonsByTeacher } from '@/shared/api/lessons'
import { fetchStudentsByIds } from '@/shared/api/students'
import type { Student } from '@/entities/student/model/types'
import { Spinner, ErrorMessage } from '@/shared/ui'
import { useAsync } from '@/shared/hooks/useAsync'
import { useState } from 'react'

const MyStudentsPage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [students, setStudents] = useState<Student[]>([])

  const { loading, error } = useAsync(async () => {
    if (!user?.id) return []
    const lessons = await fetchLessonsByTeacher(user.id)
    const studentIds = [...new Set(lessons.map((l) => l.student_id))]
    const studentData = await fetchStudentsByIds(studentIds)
    setStudents(studentData)
    return studentData
  })

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <StudentList
      students={students}
      canAdd={false}
      canEdit={false}
      canDelete={false}
    />
  )
}

export default MyStudentsPage