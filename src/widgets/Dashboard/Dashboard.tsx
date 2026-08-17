import type { ReactNode } from 'react'
import {Card, Typography} from '@/shared/ui'
import styles from './Dashboard.module.css'
import type { StatCardData } from '@/features/dashboard'


interface DashboardProps {
  heading: string
  stats: StatCardData[]
  chart: ReactNode
}

const Dashboard = ({ heading, stats, chart }: DashboardProps) => {
  return (
    <div className={styles.dashboard}>
      <Typography variant='h2' className={styles.heading}>{heading}</Typography>

      <div className={styles.grid}>
        {stats.map((stat) => (
          <Card key={stat.title} padding="medium" className={styles.statCard}>
            {stat.icon && <span className={styles.icon}>{stat.icon}</span>}
            <div className={styles.body}>
              <Typography variant='caption' className={styles.title}>{stat.title}</Typography>
               <Typography variant='caption' className={styles.value}>{stat.value}</Typography>
              {stat.description && (
                <Typography variant='caption' className={styles.desc}>{stat.description}</Typography>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card padding="large" className={styles.chartCard}>
        {chart}
      </Card>
    </div>
  )
}

export default Dashboard