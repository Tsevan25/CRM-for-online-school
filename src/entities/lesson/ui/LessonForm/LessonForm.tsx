import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { lessonSchema, type LessonFormData } from '../../model/types'
import { Input, Button, Select} from '@/shared/ui'
import styles from './LessonForm.module.css'

interface StudentOption {
  id: string
  full_name: string
}

interface TeacherOption {
  id: string
  full_name: string
}

interface LessonFormProps {
  defaultValues?: Partial<LessonFormData>
  onSubmit: (data: LessonFormData) => void
  onCancel: () => void
  submitLabel?: string
  students: StudentOption[]
  teachers: TeacherOption[]
}
export const LessonForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Create Lesson',
  students,
  teachers,
}: LessonFormProps) => {
  const [rootError, setRootError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      studentId: '',
      teacherId: '',
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
      <Select
        label="Student"
        error={errors.studentId?.message}
        options={students.map((s) => ({ value: s.id, label: s.full_name }))}
        {...register('studentId')}
      />

      <Select
        label="Teacher"
        error={errors.teacherId?.message}
        options={teachers.map((t) => ({ value: t.id, label: t.full_name }))}
        {...register('teacherId')}
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

