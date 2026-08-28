import { useState } from 'react'
import Modal from '@/shared/ui/Modal/Modal'
import Button from '@/shared/ui/Button/Button'
import { updateLessonStatus } from '../../api/updateLessonStatus'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import type { LessonWithNames, LessonStatus } from '@/entities/lesson/model/types'
import styles from './ChangeLessonStatusModal.module.css'

interface ChangeLessonStatusModalProps {
  lesson: LessonWithNames
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const STATUS_OPTIONS: LessonStatus[] = ['scheduled', 'completed', 'no_show']

export const ChangeLessonStatusModal = ({
  lesson,
  isOpen,
  onClose,
  onSuccess,
}: ChangeLessonStatusModalProps) => {
  const dispatch = useAppDispatch()
  const [selectedStatus, setSelectedStatus] = useState<LessonStatus>(lesson.status)

  const handleSave = async () => {
    try {
      await updateLessonStatus(lesson.id, selectedStatus)
      onSuccess?.()
      onClose()
      dispatch(addNotification({ type: 'success', message: 'Status updated successfully' }))
    } catch (err) {
      console.error('Error updating status:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to update status' }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Lesson Status">
      <p className={styles.message}>
        Lesson with <strong>{lesson.student?.full_name || 'this student'}</strong>
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
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </div>
    </Modal>
  )
}