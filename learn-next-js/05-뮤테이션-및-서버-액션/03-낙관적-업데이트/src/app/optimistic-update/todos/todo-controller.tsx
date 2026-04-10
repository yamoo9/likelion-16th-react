'use client'

import { startTransition, useOptimistic, useRef } from 'react'
import { createTodoAction, toggleTodoAction, type Todo } from '@/actions/todo-actions'
import { TodoCreateForm } from './todo-create-form'
import { TodoList } from './todo-list'

export type OptimisticTodo = Todo & { sending?: boolean }

type OptimisticAction =
  | { type: '@todos/add'; payload: { title: Todo['title'] } }
  | { type: '@todos/toggle'; payload: { id: Todo['id'] } }

// 낙관적인 상태 관리 리듀서 함수
function optimisticTodosReducer(
  todos: OptimisticTodo[],
  action: OptimisticAction,
) {
  switch (action.type) {

    // 할 일 추가 로직
    case '@todos/add': {
      const newTodo: OptimisticTodo = {
        id: Date.now(),
        title: action.payload.title,
        done: false,
        sending: true,
      }

      const nextTodos = [newTodo, ...todos]
      return nextTodos
    }

    // 할 일 토글 로직
    case '@todos/toggle': {
      const nextTodos = todos.map((todo) => {
        if (todo.id !== action.payload.id) return todo
        const nextTodo = {
          ...todo,
          done: !todo.done,
          sending: true,
        }
        return nextTodo
      })

      return nextTodos
    }

    default: {
      return todos
    }
  }
}

export default function TodoController({ initialTodos }: { initialTodos: Todo[] }) {

  const formRef = useRef<HTMLFormElement>(null)

  const [optimisticTodos, distachOptimistic] = useOptimistic(
    initialTodos as OptimisticTodo[],
    optimisticTodosReducer,
  )

  // 할 일 추가 이벤트 핸들러
  const handleAddTodo = (formData: FormData) => {
    const title = formData.get('title')?.toString().trim()
    if (!title) return

    startTransition(async () => {
      distachOptimistic({ type: '@todos/add', payload: { title } })
      formRef.current?.reset()
      await createTodoAction(formData)
    })
  }

  // 할 일 토글 이벤트 핸들러
  const handleToggleTodo = (id: Todo['id']) => {
    startTransition(async () => {
      distachOptimistic({ type: '@todos/toggle', payload: { id: id } })
      await toggleTodoAction(id)
    })
  }

  return (
    <div className="space-y-6">
      <TodoCreateForm ref={formRef} action={handleAddTodo} />
      <TodoList data={optimisticTodos} onToggle={handleToggleTodo} />
    </div>
  )
}
