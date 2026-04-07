'use client'

import { Todo } from '@/actions/todo-actions'
import { TodoCreateForm } from './todo-create-form'
import { TodoList } from './todo-list'

interface TodoListProps {
  initialTodos: Todo[]
}

export default function TodoController({ initialTodos }: TodoListProps) {
  return (
    <div className="space-y-6">
      <TodoCreateForm />
      <TodoList data={initialTodos} />
    </div>
  )
}

