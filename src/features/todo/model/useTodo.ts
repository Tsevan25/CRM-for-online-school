import { useEffect, useState } from 'react'
import type { Todo } from './types'

const STORAGE_KEY = 'todos'

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as Todo[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    if (!text.trim()) return
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      done: false,
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    )
  }

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, removeTodo }
}