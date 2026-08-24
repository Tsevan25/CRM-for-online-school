import { useCallback, useState } from 'react'
import { Calendar, momentLocalizer, type Event } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import type { LessonFormData, LessonStatus, LessonWithNames } from '@/entities/lesson/model/types'
import { CreateLessonModal } from '@/features/lesson-create/CreateLessonModal'
import { EditLessonModal } from '@/features/lesson-edit/EditLessonModal'
import { ChangeLessonStatusModal } from '@/features/lesson-status/ChangeLessonStatusModal'
import styles from './ScheduleCalendar.module.css'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'

const localizer = momentLocalizer(moment)

const lessonToEvent = (lesson: LessonWithNames): Event => ({
  title: `${lesson.student?.full_name || '—'} / ${lesson.teacher?.full_name || '—'}`,
  start: new Date(lesson.start_time),
  end: new Date(lesson.end_time),
  resource: lesson,
})

interface ScheduleCalendarProps {
  lessons: LessonWithNames[]
  canCreate?: boolean
  canEdit?: boolean
  canCancel?: boolean
  canChangeStatus?: boolean
  onCreate?: (data: LessonFormData) => void
  onEdit?: (lessonId: string, data: LessonFormData) => void
  onCancel?: (lessonId: string) => void
  onStatusChange?: (lessonId: string, newStatus: LessonStatus) => void
}

const ScheduleCalendar = ({
  lessons,
  canCreate = false,
  canEdit = false,
  canCancel = false,
  canChangeStatus = false,
  onCreate,
  onEdit,
  onCancel,
  onStatusChange,
}: ScheduleCalendarProps) => {
  const [selectedLesson, setSelectedLesson] = useState<LessonWithNames | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [newSlotStart, setNewSlotStart] = useState<Date | null>(null)

  const events = lessons.map(lessonToEvent)

  const handleSelectEvent = useCallback(
    (event: Event) => {
      const lesson = event.resource as LessonWithNames
      setSelectedLesson(lesson)
      if (canChangeStatus && onStatusChange) {
        setIsStatusOpen(true)
      } else if (canEdit && onEdit) {
        setIsEditOpen(true)
      }
    },
    [canChangeStatus, onStatusChange, canEdit, onEdit]
  )

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date }) => {
      if (canCreate && onCreate) {
        setNewSlotStart(slotInfo.start)
        setIsCreateOpen(true)
      }
    },
    [canCreate, onCreate]
  )

  const handleCreateSubmit = (data: LessonFormData) => {
    onCreate?.(data)
    setIsCreateOpen(false)
  }

  const handleEditSubmit = (data: LessonFormData) => {
    if (selectedLesson) {
      onEdit?.(selectedLesson.id, data)
      setIsEditOpen(false)
    }
  }

  const handleCancelConfirm = () => {
    if (selectedLesson) {
      onCancel?.(selectedLesson.id)
      setIsCancelOpen(false)
      setSelectedLesson(null)
    }
  }

  const openCancelConfirm = () => {
    setIsEditOpen(false)
    setIsCancelOpen(true)
  }

  const EventComponent = ({ event }: { event: Event }) => (
    <div className={styles.event}>
      <span>{event.title}</span>
    </div>
  )

  return (
    <div className={styles.container}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable={canCreate}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        components={{ event: EventComponent }}
        defaultView="week"
        views={['month', 'week', 'day']}
      />

      {canCreate && (
        <CreateLessonModal
          isOpen={isCreateOpen}
          onClose={() => {
            setIsCreateOpen(false)
            setNewSlotStart(null)
          }}
          onSubmit={handleCreateSubmit}
          defaultStartTime={
            newSlotStart ? newSlotStart.toISOString().slice(0, 16) : undefined
          }
        />
      )}

      {canEdit && selectedLesson && (
        <EditLessonModal
          lesson={selectedLesson}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditSubmit}
          onCancelRequest={canCancel ? openCancelConfirm : undefined}
        />
      )}

        <ConfirmDialog
        isOpen={isCancelOpen}
        title="Cancel Lesson"
        message={`Are you sure you want to cancel the lesson with ${selectedLesson?.student?.full_name || 'this student'}?`}
        confirmLabel="Cancel Lesson"
        cancelLabel="Keep Lesson"
        onConfirm={handleCancelConfirm}
        onCancel={() => setIsCancelOpen(false)}
      />

      {canChangeStatus && selectedLesson && (
        <ChangeLessonStatusModal
          studentName={selectedLesson.student?.full_name || ''}
          currentStatus={selectedLesson.status}
          isOpen={isStatusOpen}
          onClose={() => setIsStatusOpen(false)}
          onSave={(newStatus) => onStatusChange?.(selectedLesson.id, newStatus)}
        />
      )}
    </div>
  )
}

export default ScheduleCalendar