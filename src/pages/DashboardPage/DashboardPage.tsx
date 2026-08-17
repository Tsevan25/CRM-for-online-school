import  Dashboard  from '@/widgets/Dashboard'
import { useDashboardData } from '@/features/dashboard/model/useDashboardData'
import {Spinner} from '@/shared'

const DashboardPage = () => {
  const { stats, chartNode, loading, error } = useDashboardData()

  if (loading) return <Spinner />
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!chartNode) return <div>No data</div>

  return <Dashboard heading="Dashboard" stats={stats} chart={chartNode} />
}

export default DashboardPage