import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/store'
import { RevenueChart } from '../ui/RevenueChart'
import { LessonsByDayChart, type StatCardData } from '@/features/dashboard'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { supabase } from '@/shared/api/supabase'
import { GraduationCap, CalendarDays, HandCoins, CircleCheckBig } from 'lucide-react'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'

interface DashboardData {
  stats: StatCardData[]
  chartNode: React.ReactNode
}

export const useDashboardData = () => {
  const { role, user } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboard = async () => {
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

        const studentsData = studentsRes.data || []
        const totalStudents = studentsRes.count || 0
        const totalTeachers = teachersRes.count || 0

        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

     
        const lessonsThisMonth = (lessonsRes.data || []).filter(
          (l) => new Date(l.start_time) >= new Date(startOfMonth) && new Date(l.start_time) <= new Date(endOfMonth)
        )
        const lessonsCount = lessonsThisMonth.length


        const revenueThisMonth = (transactionsRes.data || [])
          .filter(
            (t) =>
              t.type === 'lesson_payment' &&
              new Date(t.created_at) >= new Date(startOfMonth) &&
              new Date(t.created_at) <= new Date(endOfMonth)
          )
          .reduce((sum, t) => sum + Math.abs(t.amount), 0)

     
        const monthlyRevenue = []
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthStart = new Date(d.getFullYear(), d.getMonth(), 1).toISOString()
          const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).toISOString()
          const monthLabel = d.toLocaleDateString('en-US', { month: 'short' })
          const monthRevenue = (transactionsRes.data || [])
            .filter(
              (t) =>
                t.type === 'lesson_payment' &&
                new Date(t.created_at) >= new Date(monthStart) &&
                new Date(t.created_at) <= new Date(monthEnd)
            )
            .reduce((sum, t) => sum + Math.abs(t.amount), 0)
          monthlyRevenue.push({ month: monthLabel, revenue: monthRevenue })
        }

        let stats: StatCardData[] = []
        let chartNode: React.ReactNode = null

        if (role === 'admin') {
          stats = [
            { title: 'Students', value: totalStudents, icon: <GraduationCap />, description: 'Total active students' },
            { title: 'Teachers', value: totalTeachers, icon: <LiaChalkboardTeacherSolid /> },
            { title: 'Lessons (month)', value: lessonsCount, icon: <CalendarDays /> },
            { title: 'Revenue (month)', value: formatCurrency(revenueThisMonth), icon: <HandCoins /> },
          ]
          chartNode = <RevenueChart data={monthlyRevenue} />
        } else if (role === 'manager') {
      
          const myStudentsCount = studentsData.filter((s) => s.created_by === user?.id).length

          const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString()
          const todayEnd = new Date(now.setHours(23, 59, 59, 999)).toISOString()
          const todayLessonsCount = (lessonsRes.data || []).filter(
            (l) => new Date(l.start_time) >= new Date(todayStart) && new Date(l.start_time) <= new Date(todayEnd)
          ).length

          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          const weekLessonsCount = (lessonsRes.data || []).filter(
            (l) => {
              const d = new Date(l.start_time)
              return d >= weekAgo && d <= new Date()
            }
          ).length

          stats = [
            { title: 'My Students', value: myStudentsCount, icon: <GraduationCap />, description: 'Total assigned students' },
            { title: "Today's Lessons", value: todayLessonsCount, icon: <CalendarDays /> },
            { title: 'Week Lessons', value: weekLessonsCount, icon: <CalendarDays /> },
            { title: 'Revenue (month)', value: formatCurrency(revenueThisMonth), icon: <HandCoins /> },
          ]
          chartNode = <RevenueChart data={monthlyRevenue} />
        } else if (role === 'teacher' && user) {
          const teacherLessons = (lessonsRes.data || []).filter((l) => l.teacher_id === user.id)
          const myStudentsSet = new Set(teacherLessons.map((l) => l.student_id))
          const myStudentsCount = myStudentsSet.size

          const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString()
          const todayEnd = new Date(now.setHours(23, 59, 59, 999)).toISOString()
          const myTodayLessons = teacherLessons.filter(
            (l) => new Date(l.start_time) >= new Date(todayStart) && new Date(l.start_time) <= new Date(todayEnd)
          ).length

          const completedThisMonth = teacherLessons.filter(
            (l) => l.status === 'completed' &&
                 new Date(l.start_time) >= new Date(startOfMonth) &&
                 new Date(l.start_time) <= new Date(endOfMonth)
          ).length

          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          const lessonsByDay = daysOfWeek.map((day, index) => {
            const count = teacherLessons.filter((l) => {
              const d = new Date(l.start_time)
              return d >= new Date(startOfMonth) && d <= new Date(endOfMonth) && d.getDay() === index
            }).length
            return { day, lessons: count }
          })

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
        const message = err instanceof Error ? err.message : 'Failed to load dashboard'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [role, user?.id])

  return { stats: data?.stats || [], chartNode: data?.chartNode || null, loading, error }
}