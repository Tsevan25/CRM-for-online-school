import { useState } from 'react'
import Modal from '@/shared/ui/Modal/Modal'
import Button from '@/shared/ui/Button/Button'
import type { LessonStatus } from '@/entities/lesson/model/types'
import styles from './ChangeLessonStatusModal.module.css'

interface ChangeLessonStatusModalProps {
  studentName: string
  currentStatus: LessonStatus
  isOpen: boolean
  onClose: () => void
  onSave: (newStatus: LessonStatus) => void
}

const STATUS_OPTIONS: LessonStatus[] = ['scheduled', 'completed', 'no_show']

const ChangeLessonStatusModal = ({
  studentName,
  currentStatus,
  isOpen,
  onClose,
  onSave,
}: ChangeLessonStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<LessonStatus>(currentStatus)

  const handleSave = () => {
    onSave(selectedStatus)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Lesson Status">
      <p className={styles.message}>
        Lesson with <strong>{studentName}</strong>
        <br />
        Current status: <strong>{currentStatus}</strong>
      </p>
      <div className={styles.field}>
        <label className={styles.label}>New Status</label>
        <select
          className={styles.select}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as LessonStatus)}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  )
}

export default ChangeLessonStatusModal