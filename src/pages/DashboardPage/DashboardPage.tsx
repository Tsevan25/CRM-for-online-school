import  Dashboard  from '@/widgets/Dashboard'
import { useDashboardData } from '@/features/dashboard/model/useDashboardData'
import {Spinner, ErrorMessage} from '@/shared'

const DashboardPage = () => {
  const { stats, chartNode, loading, error } = useDashboardData()

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!chartNode) return <div>No data</div>

  return <Dashboard heading="Dashboard" stats={stats} chart={chartNode} />
}

export default DashboardPage