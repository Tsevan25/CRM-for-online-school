import { useEffect, useState } from 'react'
import {Modal, Button} from '@/shared/ui'
import { LessonForm } from '@/entities/lesson/ui/LessonForm'
import type { LessonFormData, LessonWithNames } from '@/entities/lesson/model/types'
import { fetchStudents } from '@/shared/api/students'
import { supabase } from '@/shared/api/supabase'

interface EditLessonModalProps {
  lesson: LessonWithNames
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LessonFormData) => void
  onCancelRequest?: () => void
}

const EditLessonModal = ({ lesson, isOpen, onClose, onSubmit, onCancelRequest }: EditLessonModalProps) => {
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
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Lesson">
      <LessonForm
        defaultValues={{
          studentId: lesson.student_id,
          teacherId: lesson.teacher_id,
          startTime: lesson.start_time.slice(0, 16),
          endTime: lesson.end_time.slice(0, 16),
          price: lesson.price,
        }}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel="Save Changes"
        students={students}
        teachers={teachers}
      />
      {onCancelRequest && (
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <Button variant="danger" onClick={onCancelRequest}>
            Cancel Lesson
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default EditLessonModal