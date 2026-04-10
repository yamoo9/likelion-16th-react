'use client'

import type { Todo } from '@/actions/todo-actions'
import { TodoCreateForm } from './todo-create-form'
import { TodoList } from './todo-list'
import { useOptimistic } from 'react'

type OptimisticTodo = Todo & { sending?: boolean }

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

  const [optimisticTodos, distachOptimistic] = useOptimistic(
    initialTodos as OptimisticTodo[],
    optimisticTodosReducer,
  )

  return (
    <div className="space-y-6">
      <TodoCreateForm />
      <TodoList data={optimisticTodos} />
    </div>
  )
}
