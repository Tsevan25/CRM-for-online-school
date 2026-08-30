import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { lessonSchema, type LessonFormData } from '../../model/types'
import { Select, Button, Input, FormField } from '@/shared/ui'
import styles from './LessonForm.module.css'

const formatToLocalInput = (date: Date): string => {
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

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
    watch,
    setValue,
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

  const startTime = watch('startTime')
  const endTime = watch('endTime')

  useEffect(() => {
    if (startTime) {
      const startDate = new Date(startTime)
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
      const endTimeStr = formatToLocalInput(endDate)
      if (!endTime || new Date(endTime) < endDate) {
        setValue('endTime', endTimeStr)
      }
    }
  }, [startTime, endTime, setValue])

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
      <FormField label="Start Time" error={errors.startTime?.message}>
        <Input
          type="datetime-local"
          error={!!errors.startTime}
          {...register('startTime')}
        />
      </FormField>
      <FormField label="End Time" error={errors.endTime?.message}>
        <Input
          type="datetime-local"
          error={!!errors.endTime}
          {...register('endTime')}
        />
      </FormField>
      <FormField label="Price ($)" error={errors.price?.message}>
        <Input
          type="number"
          error={!!errors.price}
          {...register('price')}
        />
      </FormField>
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