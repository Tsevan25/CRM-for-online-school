export interface WeatherApiResponse {
  current_weather: {
    temperature: number
    windspeed: number
    weathercode: number
    time: string
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherApiResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch weather')
  return response.json()
}