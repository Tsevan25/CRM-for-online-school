import { useAppSelector } from '@/app/store'
import { Typography } from '@/shared/ui'
import { Weather } from '@/widgets/weather/Weather'
import { Todo } from '@/features/todo/ui'
import styles from './HomePage.module.css'

export const HomePage = () => {
  const { user, fullName } = useAppSelector((state) => state.auth)

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.greetingBlock}>
            <Typography variant="h1" className={styles.greeting}>
              Welcome, {fullName || user?.email}!
            </Typography>
            <Typography variant="body" className={styles.subtitle}>
              Here is your daily overview
            </Typography>
          </div>
          <Todo />
        </div>
        <div className={styles.rightColumn}>
          <Weather />
        </div>
      </div>
    </div>
  )
}