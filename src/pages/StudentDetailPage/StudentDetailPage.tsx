import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { StudentInfoCard } from '@/widgets/students/StudentInfoCard';
import { StudentLessons } from '@/widgets/students/StudentLessons';
import { StudentTransactions } from '@/widgets/students/StudentTransactions';
import styles from './StudentDetailPage.module.css';

export const StudentDetailPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <Button
        variant="secondary"
        size="small"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        ← Back to Students
      </Button>

      <StudentInfoCard />

      <div className={styles.columns}>
        <StudentLessons />
        <StudentTransactions />
      </div>
    </div>
  )
}