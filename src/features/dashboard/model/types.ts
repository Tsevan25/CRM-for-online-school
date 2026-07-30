export interface StatCardData {
  title: string
  value: string | number
  icon?: string
  description?: string
}

export interface RevenueChartData {
  month: string
  revenue: number
}

export interface LessonsByDayData {
  day: string
  lessons: number
}