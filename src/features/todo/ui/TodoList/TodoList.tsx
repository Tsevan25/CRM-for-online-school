import { Button, Typography } from '@/shared/ui'
import type { Todo } from '../../model/types'
import styles from './TodoList.module.css'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <Typography variant="body" className={styles.empty}>
        No tasks yet
      </Typography>
    )
  }

  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <li key={todo.id} className={styles.item}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggle(todo.id)}
              className={styles.checkbox}
            />
            <span className={`${styles.text} ${todo.done ? styles.done : ''}`}>
              {todo.text}
            </span>
          </label>
          <Button
            variant="secondary"
            size="small"
            onClick={() => onRemove(todo.id)}
            className={styles.removeButton}
            aria-label="Delete task"
          >
            ✕
          </Button>
        </li>
      ))}
    </ul>
  )
}