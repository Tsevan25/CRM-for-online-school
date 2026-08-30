import { useNavigate } from 'react-router-dom'
import { useAsync } from '@/shared/hooks/useAsync'
import { fetchStudents, fetchStudentsByIds } from '@/entities/student'
import { fetchLessonsByTeacher } from '@/entities/lesson/api/lessonApi'
import { AddStudentAction } from '@/features/student/add'
import { EditStudentAction } from '@/features/student/edit'
import { DeleteStudentAction } from '@/features/student/delete'

import {
  PageHeader,
  DataTable,
  Card,
  EmptyState,
  AsyncBoundary,
  Button,
  SearchInput
} from '@/shared/ui'
import type { Column } from '@/shared/ui/DataTable'
import { useSearch } from '@/shared/hooks/useSearch'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import type { Student } from '@/entities/student'
import styles from './StudentsList.module.css'

interface StudentListProps {
  teacherId?: string
  canAdd?: boolean
  canEdit?: boolean
  canDelete?: boolean
}

export const StudentsList = ({
  teacherId,
  canAdd = true,
  canEdit = true,
  canDelete = true,
}: StudentListProps) => {
  const navigate = useNavigate()

  const canAddFinal = teacherId ? false : canAdd
  const canEditFinal = teacherId ? false : canEdit
  const canDeleteFinal = teacherId ? false : canDelete

  const { data, loading, error, refetch } = useAsync(async () => {
    if (teacherId) {
      const lessons = await fetchLessonsByTeacher(teacherId)
      const studentIds = [...new Set(lessons.map((l) => l.student_id))]
      const students = await fetchStudentsByIds(studentIds)
      return students
    }
    return fetchStudents()
  })

  const students = data ?? []

  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    students,
    (student) => `${student.full_name} ${student.email ?? ''} ${student.phone ?? ''}`
  )

  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (student) => (
        <Button
          variant="secondary"
          size="small"
          onClick={() => navigate(`/students/${student.id}`)}
        >
          {student.full_name}
        </Button>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (student) => student.email || '—',
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (student) => student.phone || '—',
    },
    {
      key: 'balance',
      header: 'Balance',
      render: (student) => formatCurrency(student.balance),
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (student) =>
        new Date(student.created_at).toLocaleDateString('en-US'),
    },
    ...(canEditFinal || canDeleteFinal
      ? [
          {
            key: 'actions',
            header: 'Actions',
            render: (student: Student) => (
              <>
                {canEditFinal && (
                  <EditStudentAction student={student} onSuccess={refetch} />
                )}
                {canDeleteFinal && (
                  <DeleteStudentAction student={student} onSuccess={refetch} />
                )}
              </>
            ),
          },
        ]
      : []),
  ]

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className={styles.container}>
        <PageHeader
          title="Students"
          action={
            canAddFinal ? <AddStudentAction onSuccess={refetch} /> : undefined
          }
        />
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search students..."
        />
        <Card padding="small">
          {filteredData.length === 0 ? (
            <EmptyState message="No students" />
          ) : (
            <DataTable columns={columns} data={filteredData} keyField="id" />
          )}
        </Card>
      </div>
    </AsyncBoundary>
  )
}