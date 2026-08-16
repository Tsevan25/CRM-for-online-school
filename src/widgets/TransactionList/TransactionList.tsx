import { useState } from 'react'
import type { TransactionWithStudent } from '@/entities/transaction/model/types'
import { fetchTransactions, createTransaction } from '@/shared/api/transactions'
import { fetchStudents } from '@/shared/api/students'
import { AddTransactionForm } from '@/features/transaction/add'
import {Modal, Button, Card, formatCurrency, useAsync} from '@/shared'
import styles from './TransactionList.module.css'

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

  if (loading) return <div>Loading transactions...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Transactions</h2>
        <Button variant="primary" size="small" onClick={() => setIsAddModalOpen(true)}>
          + Add Transaction
        </Button>
      </div>

      <Card padding="small">
        <table className={styles.table}>
          <thead>
            <tr className={styles.headRow}>
              <th className={styles.headCell}>Date</th>
              <th className={styles.headCell}>Student</th>
              <th className={styles.headCell}>Type</th>
              <th className={styles.headCell}>Amount</th>
              <th className={styles.headCell}>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className={styles.row}>
                <td className={styles.cell}>
                  {new Date(t.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </td>
                <td className={styles.cell}>{t.student?.full_name || '—'}</td>
                <td className={styles.cell}>{t.type.replace('_', ' ')}</td>
                <td className={`${styles.cell} ${t.amount < 0 ? styles.negative : styles.positive}`}>
                  {formatCurrency(t.amount)}
                </td>
                <td className={styles.cell}>{t.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
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