import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, Typography } from '@/shared'
import type { RevenueChartData } from '@/features/dashboard'
import styles from './RevenueChart.module.css'

interface RevenueChartProps {
  data: RevenueChartData[]
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <>
      <Typography variant='h3' className={styles.title}>Monthly Revenue</Typography>
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