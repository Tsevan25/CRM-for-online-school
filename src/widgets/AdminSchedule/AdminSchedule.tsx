import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/store'
import { ScheduleCalendar } from '@/widgets/ScheduleCalendar'
import {
  fetchLessons,
  createLessonWithPayment,
  updateLesson,
  cancelLesson,
} from '@/shared/api/lessons'
import type { LessonFormData, LessonWithNames } from '@/entities/lesson/model/types'
import { AsyncBoundary } from '@/shared/ui'
import { useAsync } from '@/shared/hooks/useAsync'
import { addNotification } from '@/features/notifications'

const AdminSchedule = () => {
  const { role, user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [lessons, setLessons] = useState<LessonWithNames[]>([])

  const isAdminOrManager = role === 'admin' || role === 'manager'

  const { loading, error, refetch } = useAsync(async () => {
    const data = await fetchLessons()
    setLessons(data)
    return data
  })

  const handleCreate = async (data: LessonFormData) => {
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
      await refetch()
      dispatch(addNotification({ type: 'success', message: 'Lesson created successfully' }))
    } catch (err) {
      console.error('Error creating lesson:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to create lesson' }))
    }
  }

  const handleEdit = async (lessonId: string, data: LessonFormData) => {
    try {
      await updateLesson(lessonId, {
        student_id: data.studentId,
        teacher_id: data.teacherId,
        start_time: data.startTime,
        end_time: data.endTime,
        price: data.price,
      })
      await refetch()
      dispatch(addNotification({ type: 'success', message: 'Lesson updated successfully' }))
    } catch (err) {
      console.error('Error updating lesson:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to update lesson' }))
    }
  }

  const handleCancel = async (lessonId: string) => {
    try {
      await cancelLesson(lessonId)
      await refetch()
      dispatch(addNotification({ type: 'success', message: 'Lesson cancelled successfully' }))
    } catch (err) {
      console.error('Error cancelling lesson:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to cancel lesson' }))
    }
  }

  return (
    <AsyncBoundary loading={loading} error={error}>
      <ScheduleCalendar
        lessons={lessons}
        canCreate={isAdminOrManager}
        canEdit={isAdminOrManager}
        canCancel={isAdminOrManager}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onCancel={handleCancel}
      />
    </AsyncBoundary>
  )
}

export default AdminSchedule