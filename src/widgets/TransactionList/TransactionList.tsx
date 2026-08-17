import { useState } from 'react'
import type { TransactionWithStudent } from '@/entities/transaction/model/types'
import { fetchTransactions, createTransaction } from '@/shared/api/transactions'
import { fetchStudents } from '@/shared/api/students'
import { AddTransactionForm } from '@/features/transaction/add'
import {Modal, Button, Card, formatCurrency, useAsync, Spinner, ErrorMessage, EmptyState, DataTable, type Column, Typography} from '@/shared'
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
  { key: 'student', header: 'Student', render: (t) => t.student?.full_name || '—' },
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

const TransactionList = () => {
  const [transactions, setTransactions] = useState<TransactionWithStudent[]>([])
  const [students, setStudents] = useState<{ id: string; full_name: string }[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { loading, error, refetch } = useAsync(async () => {
    const [transData, studentData] = await Promise.all([
      fetchTransactions(),
      fetchStudents(),
    ])
    setTransactions(transData)
    setStudents(studentData)
    return { transData, studentData }
  })

  const handleAddTransaction = async (data: {
    studentId: string
    amount: number
    type: 'lesson_payment' | 'top_up' | 'refund' | 'adjustment'
    description?: string
  }) => {
    try {
      await createTransaction({
        student_id: data.studentId,
        amount: data.amount,
        type: data.type,
        description: data.description,
      })
      setIsAddModalOpen(false)
      await refetch()
    } catch (err) {
      console.error('Error creating transaction:', err)
    }
  }

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant='h2' className={styles.title}>Transactions</Typography>
        <Button variant="primary" size="small" onClick={() => setIsAddModalOpen(true)}>
          + Add Transaction
        </Button>
      </div>

      <Card padding="small">
        {transactions.length === 0 ? (
          <EmptyState message="No transactions" />
        ) : (
          <DataTable columns={columns} data={transactions} keyField="id" />
        )}
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Transaction"
      >
        <AddTransactionForm
          students={students}
          onSubmit={handleAddTransaction}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default TransactionList