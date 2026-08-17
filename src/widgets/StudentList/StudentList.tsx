import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Student, StudentFormData } from '@/entities/student/model/types'
import { AddStudentModal } from '@/features/student'
import { EditStudentModal } from '@/features/student'
import { DeleteStudentConfirm } from '@/features/student'
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent as deleteStudentAPI,
} from '@/shared/api/students'
import { useAppSelector } from '@/app/store'
import { useAsync, Spinner, ErrorMessage, Button, Card, EmptyState, DataTable, type Column, formatCurrency, Typography } from '@/shared'
import styles from './StudentList.module.css'
import { UserPen, Trash } from 'lucide-react'

interface StudentListProps {
  students?: Student[]
  canAdd?: boolean
  canEdit?: boolean
  canDelete?: boolean
}

const StudentList = ({
  students: externalStudents,
  canAdd = true,
  canEdit = true,
  canDelete = true,
}: StudentListProps) => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const [internalStudents, setInternalStudents] = useState<Student[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null)

  const students = externalStudents ?? internalStudents
  const isExternal = !!externalStudents

  const { loading, error, refetch } = useAsync(async () => {
    if (isExternal) return []
    const data = await fetchStudents()
    setInternalStudents(data)
    return data
  })

  const handleAddStudent = async (data: StudentFormData) => {
    if (!user?.id) return
    try {
      await createStudent({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        balance: data.initialBalance,
        created_by: user.id,
      })
      setIsAddModalOpen(false)
      await refetch()
    } catch (err) {
      console.error('Error creating student:', err)
    }
  }

  const handleEditStudent = async (data: StudentFormData) => {
    if (!editingStudent) return
    try {
      await updateStudent(editingStudent.id, {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        balance: data.initialBalance,
      })
      setEditingStudent(null)
      await refetch()
    } catch (err) {
      console.error('Error updating student:', err)
    }
  }

  const handleDeleteStudent = async () => {
    if (!deletingStudent) return
    try {
      await deleteStudentAPI(deletingStudent.id)
      setDeletingStudent(null)
      await refetch()
    } catch (err) {
      console.error('Error deleting student:', err)
    }
  }

  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (student) =>
        !isExternal ? (
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigate(`/students/${student.id}`)}
          >
            {student.full_name}
          </Button>
        ) : (
          student.full_name
        ),
    },
    { key: 'email', header: 'Email', render: (student) => student.email || '—' },
    { key: 'phone', header: 'Phone', render: (student) => student.phone || '—' },
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
    ...(canEdit || canDelete
      ? [
          {
            key: 'actions',
            header: 'Actions',
            render: (student: Student) => (
              <>
                {canEdit && !isExternal && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setEditingStudent(student)}
                    aria-label="Edit student"
                  >
                    <UserPen />
                  </Button>
                )}
                {canDelete && !isExternal && (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => setDeletingStudent(student)}
                    aria-label="Delete student"
                  >
                    <Trash />
                  </Button>
                )}
              </>
            ),
          },
        ]
      : []),
  ]

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant='h2' className={styles.title}>Students</Typography>
  
        {canAdd && !isExternal && (
          <Button variant="primary" size="small" onClick={() => setIsAddModalOpen(true)}>
            + Add Student
          </Button>
        )}
      </div>

      <Card padding="small">
        {students.length === 0 ? (
          <EmptyState message="No students" />
        ) : (
          <DataTable columns={columns} data={students} keyField="id" />
        )}
      </Card>

      {!isExternal && (
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          onSubmit={handleEditStudent}
        />
      )}

      {deletingStudent && (
        <DeleteStudentConfirm
          studentName={deletingStudent.full_name}
          isOpen={!!deletingStudent}
          onClose={() => setDeletingStudent(null)}
          onConfirm={handleDeleteStudent}
        />
      )}
    </div>
  )
}

export default StudentList