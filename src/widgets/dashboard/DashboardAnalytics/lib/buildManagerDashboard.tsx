import type { DashboardRawData } from '../api/dashboardApi'
import type { StatCardData, RevenueChartData } from '../model/types'
import { startOfMonth, endOfMonth, isInRange, sumLessonPayments, buildMonthlyRevenue } from './utils'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { GraduationCap, CalendarDays, CalendarRange, HandCoins } from 'lucide-react'

export function buildManagerDashboard(raw: DashboardRawData) {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date(now)
  todayEnd.setHours(23, 59, 59, 999)

  const todayLessons = raw.lessons.filter(l => isInRange(l.start_time, todayStart, todayEnd)).length
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weekLessons = raw.lessons.filter(l => isInRange(l.start_time, weekAgo, now)).length

  const revenueThisMonth = sumLessonPayments(raw.transactions, monthStart, monthEnd)

  const stats: StatCardData[] = [
    { title: 'Total Students', value: raw.totalStudents, icon: <GraduationCap />, description: 'All active students' },
    { title: 'Lessons Today', value: todayLessons, icon: <CalendarDays /> },
    { title: 'Lessons This Week', value: weekLessons, icon: <CalendarRange /> },
    { title: 'Revenue (month)', value: formatCurrency(revenueThisMonth), icon: <HandCoins /> },
  ]

  const chartData: RevenueChartData[] = buildMonthlyRevenue(raw.transactions)

  return { stats, chartData, chartType: 'revenue' as const }
}