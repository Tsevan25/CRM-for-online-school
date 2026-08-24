import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {Input, Button, Select} from '@/shared/ui'
import type { TransactionType } from '@/entities/transaction/model/types'
import styles from './AddTransactionForm.module.css'

const addTransactionSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  amount: z.coerce.number(),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
})

type AddTransactionFormData = z.infer<typeof addTransactionSchema>

interface AddTransactionFormProps {
  students: { id: string; full_name: string }[]
  onSubmit: (data: {
    studentId: string
    amount: number
    type: TransactionType
    description?: string
  }) => void
  onCancel: () => void
}

const AddTransactionForm = ({ students, onSubmit, onCancel }: AddTransactionFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: { amount: 0, description: '' },
  })

  const onFormSubmit = async (data: AddTransactionFormData) => {
    try {
      await onSubmit({
        studentId: data.studentId,
        amount: data.amount,
        type: data.type as TransactionType,
        description: data.description,
      })
      setRootError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error adding transaction'
      setRootError(message)
    }
  }

  const transactionTypeOptions = [
    { value: 'top_up', label: 'Top-up' },
    { value: 'lesson_payment', label: 'Lesson Payment' },
    { value: 'refund', label: 'Refund' },
    { value: 'adjustment', label: 'Adjustment' },
  ]

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <Select
        label="Student"
        error={errors.studentId?.message}
        options={students.map((s) => ({ value: s.id, label: s.full_name }))}
        {...register('studentId')}
      />

      <Input
        label="Amount ($)"
        type="number"
        error={errors.amount?.message}
        {...register('amount')}
      />

      <Select
        label="Type"
        error={errors.type?.message}
        options={transactionTypeOptions}
        {...register('type')}
      />

      <Input
        label="Description"
        placeholder="Optional"
        error={errors.description?.message}
        {...register('description')}
      />

      {rootError && <p className={styles.rootError}>{rootError}</p>}

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  )
}

export default AddTransactionForm