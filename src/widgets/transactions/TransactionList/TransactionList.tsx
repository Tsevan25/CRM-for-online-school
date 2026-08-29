import { useAsync } from '@/shared/hooks/useAsync'
import { useSearch } from '@/shared/hooks/useSearch'
import { fetchTransactions } from '@/entities/transaction'
import { AddTransactionAction } from '@/features/transaction/add'
import {
  PageHeader,
  DataTable,
  Card,
  EmptyState,
  AsyncBoundary,
  SearchInput,
} from '@/shared/ui'
import type { Column } from '@/shared/ui/DataTable'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import type { TransactionWithStudent } from '@/entities/transaction/model/types'
import styles from './TransactionList.module.css'

const columns: Column<TransactionWithStudent>[] = [
  {
    key: 'date',
    header: 'Date',
    render: (t) =>
      new Date(t.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
  {
    key: 'student',
    header: 'Student',
    render: (t) => t.student?.full_name || '—',
  },
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
  {
    key: 'description',
    header: 'Description',
    render: (t) => t.description || '—',
  },
]

export const TransactionList = () => {
  const { data, loading, error, refetch } = useAsync(fetchTransactions)
  const transactions = data ?? []

  const { searchTerm, setSearchTerm, filteredData } = useSearch(
    transactions,
    (t) => `${t.student?.full_name ?? ''} ${t.type} ${t.description ?? ''}`
  )

  return (
    <AsyncBoundary loading={loading} error={error}>
      <div className={styles.container}>
        <PageHeader
          title="Transactions"
          action={<AddTransactionAction onSuccess={refetch} />}
        />
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search transactions..."
        />
        <Card padding="small">
          {filteredData.length === 0 ? (
            <EmptyState message="No transactions" />
          ) : (
            <DataTable columns={columns} data={filteredData} keyField="id" />
          )}
        </Card>
      </div>
    </AsyncBoundary>
  )
}