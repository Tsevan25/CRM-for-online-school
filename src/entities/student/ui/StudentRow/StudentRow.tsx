import type { Student } from '../../model/types'
import styles from './StudentRow.module.css'
import { UserPen, Trash } from 'lucide-react'
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

  const formattedDate = new Date(student.createdAt).toLocaleDateString('en-US')

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        {onView ? (
          <button className={styles.linkButton} onClick={() => onView(student.id)}>
            {student.fullName}
          </button>
        ) : (
          student.fullName
        )}
      </td>
      <td className={styles.cell}>{student.email || '—'}</td>
      <td className={styles.cell}>{student.phone || '—'}</td>
      <td className={styles.cell}>{formattedBalance}</td>
      <td className={styles.cell}>{formattedDate}</td>
      <td className={styles.actions}>
        {onEdit && (
          <button className={styles.actionBtn} onClick={() => onEdit(student.id)}>
            <UserPen />
          </button>
        )}
        {onDelete && (
          <button className={styles.actionBtn} onClick={() => onDelete(student.id)}>
            <Trash />
          </button>
        )}
      </td>
    </tr>
  )
}

export default StudentRow