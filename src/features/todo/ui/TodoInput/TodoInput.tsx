import { useState } from 'react'
import { Button, Input } from '@/shared/ui'
import styles from './TodoInput.module.css'

interface TodoInputProps {
  onAdd: (text: string) => void
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task..."
        className={styles.input}
      />
      <Button type="submit" variant="primary" size="small">
        Add
      </Button>
    </form>
  )
}