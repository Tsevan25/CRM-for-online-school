import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Button, Select } from '@/shared/ui'
import styles from './TransactionForm.module.css'

const transactionSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  amount: z.coerce.number(),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
})

export type TransactionFormData = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  students: { id: string; full_name: string }[]
  onSubmit: (data: TransactionFormData) => void
  onCancel: () => void
}

export const TransactionForm = ({ students, onSubmit, onCancel }: TransactionFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { amount: 0, description: '' },
  })

  const onFormSubmit = async (data: TransactionFormData) => {
    try {
      await onSubmit(data)
      setRootError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error submitting form'
      setRootError(message)
    }
  }

  const typeOptions = [
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
        options={typeOptions}
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