import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/store'
import { ScheduleCalendar } from '@/widgets/ScheduleCalendar'
import { fetchLessonsByTeacher, updateLesson } from '@/shared/api/lessons'
import type { LessonStatus, LessonWithNames } from '@/entities/lesson/model/types'

const TeacherSchedulePage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [lessons, setLessons] = useState<LessonWithNames[]>([])  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return
    const load = async () => {
      try {
        const data = await fetchLessonsByTeacher(user.id)
        setLessons(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lessons')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user?.id])

  const handleStatusChange = async (lessonId: string, newStatus: LessonStatus) => {
    try {
      const updated = await updateLesson(lessonId, { status: newStatus })
      setLessons((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating status')
    }
  }

  if (loading) return <div>Loading your lessons...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <ScheduleCalendar
      lessons={lessons}
      canCreate={false}
      canEdit={false}
      canCancel={false}
      canChangeStatus={true}
      onStatusChange={handleStatusChange}
    />
  )
}

export default TeacherSchedulePage