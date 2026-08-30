import { useCallback, useState } from "react";
import { Calendar, momentLocalizer, type Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { LessonWithNames } from "../../model/types";
import { Button } from "@/shared/ui";
import styles from "./ScheduleCalendar.module.css";

moment.updateLocale("en", { week: { dow: 1 } });
const localizer = momentLocalizer(moment);

const lessonToEvent = (lesson: LessonWithNames): Event => ({
  title: `${lesson.student?.full_name || "—"} / ${lesson.teacher?.full_name || "—"}`,
  start: new Date(lesson.start_time),
  end: new Date(lesson.end_time),
  resource: lesson,
});

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
  const [view, setView] = useState<"month" | "day">("month");
  const [date, setDate] = useState(new Date());

  const events = lessons.map(lessonToEvent);

  const handleSelectEvent = useCallback(
    (event: Event) => {
      onSelectEvent?.(event.resource as LessonWithNames);
    },
    [onSelectEvent],
  );

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date }) => {
      if (view === "month") {
        setDate(slotInfo.start);
        setView("day");
        return;
      }

      const day = slotInfo.start.getDay();
      if (day === 0 || day === 6) return;
      onSelectSlot?.(slotInfo.start);
    },
    [view, onSelectSlot],
  );

  const handleDrillDown = (drillDate: Date) => {
    setDate(drillDate);
    setView("day");
  };

  const handleToday = () => setDate(new Date());

  const handleBack = () => {
    if (view === "month") {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    } else {
      setDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
      );
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    } else {
      setDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      );
    }
  };

  const EventComponent = ({ event }: { event: Event }) => {
    const lesson = event.resource as LessonWithNames;
    const classNames = [
      styles.event,
      lesson.status === "cancelled" ? styles.cancelled : "",
      lesson.status === "completed" ? styles.completed : "",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div className={classNames}>
        <span>{event.title}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.navButtons}>
          <Button variant="secondary" size="small" onClick={handleToday}>
            Today
          </Button>
          <Button variant="secondary" size="small" onClick={handleBack}>
            Back
          </Button>
          <Button variant="secondary" size="small" onClick={handleNext}>
            Next
          </Button>
        </div>
        <div className={styles.viewButtons}>
          <Button
            variant={view === "month" ? "primary" : "secondary"}
            size="small"
            onClick={() => setView("month")}
          >
            Month
          </Button>
          <Button
            variant={view === "day" ? "primary" : "secondary"}
            size="small"
            onClick={() => setView("day")}
          >
            Day
          </Button>
        </div>
      </div>

      {view === "month" ? (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onDrillDown={handleDrillDown}
          components={{ event: EventComponent, toolbar: () => null }}
          date={date}
          view="month"
          onNavigate={setDate}
          views={["month"]}
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
          views={["day"]}
          min={new Date(0, 0, 0, 9, 0, 0)}
          max={new Date(0, 0, 0, 22, 0, 0)}
          step={60}
          timeslots={1}
          formats={{ timeGutterFormat: "HH:mm" }}
        />
      )}
    </div>
  );
};