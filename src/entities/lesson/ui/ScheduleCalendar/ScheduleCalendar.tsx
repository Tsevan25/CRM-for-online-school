import { useCallback, useState } from 'react';
import { Calendar, momentLocalizer, type Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { LessonWithNames } from '../../model/types';
import { lessonToEvent, isWeekend } from './utils/calendarUtils';
import { CalendarToolbar } from './ui/CalendarToolbar';
import { EventComponent } from './ui/EventComponent';
import styles from './ScheduleCalendar.module.css';

moment.updateLocale('en', { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

interface ScheduleCalendarProps {
  lessons: LessonWithNames[];
  selectable?: boolean;
  onSelectEvent?: (lesson: LessonWithNames) => void;
  onSelectSlot?: (start: Date) => void;
}

export const ScheduleCalendar = ({
  lessons,
  selectable = false,
  onSelectEvent,
  onSelectSlot,
}: ScheduleCalendarProps) => {
  const [view, setView] = useState<'month' | 'day'>('month');
  const [date, setDate] = useState(new Date());

  const events = lessons.map(lessonToEvent);

  const handleSelectEvent = useCallback(
    (event: Event) => {
      onSelectEvent?.(event.resource as LessonWithNames);
    },
    [onSelectEvent]
  );

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date }) => {
      if (view === 'month') {
        setDate(slotInfo.start);
        setView('day');
        return;
      }
      if (!isWeekend(slotInfo.start)) {
        onSelectSlot?.(slotInfo.start);
      }
    },
    [view, onSelectSlot]
  );

  const handleNavigate = (action: 'today' | 'back' | 'next') => {
    if (action === 'today') {
      setDate(new Date());
    } else if (action === 'back') {
      setDate(prev =>
        view === 'month'
          ? new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
          : new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 1)
      );
    } else {
      setDate(prev =>
        view === 'month'
          ? new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
          : new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1)
      );
    }
  };

  return (
    <div className={styles.container}>
      <CalendarToolbar view={view} onViewChange={setView} onNavigate={handleNavigate} />

      {view === 'month' ? (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          components={{ event: EventComponent, toolbar: () => null }}
          date={date}
          view="month"
          onNavigate={setDate}
          views={['month']}
        />
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable={selectable}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          components={{ event: EventComponent, toolbar: () => null }}
          date={date}
          view="day"
          onNavigate={setDate}
          views={['day']}
          min={new Date(0, 0, 0, 9, 0, 0)}
          max={new Date(0, 0, 0, 22, 0, 0)}
          step={60}
          timeslots={1}
          formats={{ timeGutterFormat: 'HH:mm' }}
        />
      )}
    </div>
  );
};