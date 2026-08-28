import { Typography } from '@/shared/ui'
import styles from './WeatherCard.module.css'

interface WeatherCardProps {
  temperature: number
  windspeed: number
  weathercode: number
  date: string
}

const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm',
}

export const WeatherCard = ({ temperature, windspeed, weathercode, date }: WeatherCardProps) => {
  const description = weatherDescriptions[weathercode] || 'Unknown'

  return (
    <div className={styles.card}>
      <Typography variant="h3" className={styles.city}>Your Location</Typography>
      <Typography variant="body" className={styles.date}>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Typography>
      <div className={styles.tempRow}>
        <Typography variant="h1" className={styles.temperature}>{Math.round(temperature)}°C</Typography>
        <span className={styles.weatherIcon}>{getWeatherIcon(weathercode)}</span>
      </div>
      <Typography variant="body" className={styles.description}>{description}</Typography>
      <Typography variant="caption" className={styles.wind}>Wind: {windspeed} km/h</Typography>
    </div>
  )
}

function getWeatherIcon(code: number): string {
  if (code <= 2) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 55) return '🌦️'
  if (code <= 65) return '🌧️'
  if (code <= 75) return '❄️'
  if (code <= 82) return '🌧️'
  if (code >= 95) return '⛈️'
  return '🌡️'
}