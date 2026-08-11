import { useState } from 'react'
import { ScheduleCalendar } from '@/widgets/ScheduleCalendar'
import { mockLessons } from '@/entities/lesson/model/mock'
import type { Lesson, LessonStatus } from '@/entities/lesson/model/types'

const TeacherSchedulePage = () => {

  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)

  const handleStatusChange = (lessonId: string, newStatus: LessonStatus) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId ? { ...l, status: newStatus } : l
      )
    )
  }

  return (
    <ScheduleCalendar
      lessons={lessons}
      canCreate={false}
      canEdit={false}
      canCancel={false}
      canChangeStatus={true}
      onStatusChange={handleStatusChange}
    />
  )
}

export default TeacherSchedulePage