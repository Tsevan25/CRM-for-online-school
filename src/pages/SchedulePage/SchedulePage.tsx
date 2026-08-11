import { useState } from 'react'
import { useAppSelector } from '@/app/store'
import { ScheduleCalendar } from '@/widgets/ScheduleCalendar'
import { mockLessons } from '@/entities/lesson/model/mock'
import type { Lesson, LessonFormData } from '@/entities/lesson/model/types'

const SchedulePage = () => {
  const { role } = useAppSelector((state) => state.auth)
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)

  const isAdminOrManager = role === 'admin' || role === 'manager'

  const handleCreate = (data: LessonFormData) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      studentId: data.studentId,
      studentName: data.studentName,
      teacherId: data.teacherId,
      teacherName: data.teacherName,
      startTime: data.startTime,
      endTime: data.endTime,
      status: 'scheduled',
      price: data.price,
    }
    setLessons((prev) => [...prev, newLesson])
  }

  const handleEdit = (lessonId: string, data: LessonFormData) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId
          ? {
              ...l,
              studentName: data.studentName,
              teacherName: data.teacherName,
              startTime: data.startTime,
              endTime: data.endTime,
              price: data.price,
            }
          : l
      )
    )
  }

  const handleCancel = (lessonId: string) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId ? { ...l, status: 'cancelled' as const } : l
      )
    )
  }

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