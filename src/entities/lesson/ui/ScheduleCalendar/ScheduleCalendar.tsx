import { Calendar, momentLocalizer, type Event } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import type { LessonWithNames } from '../../model/types'
import styles from './ScheduleCalendar.module.css'

const localizer = momentLocalizer(moment)

const lessonToEvent = (lesson: LessonWithNames): Event => ({
  title: `${lesson.student?.full_name || '—'} / ${lesson.teacher?.full_name || '—'}`,
  start: new Date(lesson.start_time),
  end: new Date(lesson.end_time),
  resource: lesson,
})

interface ScheduleCalendarProps {
  lessons: LessonWithNames[]
  selectable?: boolean
  onSelectEvent?: (lesson: LessonWithNames) => void
  onSelectSlot?: (start: Date) => void
}

export const ScheduleCalendar = ({
  lessons,
  selectable = false,
  onSelectEvent,
  onSelectSlot,
}: ScheduleCalendarProps) => {
  const events = lessons.map(lessonToEvent)

  const handleSelectEvent = (event: Event) => {
    onSelectEvent?.(event.resource as LessonWithNames)
  }

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    onSelectSlot?.(slotInfo.start)
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
        selectable={selectable}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        components={{ event: EventComponent }}
        defaultView="week"
        views={['month', 'week', 'day']}
      />
    </div>
  )
}