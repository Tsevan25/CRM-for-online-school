import { Card, Typography } from '@/shared/ui'
import type { StatCardData } from '../../model/types'
import styles from './StatCard.module.css'

export const StatCard = ({ title, value, icon, description }: StatCardData) => (
  <Card padding="medium" className={styles.card}>
    {icon && <div className={styles.icon}>{icon}</div>}
    <div className={styles.body}>
      <Typography variant="caption" className={styles.title}>{title}</Typography>
      <Typography variant="h3" className={styles.value}>{value}</Typography>
      {description && <Typography variant="caption" className={styles.desc}>{description}</Typography>}
    </div>
  </Card>
)