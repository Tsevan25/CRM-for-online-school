import type { ReactNode } from 'react'

export interface StatCardData {
  title: string
  value: string | number
  icon?: ReactNode
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

export type ChartType = 'revenue' | 'lessons'