import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentRow } from '@/entities/student'
import type { Student } from '@/entities/student/model/types'
import { mockStudents } from '@/entities/student/model/mock'
import Button from '@/shared/ui/Button/Button'
import Card from '@/shared/ui/Card/Card'
import { AddStudentModal } from '@/features/student'
import { EditStudentModal } from '@/features/student'
import { DeleteStudentConfirm } from '@/features/student'
import type { StudentFormData } from '@/entities/student/model/types'
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
  const [internalStudents, setInternalStudents] = useState<Student[]>(mockStudents)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null)

  const students = externalStudents ?? internalStudents
  const isExternal = !!externalStudents

  const handleAddStudent = (data: StudentFormData) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email || undefined,
      phone: data.phone || undefined,
      balance: data.initialBalance,
      createdBy: 'currentUser',
      createdAt: new Date().toISOString(),
    }
    setInternalStudents((prev) => [...prev, newStudent])
    setIsAddModalOpen(false)
  }

  const handleEditStudent = (data: StudentFormData) => {
    if (editingStudent) {
      setInternalStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? { ...s, fullName: data.fullName, email: data.email, phone: data.phone, balance: data.initialBalance }
            : s
        )
      )
      setEditingStudent(null)
    }
  }

  const handleDeleteStudent = () => {
    if (deletingStudent) {
      setInternalStudents((prev) => prev.filter((s) => s.id !== deletingStudent.id))
      setDeletingStudent(null)
    }
  }

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
          studentName={deletingStudent.fullName}
          isOpen={!!deletingStudent}
          onClose={() => setDeletingStudent(null)}
          onConfirm={handleDeleteStudent}
        />
      )}
    </div>
  )
}

export default StudentList