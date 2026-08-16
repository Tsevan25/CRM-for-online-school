import Card from '@/shared/ui/Card/Card'
import Button from '@/shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import type { Student } from '@/entities/student/model/types'
import type { LessonWithNames } from '@/entities/lesson/model/types'
import type { TransactionWithStudent } from '@/entities/transaction/model/types'
import styles from './StudentDetails.module.css'

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="secondary" size="small" onClick={() => navigate('/students')}>
          ← Back to Students
        </Button>
      </div>

      <Card padding="large" className={styles.infoCard}>
        <h2 className={styles.name}>{student.full_name}</h2>
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
        <h3 className={styles.sectionTitle}>Lesson History</h3>
        {lessons.length === 0 ? (
          <p className={styles.empty}>No lessons yet</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.headRow}>
                <th className={styles.headCell}>Date</th>
                <th className={styles.headCell}>Teacher</th>
                <th className={styles.headCell}>Status</th>
                <th className={styles.headCell}>Price</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className={styles.row}>
                  <td className={styles.cell}>{formatDate(lesson.start_time)}</td>
                  <td className={styles.cell}>{lesson.teacher?.full_name || '—'}</td>
                  <td className={styles.cell}>
                    <span className={`${styles.status} ${styles[lesson.status]}`}>
                      {lesson.status}
                    </span>
                  </td>
                  <td className={styles.cell}>{formatCurrency(lesson.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card padding="large" className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>Transaction History</h3>
        {transactions.length === 0 ? (
          <p className={styles.empty}>No transactions yet</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.headRow}>
                <th className={styles.headCell}>Date</th>
                <th className={styles.headCell}>Type</th>
                <th className={styles.headCell}>Amount</th>
                <th className={styles.headCell}>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className={styles.row}>
                  <td className={styles.cell}>{formatDate(transaction.created_at)}</td>
                  <td className={styles.cell}>{transaction.type.replace('_', ' ')}</td>
                  <td className={`${styles.cell} ${transaction.amount < 0 ? styles.negative : styles.positive}`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className={styles.cell}>{transaction.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

export default StudentDetails