import { useParams } from "react-router-dom";
import { useAsync } from "@/shared/hooks/useAsync";
import { fetchTransactionsByStudent } from "@/entities/transaction/api/transactionApi";
import {
  Card,
  Typography,
  DataTable,
  EmptyState,
  AsyncBoundary,
} from "@/shared/ui";
import type { Column } from "@/shared/ui/DataTable";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import type { TransactionWithStudent } from "@/entities/transaction/model/types";
import styles from "./StudentTransactions.module.css";

export const StudentTransactions = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useAsync(() =>
    fetchTransactionsByStudent(id!),
  );
  const transactions = data ?? [];
  const columns: Column<TransactionWithStudent>[] = [
    {
      key: "date",
      header: "Date",
      render: (t) =>
        new Date(t.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    { key: "type", header: "Type", render: (t) => t.type.replace("_", " ") },
    {
      key: "amount",
      header: "Amount",
      render: (t) => (
        <span className={t.amount < 0 ? styles.negative : styles.positive}>
          {formatCurrency(t.amount)}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (t) => t.description || "—",
    },
  ];

  return (
    <AsyncBoundary loading={loading} error={error}>
      <Card padding="large" className={styles.card}>
        <Typography variant="h3" className={styles.title}>
          Transaction History
        </Typography>
        {transactions.length === 0 ? (
          <EmptyState message="No transactions yet" />
        ) : (
          <DataTable columns={columns} data={transactions} keyField="id" />
        )}
      </Card>
    </AsyncBoundary>
  );
};
