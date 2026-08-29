import { Card, Typography } from '@/shared/ui'
import { useTodo } from '@/features/todo/model/useTodo'
import { TodoInput } from '@/features/todo/ui/TodoInput'
import { TodoList } from '@/features/todo/ui/TodoList'
import styles from './Todo.module.css'

export const Todo = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodo()

  return (
    <Card padding="large" className={styles.card}>
      <Typography variant="h3" className={styles.title}>
        Tasks
      </Typography>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
    </Card>
  )
}