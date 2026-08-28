import { useState } from 'react'
import { useAsync } from '@/shared/hooks/useAsync'
import { fetchLessonsByTeacher } from '@/entities/lesson'
import { ScheduleCalendar } from '@/entities/lesson/ui/ScheduleCalendar'
import { ChangeLessonStatusModal } from '@/features/lesson/status'
import { AsyncBoundary } from '@/shared/ui'
import { useAppSelector } from '@/app/store'
import type { LessonWithNames } from '@/entities/lesson/model/types'

export const TeacherSchedule = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [selectedLesson, setSelectedLesson] = useState<LessonWithNames | null>(null)
  const [isStatusOpen, setIsStatusOpen] = useState(false)

  const { data, loading, error, refetch } = useAsync(() => fetchLessonsByTeacher(user?.id ?? ''))
  const lessons = data ?? []

  const handleSelectEvent = (lesson: LessonWithNames) => {
    setSelectedLesson(lesson)
    setIsStatusOpen(true)
  }

  return (
    <AsyncBoundary loading={loading} error={error}>
      <ScheduleCalendar
        lessons={lessons}
        onSelectEvent={handleSelectEvent}
      />
      {isStatusOpen && selectedLesson && (
        <ChangeLessonStatusModal
          lesson={selectedLesson}
          isOpen={isStatusOpen}
          onClose={() => setIsStatusOpen(false)}
          onSuccess={refetch}
        />
      )}
    </AsyncBoundary>
  )
}