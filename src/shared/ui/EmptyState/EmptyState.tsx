import styles from './EmptyState.module.css'

interface EmptyStateProps {
  message?: string
}

export const EmptyState = ({ message = 'No data' }: EmptyStateProps) => {
  return <div className={styles.empty}>{message}</div>
}

