import { useEffect, useState } from 'react'
import { fetchWeather } from '../api/weatherApi'
import type { WeatherApiResponse } from '../model/types'
import { WeatherCard } from './WeatherCard'
import { AsyncBoundary } from '@/shared/ui'

const defaultCoords = { latitude: 51.5074, longitude: -0.1278 }

export const Weather = () => {
  const [coords, setCoords] = useState(defaultCoords)
  const [data, setData] = useState<WeatherApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        () => {
        }
      )
    }
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const weather = await fetchWeather(coords.latitude, coords.longitude)
        setData(weather)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [coords])

  return (
    <AsyncBoundary loading={loading} error={error}>
      {data && (
        <WeatherCard
          temperature={data.current_weather.temperature}
          windspeed={data.current_weather.windspeed}
          weathercode={data.current_weather.weathercode}
          date={data.current_weather.time}
        />
      )}
    </AsyncBoundary>
  )
}