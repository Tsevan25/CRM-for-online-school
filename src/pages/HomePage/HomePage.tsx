import { useAppSelector } from '@/app/store'
import { Typography } from '@/shared/ui'
import { Weather } from '@/widgets/weather/Weather' 
import styles from './HomePage.module.css'

export const HomePage = () => {
  const { user, fullName } = useAppSelector((state) => state.auth)

  return (
    <div className={styles.container}>
      <Typography variant="h1" className={styles.greeting}>
        Welcome, {fullName || user?.email}!
      </Typography>
      <Typography variant="body" className={styles.subtitle}>
        Here is your daily overview
      </Typography>
      <div className={styles.weather}>
        <Weather />
      </div>
    </div>
  )
}