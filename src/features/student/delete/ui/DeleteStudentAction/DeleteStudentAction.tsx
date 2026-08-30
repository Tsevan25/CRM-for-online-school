import { useState } from 'react'
import {Button} from '@/shared/ui/Button/Button'
import {ConfirmDialog} from '@/shared/ui/ConfirmDialog/ConfirmDialog'
import { deleteStudent } from '../../api/deleteStudent'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { Student } from '@/entities/student/model/types'
import { Trash } from 'lucide-react'

interface DeleteStudentActionProps {
  student: Student
  onSuccess?: () => void
}

export const DeleteStudentAction = ({ student, onSuccess }: DeleteStudentActionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleConfirm = async () => {
    try {
      await deleteStudent(student.id)
      setIsOpen(false)
      onSuccess?.()
      dispatch(addNotification({ type: 'success', message: 'Student deleted successfully' }))
    } catch (err) {
      console.error('Error deleting student:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to delete student' }))
    }
  }

  return (
    <>
      <Button variant="secondary" size="small" onClick={() => setIsOpen(true)} aria-label="Delete student">
        <Trash />
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        title="Delete Student"
        message={`Are you sure you want to delete ${student.full_name}?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
      />
    </>
  )
}