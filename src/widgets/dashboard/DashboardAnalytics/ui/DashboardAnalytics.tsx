import { useMetrics } from '../model/useMetrics'
import { StatCard } from './StatCard/StatCard'
import { RevenueChart } from './RevenueChart/RevenueChart'
import { LessonsByDayChart } from './LessonsByDayChart/LessonsByDayChart'
import { AsyncBoundary } from '@/shared/ui'
import type { RevenueChartData, LessonsByDayData } from '../model/types'
import styles from './DashboardAnalytics.module.css'

export const DashboardAnalytics = () => {
  const { stats, chartData, chartType, loading, error } = useMetrics()

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
        <div className={styles.chart}>
          {chartType === 'revenue' && (
            <RevenueChart data={chartData as RevenueChartData[]} />
          )}
          {chartType === 'lessons' && (
            <LessonsByDayChart data={chartData as LessonsByDayData[]} />
          )}
        </div>
      </div>
    </AsyncBoundary>
  )
}