import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/store'
import { ScheduleCalendar } from '@/widgets/ScheduleCalendar'
import { fetchLessons, createLesson, updateLesson, cancelLesson } from '@/shared/api/lessons'
import type { LessonFormData, LessonWithNames } from '@/entities/lesson/model/types'

const SchedulePage = () => {
  const { role, user } = useAppSelector((state) => state.auth)
  const [lessons, setLessons] = useState<LessonWithNames[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAdminOrManager = role === 'admin' || role === 'manager'

useEffect(() => {
  const load = async () => {
    try {
      const data = await fetchLessons();
      setLessons(data);
    } catch (err) {
      console.log('Full error object:', err);

      let message = 'Failed to load lessons';

      // Без any: проверяем структуру ошибки
      if (typeof err === 'object' && err !== null) {
        // Ошибка Supabase может быть обёрнута в { error: ... }
        const maybeWrapped = err as { error?: unknown };
        const errorSource =
          maybeWrapped.error && typeof maybeWrapped.error === 'object'
            ? maybeWrapped.error
            : err;

        if (typeof errorSource === 'object' && errorSource !== null) {
          const supabaseError = errorSource as {
            message?: string;
            details?: string;
            hint?: string;
            code?: string;
          };

          message =
            supabaseError.message ||
            supabaseError.details ||
            (supabaseError.code ? `Error code: ${supabaseError.code}` : message);
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);

  const handleCreate = async (data: LessonFormData) => {
    if (!user?.id) return
    try {
      await createLesson({
        student_id: data.studentId,
        teacher_id: data.teacherId,
        start_time: data.startTime,
        end_time: data.endTime,
        price: data.price,
        created_by: user.id,
      })
      const updated = await fetchLessons()
      setLessons(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating lesson')
    }
  }

  const handleEdit = async (lessonId: string, data: LessonFormData) => {
    try {
      await updateLesson(lessonId, {
        student_id: data.studentId,
        teacher_id: data.teacherId,
        start_time: data.startTime,
        end_time: data.endTime,
        price: data.price,
      })
      const updated = await fetchLessons()
      setLessons(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating lesson')
    }
  }

  const handleCancel = async (lessonId: string) => {
    try {
      await cancelLesson(lessonId)
      setLessons((prev) =>
        prev.map((l) => (l.id === lessonId ? { ...l, status: 'cancelled' as const } : l))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cancelling lesson')
    }
  }

  if (loading) return <div>Loading lessons...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <ScheduleCalendar
      lessons={lessons}
      canCreate={isAdminOrManager}
      canEdit={isAdminOrManager}
      canCancel={isAdminOrManager}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onCancel={handleCancel}
    />
  )
}

export default SchedulePage