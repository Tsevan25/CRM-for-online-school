import  Dashboard  from '@/widgets/Dashboard'
import { useDashboardData } from '@/features/dashboard/model/useDashboardData'

const DashboardPage = () => {
  const { stats, chartNode } = useDashboardData()

  if (!chartNode) return null

  return <Dashboard heading="Dashboard" stats={stats} chart={chartNode} />
}

export default DashboardPage