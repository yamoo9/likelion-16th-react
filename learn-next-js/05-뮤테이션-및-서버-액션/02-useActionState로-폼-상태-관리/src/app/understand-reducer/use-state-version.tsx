'use client'

import { useState } from 'react'
import type { Todo } from './page'

export function UseStateVersion({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const doit = formData.get('todo')?.toString()

    if (doit) {
      createTodo(doit)
      form.reset()
    }
  }

  // 추가 기능
  const createTodo = (doit: Todo['doit']) => {
    const newTodo: Todo = {
      id: Date.now(),
      doit,
    }

    setTodos((todos) => [newTodo, ...todos])
  }

  // 삭제 기능
  const deleteTodo = (todoId: Todo['id']) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== todoId))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          aria-label="할 일"
          className="border px-2 py-1"
        />
        <button
          type="submit"
          className="rounded-sm border bg-slate-950 px-2 py-1 text-white"
        >
          추가
        </button>
      </form>
      <ul className="flex flex-col space-y-3">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.doit}{' '}
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="rounded-sm border px-2 py-1"
              >
                삭제
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
