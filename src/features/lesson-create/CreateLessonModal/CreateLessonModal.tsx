import { useEffect, useState } from 'react'
import Modal from '@/shared/ui/Modal/Modal'
import { LessonForm } from '@/entities/lesson/ui/LessonForm'
import type { LessonFormData } from '@/entities/lesson/model/types'
import { fetchStudents } from '@/shared/api/students'
import { supabase } from '@/shared/api/supabase'

interface CreateLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LessonFormData) => void
  defaultStartTime?: string
}

const CreateLessonModal = ({ isOpen, onClose, onSubmit, defaultStartTime }: CreateLessonModalProps) => {
  const [students, setStudents] = useState<{ id: string; full_name: string }[]>([])
  const [teachers, setTeachers] = useState<{ id: string; full_name: string }[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchStudents().then((data) => setStudents(data))
      supabase
        .from('profiles')
        .select('id, full_name')
        .then(({ data }) => {
          if (data) setTeachers(data)
        })
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Lesson">
      <LessonForm
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel="Create"
        defaultValues={defaultStartTime ? { startTime: defaultStartTime } : undefined}
        students={students}
        teachers={teachers}
      />
    </Modal>
  )
}

export default CreateLessonModal