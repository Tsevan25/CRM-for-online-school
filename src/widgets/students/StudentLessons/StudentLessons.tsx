import { useAppSelector } from '@/app/store'
import { useParams } from 'react-router-dom'
import { useAsync } from '@/shared/hooks/useAsync'
import { fetchLessonsByStudent } from '@/entities/lesson/api/lessonApi'
import { Card, Typography, DataTable, EmptyState, AsyncBoundary } from '@/shared/ui'
import type { Column } from '@/shared/ui/DataTable'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import type { LessonWithNames } from '@/entities/lesson/model/types'
import styles from './StudentLessons.module.css'

export const StudentLessons = () => {
  const { id } = useParams<{ id: string }>()
  const { role } = useAppSelector((state) => state.auth)
  const { data, loading, error } = useAsync(() => fetchLessonsByStudent(id!))
  const lessons = data ?? []

  const columns: Column<LessonWithNames>[] = [
    {
      key: 'date',
      header: 'Date',
      render: (l) =>
        new Date(l.start_time).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    { key: 'teacher', header: 'Teacher', render: (l) => l.teacher?.full_name || '—' },
    {
      key: 'status',
      header: 'Status',
      render: (l) => (
        <span className={`${styles.status} ${styles[l.status]}`}>{l.status}</span>
      ),
    },
    ...(role === 'admin' || role === 'manager'
      ? [
          {
            key: 'price',
            header: 'Price',
            render: (l: LessonWithNames) => formatCurrency(l.price),
          },
        ]
      : []),
  ]

  return (
    <AsyncBoundary loading={loading} error={error}>
      <Card padding="large" className={styles.card}>
        <Typography variant="h3" className={styles.title}>
          Lesson History
        </Typography>
        {lessons.length === 0 ? (
          <EmptyState message="No lessons yet" />
        ) : (
          <DataTable columns={columns} data={lessons} keyField="id" />
        )}
      </Card>
    </AsyncBoundary>
  )
}