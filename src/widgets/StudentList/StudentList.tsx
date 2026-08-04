import { useState } from 'react'
import StudentRow from '../../entities/student/ui/StudentRow'
import type { Student } from '../../entities/student/model/types'
import Button from '../../shared/ui/Button/Button'
import Card from '../../shared/ui/Card/Card'
import Modal from '../../shared/ui/Modal/Modal'
import AddStudentForm from '../../features/student/add/ui/AddStudentForm'
import type { StudentFormData } from '../../features/student/add/ui/AddStudentForm/AddStudentForm'
import styles from './StudentList.module.css'
import { useNavigate } from 'react-router-dom'


const initialStudents: Student[] = [
  { id: '1', fullName: 'Alice Johnson', email: 'alice@example.com', phone: '+1 234-567-8901', balance: 1200, createdBy: 'admin', createdAt: '2025-01-15T10:00:00Z' },
  { id: '2', fullName: 'Bob Smith', email: 'bob@example.com', balance: 850, createdBy: 'manager1', createdAt: '2025-02-20T12:30:00Z' },
  { id: '3', fullName: 'Charlie Brown', phone: '+44 1234-567890', balance: 0, createdBy: 'manager1', createdAt: '2025-03-10T09:00:00Z' },
]

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  const navigate = useNavigate();

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
    setStudents(prev => [...prev, newStudent])
    setIsAddModalOpen(false)
  }

  const handleEditStudent = (data: StudentFormData) => {
    if (!editingStudent) return
    setStudents(prev =>
      prev.map(s =>
        s.id === editingStudent.id
          ? { ...s, fullName: data.fullName, email: data.email || undefined, phone: data.phone || undefined, balance: data.initialBalance }
          : s
      )
    )
    setEditingStudent(null)
  }

  const openEditModal = (id: string) => {
    const student = students.find(s => s.id === id)
    if (student) setEditingStudent(student)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Students</h2>
        <Button variant="primary" size="small" onClick={() => setIsAddModalOpen(true)}>
          + Add Student
        </Button>
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
              <th className={styles.headCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <StudentRow
                key={s.id}
                student={s}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onView={() => navigate(`/students/${s.id}`)}
              />
            ))}
          </tbody>
        </table>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Student"
      >
        <AddStudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        title="Edit Student"
      >
        {editingStudent && (
          <AddStudentForm
            defaultValues={{
              fullName: editingStudent.fullName,
              email: editingStudent.email || '',
              phone: editingStudent.phone || '',
              initialBalance: editingStudent.balance,
            }}
            onSubmit={handleEditStudent}
            onCancel={() => setEditingStudent(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>
    </div>
  )
}

export default StudentList