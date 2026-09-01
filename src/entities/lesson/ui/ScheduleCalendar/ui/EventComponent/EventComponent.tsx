import type { Event } from 'react-big-calendar';
import type { LessonWithNames } from '@/entities/lesson/model/types';
import { Typography } from '@/shared/ui';
import styles from './EventComponent.module.css';

export const EventComponent = ({ event }: { event: Event }) => {
  const lesson = event.resource as LessonWithNames;
  const classNames = [
    styles.event,
    lesson.status === 'cancelled' ? styles.cancelled : '',
    lesson.status === 'completed' ? styles.completed : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <Typography variant="caption" className={styles.title}>
        {event.title}
      </Typography>
    </div>
  );
};