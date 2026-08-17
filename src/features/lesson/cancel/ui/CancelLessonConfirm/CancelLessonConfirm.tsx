import {Modal, Button, Typography} from '@/shared';
import styles from './CancelLessonConfirm.module.css';

interface CancelLessonConfirmProps {
  studentName: string
  startTime: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const CancelLessonConfirm = ({
  studentName,
  startTime,
  isOpen,
  onClose,
  onConfirm,
}: CancelLessonConfirmProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Cancel Lesson">
    <Typography variant='body' className={styles.message}>
       Are you sure you want to cancel the lesson with{' '}
      <strong>{studentName}</strong> on{' '}
      {new Date(startTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
      ?
    </Typography>
    <div className={styles.actions}>
      <Button variant="secondary" onClick={onClose}>
        Keep Lesson
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Cancel Lesson
      </Button>
    </div>
  </Modal>
)

export default CancelLessonConfirm