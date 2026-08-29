import { useState } from 'react'
import { useAsync } from '@/shared/hooks/useAsync'
import { fetchLessons } from '@/entities/lesson/api/lessonApi'
import { ScheduleCalendar } from '@/entities/lesson/ui/ScheduleCalendar'
import { CreateLessonModal } from '@/features/lesson/create'
import { EditLessonModal } from '@/features/lesson/edit/ui/EditLessonModal'
import { CancelLessonModal } from '@/features/lesson/cancel'
import { AsyncBoundary } from '@/shared/ui'
import type { LessonWithNames } from '@/entities/lesson/model/types'

const formatToLocalInput = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

export const AdminSchedule = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonWithNames | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [newSlotStart, setNewSlotStart] = useState<Date | null>(null)

  const { data, loading, error, refetch } = useAsync(fetchLessons)
  const lessons = data ?? []

  const handleSelectEvent = (lesson: LessonWithNames) => {
    setSelectedLesson(lesson)
    setIsEditOpen(true)
  }

  const handleSelectSlot = (start: Date) => {
    const day = start.getDay()
    if (day === 0 || day === 6) return
    if (start <= new Date()) return
    setNewSlotStart(start)
    setIsCreateOpen(true)
  }

  return (
    <AsyncBoundary loading={loading} error={error}>
      <ScheduleCalendar
        lessons={lessons}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
      {isCreateOpen && (
        <CreateLessonModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={refetch}
          defaultStartTime={newSlotStart ? formatToLocalInput(newSlotStart) : undefined}
        />
      )}
      {isEditOpen && selectedLesson && (
        <EditLessonModal
          lesson={selectedLesson}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSuccess={refetch}
          onCancelRequest={() => {
            setIsEditOpen(false)
            setIsCancelOpen(true)
          }}
        />
      )}
      {isCancelOpen && selectedLesson && (
        <CancelLessonModal
          lesson={selectedLesson}
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onSuccess={refetch}
        />
      )}
    </AsyncBoundary>
  )
}