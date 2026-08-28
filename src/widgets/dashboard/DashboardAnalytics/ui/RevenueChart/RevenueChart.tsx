import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { RevenueChartData } from '../../model/types'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import styles from './RevenueChart.module.css'

interface RevenueChartProps {
  data: RevenueChartData[]
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip
            formatter={(value: number | string | readonly (string | number)[] | undefined) =>
              formatCurrency(value as number)
            }
          />
          <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}