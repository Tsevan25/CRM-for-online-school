import ConfirmDialog from '@/shared/ui/ConfirmDialog/ConfirmDialog'
import { cancelLesson } from '../../api/cancelLesson'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { LessonWithNames } from '@/entities/lesson/model/types'

interface CancelLessonModalProps {
  lesson: LessonWithNames
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const CancelLessonModal = ({
  lesson,
  isOpen,
  onClose,
  onSuccess,
}: CancelLessonModalProps) => {
  const dispatch = useAppDispatch()

  const handleConfirm = async () => {
    try {
      await cancelLesson(lesson.id)
      onSuccess?.()
      onClose()
      dispatch(addNotification({ type: 'success', message: 'Lesson cancelled successfully' }))
    } catch (err) {
      console.error('Error cancelling lesson:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to cancel lesson' }))
    }
  }

  return (
    <ConfirmDialog
      isOpen={isOpen}
      title="Cancel Lesson"
      message={`Are you sure you want to cancel the lesson with ${lesson.student?.full_name || 'this student'}?`}
      confirmLabel="Cancel Lesson"
      cancelLabel="Keep Lesson"
      onConfirm={handleConfirm}
      onCancel={onClose}
    />
  )
}