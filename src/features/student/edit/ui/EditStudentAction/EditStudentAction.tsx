import { useState } from 'react'
import {Button} from '@/shared/ui'
import { EditStudentModal } from '../EditStudentModal'
import { updateStudent } from '../../api/updateStudent'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { StudentFormData, Student } from '@/entities/student'
import { UserPen } from 'lucide-react'

interface EditStudentActionProps {
  student: Student
  onSuccess?: () => void
}

export const EditStudentAction = ({ student, onSuccess }: EditStudentActionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: StudentFormData) => {
    try {
      await updateStudent(student.id, {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        balance: data.initialBalance,
      })
      setIsOpen(false)
      onSuccess?.()
      dispatch(addNotification({ type: 'success', message: 'Student updated successfully' }))
    } catch (err) {
      console.error('Error updating student:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to update student' }))
    }
  }

  return (
    <>
      <Button variant="secondary" size="small" onClick={() => setIsOpen(true)} aria-label="Edit student">
        <UserPen />
      </Button>
      <EditStudentModal
        student={student}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}