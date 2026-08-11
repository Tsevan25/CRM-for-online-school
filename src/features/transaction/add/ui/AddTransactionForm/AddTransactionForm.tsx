import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { mockStudents } from '@/entities/student/model/mock'
import type { TransactionType } from '@/entities/transaction/model/types'
import styles from './AddTransactionForm.module.css'

const addTransactionSchema = z.object({
  studentName: z.string().min(1, 'Student is required'),
  amount: z.coerce.number(),
  type: z.string().min(1, 'Type is required'),
  description: z.string().optional(),
})

type AddTransactionFormData = z.infer<typeof addTransactionSchema>

interface AddTransactionFormProps {
  onSubmit: (data: {
    studentId: string
    studentName: string
    amount: number
    type: TransactionType
    description?: string
  }) => void
  onCancel: () => void
}

const AddTransactionForm = ({ onSubmit, onCancel }: AddTransactionFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
  })

  const onFormSubmit = async (data: AddTransactionFormData) => {
    try {
      const student = mockStudents.find(s => s.fullName === data.studentName)
      if (!student) {
        setRootError('Student not found')
        return
      }
      await onSubmit({
        studentId: student.id,
        studentName: student.fullName,
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

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Student</label>
        <select className={styles.select} {...register('studentName')}>
          <option value="">Select student</option>
          {mockStudents.map(s => (
            <option key={s.id} value={s.fullName}>{s.fullName}</option>
          ))}
        </select>
        {errors.studentName && <span className={styles.error}>{errors.studentName.message}</span>}
      </div>

      <Input
        label="Amount ($)"
        type="number"
        error={errors.amount?.message}
        {...register('amount')}
      />

      <div className={styles.field}>
        <label className={styles.label}>Type</label>
        <select className={styles.select} {...register('type')}>
          <option value="">Select type</option>
          <option value="top_up">Top-up</option>
          <option value="lesson_payment">Lesson Payment</option>
          <option value="refund">Refund</option>
          <option value="adjustment">Adjustment</option>
        </select>
        {errors.type && <span className={styles.error}>{errors.type.message}</span>}
      </div>

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