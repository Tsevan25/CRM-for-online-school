import { useNavigate } from 'react-router-dom'
import type { Student } from '@/entities/student/model/types'
import type { LessonWithNames } from '@/entities/lesson/model/types'
import type { TransactionWithStudent } from '@/entities/transaction/model/types'
import styles from './StudentDetails.module.css'
import { Typography, Card, Button, DataTable, type Column } from '@/shared'

interface StudentDetailsProps {
  student: Student
  lessons: LessonWithNames[]
  transactions: TransactionWithStudent[]
}

const StudentDetails = ({ student, lessons, transactions }: StudentDetailsProps) => {
  const navigate = useNavigate()

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(student.balance)

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)

  const lessonColumns: Column<LessonWithNames>[] = [
    { key: 'date', header: 'Date', render: (l) => formatDate(l.start_time) },
    { key: 'teacher', header: 'Teacher', render: (l) => l.teacher?.full_name || '—' },
    {
      key: 'status',
      header: 'Status',
      render: (l) => (
        <Typography variant="caption" className={`${styles.status} ${styles[l.status]}`}>
          {l.status}
        </Typography>
      ),
    },
    { key: 'price', header: 'Price', render: (l) => formatCurrency(l.price) },
  ]

  const transactionColumns: Column<TransactionWithStudent>[] = [
    { key: 'date', header: 'Date', render: (t) => formatDate(t.created_at) },
    { key: 'type', header: 'Type', render: (t) => t.type.replace('_', ' ') },
    {
      key: 'amount',
      header: 'Amount',
      render: (t) => (
        <span className={t.amount < 0 ? styles.negative : styles.positive}>
          {formatCurrency(t.amount)}
        </span>
      ),
    },
    { key: 'description', header: 'Description', render: (t) => t.description || '—' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="secondary" size="small" onClick={() => navigate('/students')}>
          ← Back to Students
        </Button>
      </div>

      <Card padding="large" className={styles.infoCard}>
        <Typography variant="h2" className={styles.name}>{student.full_name}</Typography>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email</span>
            <span className={styles.value}>{student.email || '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Phone</span>
            <span className={styles.value}>{student.phone || '—'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Balance</span>
            <span className={styles.value}>{formattedBalance}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Created</span>
            <span className={styles.value}>{formatDate(student.created_at)}</span>
          </div>
        </div>
      </Card>

      <Card padding="large" className={styles.sectionCard}>
        <Typography variant="h3" className={styles.sectionTitle}>Lesson History</Typography>
        {lessons.length === 0 ? (
          <Typography variant="body" className={styles.empty}>No lessons yet</Typography>
        ) : (
          <DataTable columns={lessonColumns} data={lessons} keyField="id" />
        )}
      </Card>

      <Card padding="large" className={styles.sectionCard}>
        <Typography variant="h3" className={styles.sectionTitle}>Transaction History</Typography>
        {transactions.length === 0 ? (
          <Typography variant="body" className={styles.empty}>No transactions yet</Typography>
        ) : (
          <DataTable columns={transactionColumns} data={transactions} keyField="id" />
        )}
      </Card>
    </div>
  )
}

export default StudentDetails