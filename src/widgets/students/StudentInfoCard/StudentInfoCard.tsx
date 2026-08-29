import { useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";
import { useAsync } from "@/shared/hooks/useAsync";
import { fetchStudentById } from "@/entities/student/api/studentApi";
import { Card, Typography, AsyncBoundary } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import styles from "./StudentInfoCard.module.css";

export const StudentInfoCard = () => {
  const { id } = useParams<{ id: string }>();
  const { role } = useAppSelector((state) => state.auth);
  const {
    data: student,
    loading,
    error,
  } = useAsync(() => fetchStudentById(id!));

  return (
    <AsyncBoundary loading={loading} error={error}>
      {student && (
        <Card padding="large" className={styles.card}>
          <Typography variant="h2" className={styles.name}>
            {student.full_name}
          </Typography>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Typography variant="caption">Email</Typography>
              <Typography>{student.email || "—"}</Typography>
            </div>
            <div className={styles.infoItem}>
              <Typography variant="caption">Phone</Typography>
              <Typography>{student.phone || "—"}</Typography>
            </div>

            {(role === "admin" || role === "manager") && (
              <div className={styles.infoItem}>
                <Typography variant="caption">Balance</Typography>
                <Typography>{formatCurrency(student.balance)}</Typography>
              </div>
            )}

            <div className={styles.infoItem}>
              <Typography variant="caption">Created</Typography>
              <Typography>
                {new Date(student.created_at).toLocaleDateString("en-US")}
              </Typography>
            </div>
          </div>
        </Card>
      )}
    </AsyncBoundary>
  );
};
