import { renderHook, act } from '@testing-library/react';
import { useTodo } from './useTodo';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useTodo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with an empty array of todos', () => {
    const { result } = renderHook(() => useTodo());
    expect(result.current.todos).toEqual([]);
  });

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Learn English');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toMatchObject({
      text: 'Learn English',
      done: false,
    });
  });

  it('should toggle todo completed status', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Do homework');
    });

    const targetId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(targetId);
    });

    expect(result.current.todos[0].done).toBe(true);
  });

  it('should remove a todo by its id', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Task to delete');
    });

    const targetId = result.current.todos[0].id;

    act(() => {
      result.current.removeTodo(targetId);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('should save todos to localStorage when a new one is added', () => {
    const { result } = renderHook(() => useTodo());

    act(() => {
      result.current.addTodo('Persist me');
    });

    const stored = JSON.parse(localStorage.getItem('todos') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].text).toBe('Persist me');
  });
});
