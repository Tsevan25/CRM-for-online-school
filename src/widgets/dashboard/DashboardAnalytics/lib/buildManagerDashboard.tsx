import type { DashboardRawData } from '../api/dashboardApi'
import type { StatCardData, RevenueChartData } from '../model/types'
import { startOfMonth, endOfMonth, isInRange, sumLessonPayments, buildMonthlyRevenue } from './utils'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { GraduationCap, CalendarDays, HandCoins, CalendarRange } from 'lucide-react'

export function buildManagerDashboard(raw: DashboardRawData, userId?: string) {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const myStudentsCount = raw.students.filter(s => s.created_by === userId).length
  const todayStart = new Date(now.setHours(0, 0, 0, 0))
  const todayEnd = new Date(now.setHours(23, 59, 59, 999))
  const todayLessons = raw.lessons.filter(l => isInRange(l.start_time, todayStart, todayEnd)).length
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weekLessons = raw.lessons.filter(l => isInRange(l.start_time, weekAgo, now)).length

  const stats: StatCardData[] = [
    { title: 'My Students', value: myStudentsCount, icon: <GraduationCap />, description: 'Total assigned students' },
    { title: "Today's Lessons", value: todayLessons, icon: <CalendarDays /> },
    { title: 'Week Lessons', value: weekLessons, icon: <CalendarRange /> },
    { title: 'Revenue (month)', value: formatCurrency(sumLessonPayments(raw.transactions, monthStart, monthEnd)), icon: <HandCoins /> },
  ]

  const chartData: RevenueChartData[] = buildMonthlyRevenue(raw.transactions)

  return { stats, chartData, chartType: 'revenue' as const }
}