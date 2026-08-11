import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { lessonSchema, type LessonFormData } from '../../model/types'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import styles from './LessonForm.module.css'

interface LessonFormProps {
  defaultValues?: Partial<LessonFormData>
  onSubmit: (data: LessonFormData) => void
  onCancel: () => void
  submitLabel?: string
}

const LessonForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Create Lesson',
}: LessonFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      studentName: '',
      teacherName: '',
      startTime: '',
      endTime: '',
      price: 0,
      ...defaultValues,
    },
  })

  const onFormSubmit = async (data: LessonFormData) => {
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
      <div className={styles.field}>
        <label className={styles.label}>Student</label>
        <select className={styles.select} {...register('studentName')}>
          <option value="">Select student</option>
          <option value="Alice Johnson">Alice Johnson</option>
          <option value="Bob Smith">Bob Smith</option>
        </select>
        {errors.studentName && <span className={styles.error}>{errors.studentName.message}</span>}
      </div>

      <Input
        label="Teacher Name"
        placeholder="Mr. Smith"
        error={errors.teacherName?.message}
        {...register('teacherName')}
      />

      <Input
        label="Start Time"
        type="datetime-local"
        error={errors.startTime?.message}
        {...register('startTime')}
      />

      <Input
        label="End Time"
        type="datetime-local"
        error={errors.endTime?.message}
        {...register('endTime')}
      />

      <Input
        label="Price ($)"
        type="number"
        error={errors.price?.message}
        {...register('price')}
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

export default LessonForm