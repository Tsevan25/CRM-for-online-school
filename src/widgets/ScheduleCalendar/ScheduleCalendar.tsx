import { useCallback, useState } from 'react'
import { Calendar, momentLocalizer, type Event } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import type { Lesson, LessonStatus, LessonFormData } from '@/entities/lesson/model/types'
import { CreateLessonModal, EditLessonModal, CancelLessonConfirm, ChangeLessonStatusModal } from '@/features/lesson'
import styles from './ScheduleCalendar.module.css'

const localizer = momentLocalizer(moment)

const lessonToEvent = (lesson: Lesson): Event => ({
  title: `${lesson.studentName} / ${lesson.teacherName}`,
  start: new Date(lesson.startTime),
  end: new Date(lesson.endTime),
  resource: lesson,
})

interface ScheduleCalendarProps {
  lessons: Lesson[]
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
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [newSlotStart, setNewSlotStart] = useState<Date | null>(null)

  const events = lessons.map(lessonToEvent)

  const handleSelectEvent = useCallback(
    (event: Event) => {
      const lesson = event.resource as Lesson
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

      {canCancel && selectedLesson && (
        <CancelLessonConfirm
          studentName={selectedLesson.studentName}
          startTime={selectedLesson.startTime}
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={handleCancelConfirm}
        />
      )}

      {canChangeStatus && selectedLesson && (
        <ChangeLessonStatusModal
          studentName={selectedLesson.studentName}
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