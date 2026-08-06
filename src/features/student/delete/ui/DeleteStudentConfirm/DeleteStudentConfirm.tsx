import Modal from '@/shared/ui/Modal/Modal'
import Button from '@/shared/ui/Button/Button'
import styles from './DeleteStudentConfirm.module.css'

interface DeleteStudentConfirmProps {
  studentName: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteStudentConfirm = ({
  studentName,
  isOpen,
  onClose,
  onConfirm,
}: DeleteStudentConfirmProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete Student">
    <p className={styles.message}>
      Are you sure you want to delete <strong>{studentName}</strong>?
    </p>
    <div className={styles.actions}>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Delete
      </Button>
    </div>
  </Modal>
)

export default DeleteStudentConfirm