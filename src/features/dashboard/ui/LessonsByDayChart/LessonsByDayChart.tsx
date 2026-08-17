import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { LessonsByDayData } from '@/features/dashboard'
import styles from './LessonsByDayChart.module.css'
import { Typography } from '@/shared'

interface LessonsByDayChartProps {
  data: LessonsByDayData[]
}

const LessonsByDayChart = ({ data }: LessonsByDayChartProps) => {
  return (
    <>
      <Typography variant='h3' className={styles.title}>Lessons by Day of Week</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="day" stroke="var(--text-muted)" />
          <YAxis stroke="var(--text-muted)" />
          <Tooltip />
          <Bar dataKey="lessons" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default LessonsByDayChart