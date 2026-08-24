import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/store'
import { RevenueChart } from '../ui/RevenueChart'
import { LessonsByDayChart, type StatCardData } from '@/features/dashboard'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { supabase } from '@/shared/api/supabase'
import { GraduationCap, CalendarDays, HandCoins, CircleCheckBig } from 'lucide-react'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'
import type { Student } from '@/entities/student/model/types'
import type { Lesson } from '@/entities/lesson/model/types'
import type { Transaction } from '@/entities/transaction/model/types'
import {
  startOfMonth,
  endOfMonth,
  isInRange,
  sumLessonPayments,
  buildMonthlyRevenue,
  buildLessonsByDay,
} from './dashboardUtils'

export const useDashboardData = () => {
  const { role, user } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<{ stats: StatCardData[]; chartNode: React.ReactNode } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const [studentsRes, teachersRes, lessonsRes, transactionsRes] = await Promise.all([
          supabase.from('students').select('*', { count: 'exact' }),
          supabase.from('profiles').select('*', { count: 'exact' }).eq('role', 'teacher'),
          supabase.from('lessons').select('*'),
          supabase.from('transactions').select('*'),
        ])

        if (studentsRes.error) throw studentsRes.error
        if (teachersRes.error) throw teachersRes.error
        if (lessonsRes.error) throw lessonsRes.error
        if (transactionsRes.error) throw transactionsRes.error

        const students: Student[] = studentsRes.data || []
        const lessons: Lesson[] = lessonsRes.data || []
        const transactions: Transaction[] = transactionsRes.data || []

        const now = new Date()
        const monthStart = startOfMonth(now)
        const monthEnd = endOfMonth(now)

        const lessonsThisMonth = lessons.filter(l => isInRange(l.start_time, monthStart, monthEnd))
        const revenueThisMonth = sumLessonPayments(transactions, monthStart, monthEnd)
        const monthlyRevenue = buildMonthlyRevenue(transactions)

        let stats: StatCardData[] = []
        let chartNode: React.ReactNode = null

        if (role === 'admin') {
          stats = [
            { title: 'Students', value: studentsRes.count || 0, icon: <GraduationCap />, description: 'Total active students' },
            { title: 'Teachers', value: teachersRes.count || 0, icon: <LiaChalkboardTeacherSolid /> },
            { title: 'Lessons (month)', value: lessonsThisMonth.length, icon: <CalendarDays /> },
            { title: 'Revenue (month)', value: formatCurrency(revenueThisMonth), icon: <HandCoins /> },
          ]
          chartNode = <RevenueChart data={monthlyRevenue} />
        } else if (role === 'manager') {
          const myStudentsCount = students.filter(s => s.created_by === user?.id).length
          const todayStart = new Date(now.setHours(0, 0, 0, 0))
          const todayEnd = new Date(now.setHours(23, 59, 59, 999))
          const todayLessons = lessons.filter(l => isInRange(l.start_time, todayStart, todayEnd)).length
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          const weekLessons = lessons.filter(l => isInRange(l.start_time, weekAgo, now)).length

          stats = [
            { title: 'My Students', value: myStudentsCount, icon: <GraduationCap />, description: 'Total assigned students' },
            { title: "Today's Lessons", value: todayLessons, icon: <CalendarDays /> },
            { title: 'Week Lessons', value: weekLessons, icon: <CalendarDays /> },
            { title: 'Revenue (month)', value: formatCurrency(revenueThisMonth), icon: <HandCoins /> },
          ]
          chartNode = <RevenueChart data={monthlyRevenue} />
        } else if (role === 'teacher' && user) {
          const teacherLessons = lessons.filter(l => l.teacher_id === user.id)
          const myStudentsCount = new Set(teacherLessons.map(l => l.student_id)).size
          const todayStart = new Date(now.setHours(0, 0, 0, 0))
          const todayEnd = new Date(now.setHours(23, 59, 59, 999))
          const myTodayLessons = teacherLessons.filter(l => isInRange(l.start_time, todayStart, todayEnd)).length
          const completedThisMonth = teacherLessons.filter(l => l.status === 'completed' && isInRange(l.start_time, monthStart, monthEnd)).length
          const lessonsByDay = buildLessonsByDay(lessons, user.id, monthStart, monthEnd)

          stats = [
            { title: 'My Students', value: myStudentsCount, icon: <GraduationCap />, description: 'Students with lessons' },
            { title: 'My Lessons Today', value: myTodayLessons, icon: <CalendarDays /> },
            { title: 'Completed (month)', value: completedThisMonth, icon: <CircleCheckBig /> },
          ]
          chartNode = <LessonsByDayChart data={lessonsByDay} />
        }

        setData({ stats, chartNode })
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [role, user?.id])

  return { stats: data?.stats || [], chartNode: data?.chartNode || null, loading, error }
}