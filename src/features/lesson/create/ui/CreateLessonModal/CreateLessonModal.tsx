import Modal from '@/shared/ui/Modal/Modal'
import { LessonForm } from '@/entities/lesson/ui/LessonForm'
import type { LessonFormData } from '@/entities/lesson/model/types'

interface CreateLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LessonFormData) => void
  defaultStartTime?: string
}

const CreateLessonModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultStartTime,
}: CreateLessonModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Create Lesson">
    <LessonForm
      onSubmit={onSubmit}
      onCancel={onClose}
      submitLabel="Create"
      defaultValues={
        defaultStartTime
          ? { startTime: defaultStartTime, endTime: '' }
          : undefined
      }
    />
  </Modal>
)

export default CreateLessonModal