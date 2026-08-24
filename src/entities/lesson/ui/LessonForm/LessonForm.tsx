import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { lessonSchema, type LessonFormData } from '../../model/types'
import {FormField, Input, Button} from '@/shared/ui'
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

const LessonForm = ({
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
      <FormField label="Student" error={errors.studentId?.message}>
        <select className={styles.select} {...register('studentId')}>
          <option value="">Select student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.full_name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Teacher" error={errors.teacherId?.message}>
        <select className={styles.select} {...register('teacherId')}>
          <option value="">Select teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.full_name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Start Time" error={errors.startTime?.message}>
        <Input
          type="datetime-local"
          error={errors.startTime?.message}
          {...register('startTime')}
        />
      </FormField>

      <FormField label="End Time" error={errors.endTime?.message}>
        <Input
          type="datetime-local"
          error={errors.endTime?.message}
          {...register('endTime')}
        />
      </FormField>

      <FormField label="Price ($)" error={errors.price?.message}>
        <Input
          type="number"
          error={errors.price?.message}
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

export default LessonForm