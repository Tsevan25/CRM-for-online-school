import { Typography } from '@/shared/ui'
import styles from './UserBadge.module.css'

interface UserBadgeProps {
  fullName: string
  role: 'admin' | 'manager' | 'teacher' | null
}

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  manager: 'Manager',
  teacher: 'Teacher',
}

export const UserBadge = ({ fullName, role }: UserBadgeProps) => {
  return (
    <div className={styles.badge}>
      <Typography variant="body" className={styles.name}>
        {fullName}
      </Typography>
      {role && (
        <span className={`${styles.role} ${styles[role]}`}>
          {roleLabels[role]}
        </span>
      )}
    </div>
  )
}