import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/store'
import { removeNotification } from '../../model/slice'
import { Typography, Button } from '@/shared/ui'
import styles from './ToastContainer.module.css'

const ToastContainer = () => {
  const notifications = useAppSelector((state) => state.notifications.items)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (notifications.length === 0) return

    const timers = notifications.map((notification) =>
      setTimeout(() => {
        dispatch(removeNotification(notification.id))
      }, 4000)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [notifications, dispatch])

  if (notifications.length === 0) return null

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${styles.toast} ${styles[notification.type]}`}
        >
          <Typography variant="body" className={styles.message}>
            {notification.message}
          </Typography>
          <Button
            variant="icon"
            size="small"
            onClick={() => dispatch(removeNotification(notification.id))}
            aria-label="Close notification"
            className={styles.close}
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer