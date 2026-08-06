import type { ReactNode } from 'react'
import Card from '@/shared/ui/Card/Card'
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
      <h2 className={styles.heading}>{heading}</h2>

      <div className={styles.grid}>
        {stats.map((stat) => (
          <Card key={stat.title} padding="medium" className={styles.statCard}>
            {stat.icon && <span className={styles.icon}>{stat.icon}</span>}
            <div className={styles.body}>
              <span className={styles.title}>{stat.title}</span>
              <span className={styles.value}>{stat.value}</span>
              {stat.description && (
                <span className={styles.desc}>{stat.description}</span>
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