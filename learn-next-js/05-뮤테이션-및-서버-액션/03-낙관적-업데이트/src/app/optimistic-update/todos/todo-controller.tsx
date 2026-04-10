'use client'

import {
  createTodoAction,
  toggleTodoAction,
  type Todo,
} from '@/actions/todo-actions'
import { startTransition, useReducer, useRef } from 'react'
import { TodoCreateForm } from './todo-create-form'
import { TodoList } from './todo-list'

type TodoAction =
  | { type: '@todo/add'; payload: { title: Todo['title'] } }
  | { type: '@todo/toggle'; payload: { todoId: Todo['id'] } }

function todosReducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case '@todo/add': {
      return [
        { id: Date.now(), title: action.payload.title, done: false },
        ...todos,
      ]
    }

    case '@todo/toggle': {
      return todos.map((todo) =>
        todo.id !== action.payload.todoId
          ? todo
          : { ...todo, done: !todo.done },
      )
    }

    default: {
      return todos
    }
  }
}

export default function TodoController({
  initialTodos,
}: {
  initialTodos: Todo[]
}) {

  const formRef = useRef<HTMLFormElement>(null)

  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  // 할 일 추가 이벤트 핸들러
  const handleAddTodo = (formData: FormData) => {
    const title = formData.get('title')?.toString().trim()
    if (!title) return

    startTransition(async () => {
      dispatch({ type: '@todo/add', payload: { title } })
      formRef.current?.reset()
      await createTodoAction(formData)
    })
  }

  // 할 일 토글 이벤트 핸들러
  const handleToggleTodo = (id: Todo['id']) => {
    startTransition(async () => {
      dispatch({ type: '@todo/toggle', payload: { todoId: id } })
      await toggleTodoAction(id)
    })
  }

  return (
    <div className="space-y-6">
      <TodoCreateForm ref={formRef} action={handleAddTodo} />
      <TodoList data={todos} onToggle={handleToggleTodo} />
    </div>
  )
}
