import type { ReactNode } from 'react'
import Typography from '@/shared/ui/Typography/Typography'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  action?: ReactNode
}

const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <div className={styles.header}>
      <Typography variant="h2" className={styles.title}>{title}</Typography>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}

export default PageHeader