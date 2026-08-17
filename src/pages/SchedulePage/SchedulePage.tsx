import { useAppSelector } from '@/app/store'
import { ScheduleCalendar } from '@/widgets/ScheduleCalendar'
import { fetchLessons, createLessonWithPayment, updateLesson, cancelLesson } from '@/shared/api/lessons'
import type { LessonFormData, LessonWithNames } from '@/entities/lesson/model/types'
import { useAsync, Spinner, ErrorMessage } from '@/shared'
import { useState } from 'react'

const SchedulePage = () => {
  const { role, user } = useAppSelector((state) => state.auth)
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
  } catch (err) {
    console.error('Error creating lesson:', err)
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
    } catch (err) {
      console.error('Error updating lesson:', err)
    }
  }

  const handleCancel = async (lessonId: string) => {
    try {
      await cancelLesson(lessonId)
      await refetch()
    } catch (err) {
      console.error('Error cancelling lesson:', err)
    }
  }

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error}/>

  return (
    <ScheduleCalendar
      lessons={lessons}
      canCreate={isAdminOrManager}
      canEdit={isAdminOrManager}
      canCancel={isAdminOrManager}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onCancel={handleCancel}
    />
  )
}

export default SchedulePage