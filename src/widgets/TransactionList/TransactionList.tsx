import { useState } from 'react'
import { mockTransactions, type Transaction } from '@/entities/transaction'
import { AddTransactionForm } from '@/features/transaction/add'
import  Modal  from '@/shared/ui/Modal'
import Button from '@/shared/ui/Button'
import Card from '@/shared/ui/Card'
import { formatCurrency } from '@/shared/lib/formatCurrency'
import styles from './TransactionList.module.css'

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddTransaction = (data: {
    studentId: string
    studentName: string
    amount: number
    type: Transaction['type']
    description?: string
  }) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      studentId: data.studentId,
      studentName: data.studentName,
      amount: data.amount,
      type: data.type,
      date: new Date().toISOString(),
      description: data.description,
    }
    setTransactions(prev => [...prev, newTransaction])
    setIsAddModalOpen(false)
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

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
            {transactions.map(t => (
              <tr key={t.id} className={styles.row}>
                <td className={styles.cell}>{formatDate(t.date)}</td>
                <td className={styles.cell}>{t.studentName}</td>
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
          onSubmit={handleAddTransaction}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default TransactionList