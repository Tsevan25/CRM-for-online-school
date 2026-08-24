import  Dashboard  from '@/widgets/Dashboard'
import { useDashboardData } from '@/features/dashboard/model/useDashboardData'
import { AsyncBoundary } from '@/shared/ui/AsyncBoundary'

const DashboardPage = () => {
  const { stats, chartNode, loading, error } = useDashboardData()

  return (
    <AsyncBoundary loading={loading} error={error}>
      {chartNode ? <Dashboard heading="Dashboard" stats={stats} chart={chartNode} /> : null}
    </AsyncBoundary>
  )
}

export default DashboardPage