import { useAppSelector } from '@/app/store'
import  RevenueChart  from '../ui/RevenueChart'
import  LessonsByDayChart  from '../ui/LessonsByDayChart'
import type { StatCardData } from './types'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import { adminRevenue, managerRevenue, teacherWeekly } from './mock'
import { GraduationCap, CalendarDays, HandCoins, CircleCheckBig } from 'lucide-react'
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


export const useDashboardData = () => {
  const { role } = useAppSelector((state) => state.auth)

  switch (role) {
    case 'admin': {
      const stats: StatCardData[] = [
        { title: 'Students', value: 120, icon: <GraduationCap />, description: 'Total active students' },
        { title: 'Teachers', value: 8, icon: <LiaChalkboardTeacherSolid /> },
        { title: 'Lessons (month)', value: 340, icon: <CalendarDays /> },
        { title: 'Revenue (month)', value: formatCurrency(175000), icon: <HandCoins /> },
      ]
      return {
        stats,
        chartNode: <RevenueChart data={adminRevenue} />,
      }
    }
    case 'manager': {
      const stats: StatCardData[] = [
        { title: 'My Students', value: 45, icon: <GraduationCap />, description: 'Total assigned students' },
        { title: "Today's Lessons", value: 12, icon: <CalendarDays /> },
        { title: 'Week Lessons', value: 67, icon: <CalendarDays /> },
        { title: 'Revenue (month)', value: formatCurrency(120000), icon: <HandCoins /> },
      ]
      return {
        stats,
        chartNode: <RevenueChart data={managerRevenue} />,
      }
    }
    case 'teacher': {
      const stats: StatCardData[] = [
        { title: 'My Students', value: 28, icon: <GraduationCap />, description: 'Students with lessons' },
        { title: 'My Lessons Today', value: 4, icon: <CalendarDays /> },
        { title: 'Completed (month)', value: 52, icon: <CircleCheckBig /> },
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