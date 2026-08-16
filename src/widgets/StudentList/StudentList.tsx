import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentRow } from '@/entities/student'
import type { Student, StudentFormData } from '@/entities/student/model/types'
import {Button, Card} from '@/shared'
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
import { useAsync } from '@/shared/hooks/useAsync'
import styles from './StudentList.module.css'

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

  if (loading) return <div>Loading students...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Students</h2>
        {canAdd && !isExternal && (
          <Button variant="primary" size="small" onClick={() => setIsAddModalOpen(true)}>
            + Add Student
          </Button>
        )}
      </div>

      <Card padding="small">
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              <th className={styles.headCell}>Name</th>
              <th className={styles.headCell}>Email</th>
              <th className={styles.headCell}>Phone</th>
              <th className={styles.headCell}>Balance</th>
              <th className={styles.headCell}>Created</th>
              {(canEdit || canDelete) && <th className={styles.headCell}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <StudentRow
                key={s.id}
                student={s}
                onEdit={canEdit && !isExternal ? () => setEditingStudent(s) : undefined}
                onDelete={canDelete && !isExternal ? () => setDeletingStudent(s) : undefined}
                onView={() => navigate(`/students/${s.id}`)}
              />
            ))}
          </tbody>
        </table>
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