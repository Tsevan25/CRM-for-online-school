import { useState } from 'react'
import Button from '@/shared/ui/Button/Button'
import { AddStudentModal } from '../AddStudentModal'
import { createStudent } from '../../api/createStudent'
import { useAppSelector, useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { StudentFormData } from '@/entities/student/model/types'

interface AddStudentActionProps {
  onSuccess?: () => void
}

export const AddStudentAction = ({ onSuccess }: AddStudentActionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const handleSubmit = async (data: StudentFormData) => {
    if (!user?.id) return
    try {
      await createStudent({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        balance: data.initialBalance,
        created_by: user.id,
      })
      setIsOpen(false)
      onSuccess?.()
      dispatch(addNotification({ type: 'success', message: 'Student added successfully' }))
    } catch (err) {
      console.error('Error creating student:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to add student' }))
    }
  }

  return (
    <>
      <Button variant="primary" size="small" onClick={() => setIsOpen(true)}>
        + Add Student
      </Button>
      <AddStudentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}