import { useState, useEffect } from 'react'
import Modal from '@/shared/ui/Modal/Modal'
import { LessonForm } from '@/entities/lesson/ui/LessonForm'
import { createLessonWithPayment } from '../../api/createLessonWithPayment'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { LessonFormData } from '@/entities/lesson/model/types'
import { fetchStudents } from '@/entities/student'
import { supabase } from '@/shared/api/supabase'

  interface CreateLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  defaultStartTime?: string
}

export const CreateLessonModal = ({
  isOpen,
  onClose,
  onSuccess,
  defaultStartTime,
}: CreateLessonModalProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [students, setStudents] = useState<{ id: string; full_name: string }[]>([])
  const [teachers, setTeachers] = useState<{ id: string; full_name: string }[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchStudents().then(setStudents)
      supabase.from('profiles').select('id, full_name').then(({ data }) => {
        if (data) setTeachers(data)
      })
    }
  }, [isOpen])

  const handleSubmit = async (data: LessonFormData) => {
    if (!user?.id) return
    try {
      await createLessonWithPayment({
        student_id: data.studentId,
        teacher_id: data.teacherId,
        start_time: data.startTime,
        end_time: data.endTime,
        price: data.price,
        created_by: user.id,
      })
      onSuccess?.()
      onClose()
      dispatch(addNotification({ type: 'success', message: 'Lesson created successfully' }))
    } catch (err) {
      console.error('Error creating lesson:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to create lesson' }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Lesson">
      <LessonForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Create"
        defaultValues={defaultStartTime ? { startTime: defaultStartTime } : undefined}
        students={students}
        teachers={teachers}
      />
    </Modal>
  )
}