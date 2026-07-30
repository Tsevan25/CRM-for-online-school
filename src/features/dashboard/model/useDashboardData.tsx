import { useAppSelector } from '../../../app/store'
import  RevenueChart  from '../ui/RevenueChart'
import  LessonsByDayChart  from '../ui/LessonsByDayChart'
import type { StatCardData } from './types'


const adminRevenue = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 98000 },
  { month: 'Mar', revenue: 145000 },
  { month: 'Apr', revenue: 160000 },
  { month: 'May', revenue: 132000 },
  { month: 'Jun', revenue: 175000 },
]

const managerRevenue = [
  { month: 'Jan', revenue: 98000 },
  { month: 'Feb', revenue: 112000 },
  { month: 'Mar', revenue: 87000 },
  { month: 'Apr', revenue: 134000 },
  { month: 'May', revenue: 101000 },
  { month: 'Jun', revenue: 120000 },
]

const teacherWeekly = [
  { day: 'Mon', lessons: 4 },
  { day: 'Tue', lessons: 5 },
  { day: 'Wed', lessons: 3 },
  { day: 'Thu', lessons: 6 },
  { day: 'Fri', lessons: 4 },
  { day: 'Sat', lessons: 2 },
  { day: 'Sun', lessons: 0 },
]

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)

export const useDashboardData = () => {
  const { role } = useAppSelector((state) => state.auth)

  switch (role) {
    case 'admin': {
      const stats: StatCardData[] = [
        { title: 'Students', value: 120, icon: '👩‍🎓', description: 'Total active students' },
        { title: 'Teachers', value: 8, icon: '👨‍🏫' },
        { title: 'Lessons (month)', value: 340, icon: '📅' },
        { title: 'Revenue (month)', value: formatCurrency(175000), icon: '💰' },
      ]
      return {
        stats,
        chartNode: <RevenueChart data={adminRevenue} />,
      }
    }
    case 'manager': {
      const stats: StatCardData[] = [
        { title: 'My Students', value: 45, icon: '👩‍🎓', description: 'Total assigned students' },
        { title: "Today's Lessons", value: 12, icon: '📅' },
        { title: 'Week Lessons', value: 67, icon: '📆' },
        { title: 'Revenue (month)', value: formatCurrency(120000), icon: '💰' },
      ]
      return {
        stats,
        chartNode: <RevenueChart data={managerRevenue} />,
      }
    }
    case 'teacher': {
      const stats: StatCardData[] = [
        { title: 'My Students', value: 28, icon: '👩‍🎓', description: 'Students with lessons' },
        { title: 'My Lessons Today', value: 4, icon: '📅' },
        { title: 'Completed (month)', value: 52, icon: '✅' },
      ]
      return {
        stats,
        chartNode: <LessonsByDayChart data={teacherWeekly} />,
      }
    }
    default:
      return { stats: [], chartNode: null }
  }
}