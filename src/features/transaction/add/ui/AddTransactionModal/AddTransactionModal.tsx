import { useState, useEffect } from 'react'
import { Modal } from '@/shared/ui'
import { TransactionForm } from '@/entities/transaction'
import type { TransactionFormData } from '@/entities/transaction'
import { createTransaction } from '../../api/createTransaction'
import { useAppDispatch } from '@/app/store'
import { addNotification } from '@/features/notifications'
import { fetchStudents } from '@/entities/student'
import type { TransactionType } from '@/entities/transaction/model/types'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const AddTransactionModal = ({ isOpen, onClose, onSuccess }: AddTransactionModalProps) => {
  const [students, setStudents] = useState<{ id: string; full_name: string }[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isOpen) {
      fetchStudents().then(setStudents)
    }
  }, [isOpen])

  const handleSubmit = async (data: TransactionFormData) => {
    try {
      await createTransaction({
        student_id: data.studentId,
        amount: data.amount,
        type: data.type as TransactionType,
        description: data.description,
      })
      onClose()
      onSuccess?.()
      dispatch(addNotification({ type: 'success', message: 'Transaction added successfully' }))
    } catch (err) {
      console.error('Error creating transaction:', err)
      dispatch(addNotification({ type: 'error', message: 'Failed to add transaction' }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <TransactionForm
        students={students}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}