import type { Student } from '../../model/types'
import styles from './StudentRow.module.css'
import { UserPen, Trash } from 'lucide-react'
import Button from '@/shared/ui/Button/Button'

interface StudentRowProps {
  student: Student
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
}

const StudentRow = ({ student, onEdit, onDelete, onView }: StudentRowProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(student.balance)

  const formattedDate = new Date(student.created_at).toLocaleDateString('en-US')

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        {onView ? (
          <Button
            variant="secondary"
            size="small"
            className={styles.linkButton}
            onClick={() => onView(student.id)}
          >
            {student.full_name}
          </Button>
        ) : (
          student.full_name
        )}
      </td>
      <td className={styles.cell}>{student.email || '—'}</td>
      <td className={styles.cell}>{student.phone || '—'}</td>
      <td className={styles.cell}>{formattedBalance}</td>
      <td className={styles.cell}>{formattedDate}</td>
      <td className={styles.actions}>
        {onEdit && (
          <Button
            variant="secondary"
            size="small"
            className={styles.actionBtn}
            onClick={() => onEdit(student.id)}
            aria-label="Edit student"
          >
            <UserPen />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="secondary"
            size="small"
            className={styles.actionBtn}
            onClick={() => onDelete(student.id)}
            aria-label="Delete student"
          >
            <Trash />
          </Button>
        )}
      </td>
    </tr>
  )
}

export default StudentRow