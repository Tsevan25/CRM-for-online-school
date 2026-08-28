import { useAppSelector } from '@/app/store'
import { useAsync } from '@/shared/hooks/useAsync'
import { fetchDashboardData } from '../api/dashboardApi'
import { buildAdminDashboard } from '../lib/buildAdminDashboard'
import { buildManagerDashboard } from '../lib/buildManagerDashboard'
import { buildTeacherDashboard } from '../lib/buildTeacherDashboard'
import type { StatCardData, RevenueChartData, LessonsByDayData, ChartType } from './types'

interface MetricsState {
  stats: StatCardData[]
  chartData: RevenueChartData[] | LessonsByDayData[]
  chartType: ChartType | null
  loading: boolean
  error: string | null
}

export const useMetrics = (): MetricsState => {
  const { role, user } = useAppSelector((state) => state.auth)
  const { data: raw, loading, error } = useAsync(fetchDashboardData)

  if (!raw) {
    return { stats: [], chartData: [], chartType: null, loading, error }
  }

  switch (role) {
    case 'admin': {
      const admin = buildAdminDashboard(raw)
      return { ...admin, loading, error }
    }
    case 'manager': {
      const manager = buildManagerDashboard(raw, user?.id)
      return { ...manager, loading, error }
    }
    case 'teacher': {
      if (!user?.id) {
        return { stats: [], chartData: [], chartType: null, loading, error }
      }
      const teacher = buildTeacherDashboard(raw, user.id)
      return { ...teacher, loading, error }
    }
    default:
      return { stats: [], chartData: [], chartType: null, loading, error }
  }
}