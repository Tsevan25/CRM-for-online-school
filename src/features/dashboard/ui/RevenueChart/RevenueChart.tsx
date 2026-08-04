import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import type { RevenueChartData } from '../../model/types'
import styles from './RevenueChart.module.css'

interface RevenueChartProps {
  data: RevenueChartData[]
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <>
      <h3 className={styles.title}>Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default RevenueChart