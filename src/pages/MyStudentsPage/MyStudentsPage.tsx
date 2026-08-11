import { useMemo } from 'react'
import { useAppSelector } from '@/app/store'
import  StudentList  from '@/widgets/StudentList'
import { mockStudents } from '@/entities/student/model/mock'
import { mockLessons } from '@/entities/lesson/model/mock'
import type { Student } from '@/entities/student/model/types'

const MyStudentsPage = () => {
  const { user } = useAppSelector((state) => state.auth)

  const teacherLessons = useMemo(
    () => mockLessons.filter((lesson) => lesson.teacherId === user?.id),
    [user?.id]
  )

  const studentIds = useMemo(
    () => [...new Set(teacherLessons.map((l) => l.studentId))],
    [teacherLessons]
  )

  const students: Student[] = useMemo(
    () => mockStudents.filter((s) => studentIds.includes(s.id)),
    [studentIds]
  )

  return <StudentList students={students} canAdd={false} canEdit={false} canDelete={false} />
}

export default MyStudentsPage