import type { DashboardRawData } from '../api/dashboardApi'
import type { StatCardData, RevenueChartData } from '../model/types'
import { startOfMonth, endOfMonth, isInRange, sumLessonPayments, buildMonthlyRevenue } from './utils'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { GraduationCap, CalendarDays, HandCoins } from 'lucide-react'
import { LiaChalkboardTeacherSolid } from 'react-icons/lia'

export function buildAdminDashboard(raw: DashboardRawData) {
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  const lessonsThisMonth = raw.lessons.filter(l => isInRange(l.start_time, monthStart, monthEnd))
  const revenue = sumLessonPayments(raw.transactions, monthStart, monthEnd)

  const stats: StatCardData[] = [
    { title: 'Students', value: raw.totalStudents, icon: <GraduationCap />, description: 'Total active students' },
    { title: 'Teachers', value: raw.totalTeachers, icon: <LiaChalkboardTeacherSolid /> },
    { title: 'Lessons (month)', value: lessonsThisMonth.length, icon: <CalendarDays /> },
    { title: 'Revenue (month)', value: formatCurrency(revenue), icon: <HandCoins /> },
  ]

  const chartData: RevenueChartData[] = buildMonthlyRevenue(raw.transactions)

  return { stats, chartData, chartType: 'revenue' as const }
}