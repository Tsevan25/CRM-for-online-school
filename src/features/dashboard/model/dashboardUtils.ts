import type { Lesson } from '@/entities/lesson/model/types'
import type { Transaction } from '@/entities/transaction/model/types'

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

export function isInRange(dateStr: string, start: Date, end: Date): boolean {
  const date = new Date(dateStr)
  return date >= start && date <= end
}

export function sumLessonPayments(transactions: Transaction[], start: Date, end: Date): number {
  return transactions
    .filter(t => t.type === 'lesson_payment' && isInRange(t.created_at, start, end))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
}

export function buildMonthlyRevenue(transactions: Transaction[]): { month: string; revenue: number }[] {
  const now = new Date()
  const result: { month: string; revenue: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short' })
    result.push({
      month: monthLabel,
      revenue: sumLessonPayments(transactions, monthStart, monthEnd),
    })
  }
  return result
}

export function buildLessonsByDay(
  lessons: Lesson[],
  teacherId: string,
  monthStart: Date,
  monthEnd: Date
): { day: string; lessons: number }[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const teacherLessons = lessons.filter(l => l.teacher_id === teacherId)
  return days.map((day, index) => ({
    day,
    lessons: teacherLessons.filter(l => {
      const date = new Date(l.start_time)
      return date >= monthStart && date <= monthEnd && date.getDay() === index
    }).length,
  }))
}