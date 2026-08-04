import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import styles from './AddStudentForm.module.css'

const studentSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  initialBalance: z.coerce.number(),
})

export type StudentFormData = z.infer<typeof studentSchema>

interface AddStudentFormProps {
  defaultValues?: Partial<StudentFormData>
  onSubmit: (data: StudentFormData) => void
  onCancel: () => void
  submitLabel?: string
}

const AddStudentForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Add Student',
}: AddStudentFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      initialBalance: 0,
      ...defaultValues,
    },
  })

  const onFormSubmit = async (data: StudentFormData) => {
    try {
      await onSubmit(data)
      setRootError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error submitting form'
      setRootError(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        error={errors.fullName?.message}
        {...register('fullName')}
      />
      <Input
        label="Email"
        type="email"
        placeholder="student@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 234 567 890"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Input
        label="Initial Balance ($)"
        type="number"
        error={errors.initialBalance?.message}
        {...register('initialBalance')}
      />

      {rootError && <p className={styles.rootError}>{rootError}</p>}

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default AddStudentForm