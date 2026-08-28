import type { DashboardRawData } from '../api/dashboardApi'
import type { StatCardData, LessonsByDayData } from '../model/types'
import { startOfMonth, endOfMonth, isInRange, buildLessonsByDay } from './utils'
import { GraduationCap, CalendarDays, CircleCheckBig } from 'lucide-react'

export function buildTeacherDashboard(raw: DashboardRawData, teacherId: string) {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const teacherLessons = raw.lessons.filter(l => l.teacher_id === teacherId)
  const myStudentsCount = new Set(teacherLessons.map(l => l.student_id)).size
  const todayStart = new Date(now.setHours(0, 0, 0, 0))
  const todayEnd = new Date(now.setHours(23, 59, 59, 999))
  const myTodayLessons = teacherLessons.filter(l => isInRange(l.start_time, todayStart, todayEnd)).length
  const completedThisMonth = teacherLessons.filter(l => l.status === 'completed' && isInRange(l.start_time, monthStart, monthEnd)).length

  const stats: StatCardData[] = [
    { title: 'My Students', value: myStudentsCount, icon: <GraduationCap />, description: 'Students with lessons' },
    { title: 'My Lessons Today', value: myTodayLessons, icon: <CalendarDays /> },
    { title: 'Completed (month)', value: completedThisMonth, icon: <CircleCheckBig /> },
  ]

  const chartData: LessonsByDayData[] = buildLessonsByDay(raw.lessons, teacherId, monthStart, monthEnd)

  return { stats, chartData, chartType: 'lessons' as const }
}