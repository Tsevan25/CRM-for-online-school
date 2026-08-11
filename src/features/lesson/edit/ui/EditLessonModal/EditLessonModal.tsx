import Modal from '@/shared/ui/Modal/Modal'
import Button from '@/shared/ui/Button/Button'
import { LessonForm } from '@/entities/lesson/ui/LessonForm'
import type { LessonFormData, Lesson } from '@/entities/lesson/model/types'

interface EditLessonModalProps {
  lesson: Lesson
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LessonFormData) => void
  onCancelRequest?: () => void  
}

const EditLessonModal = ({
  lesson,
  isOpen,
  onClose,
  onSubmit,
  onCancelRequest,
}: EditLessonModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Edit Lesson">
    <LessonForm
      defaultValues={{
        studentName: lesson.studentName,
        teacherName: lesson.teacherName,
        startTime: lesson.startTime.slice(0, 16),
        endTime: lesson.endTime.slice(0, 16),
        price: lesson.price,
      }}
      onSubmit={onSubmit}
      onCancel={onClose}
      submitLabel="Save Changes"
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

export default EditLessonModal