import type { Event } from 'react-big-calendar';
import type { LessonWithNames } from '@/entities/lesson/model/types';

export const lessonToEvent = (lesson: LessonWithNames): Event => ({
  title: `${lesson.student?.full_name || '—'} / ${lesson.teacher?.full_name || '—'}`,
  start: new Date(lesson.start_time),
  end: new Date(lesson.end_time),
  resource: lesson,
});

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};