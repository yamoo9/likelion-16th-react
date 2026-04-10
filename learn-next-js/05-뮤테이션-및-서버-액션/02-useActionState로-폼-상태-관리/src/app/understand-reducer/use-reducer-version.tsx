'use client'

import type { Todo } from './page'

import { useReducer } from 'react'

// 타입 선언
type TodosState = Todo[]
type TodosAction =
  | { type: '@todo/add'; payload: Todo }
  | { type: '@todo/delete'; payload: Todo['id'] }

// 상태를 관리하는 리듀서 함수
// - 순수 함수 (상태 관리만 담당, 부수 효과 포함하면 안됨!)
// - (상태, 액션)만 전달 받음
const todosReducer = (state: TodosState, action: TodosAction) => {
  switch (action.type) {
    case '@todo/add': {
      console.log('새로운 할 일을 추가하세요!')
      return [action.payload, ...state]
    }
    case '@todo/delete': {
      console.log('할 일을 삭제하세요!')
      return state.filter((todo) => todo.id !== action.payload)
    }
    default: {
      return state
    }
  }
}

export function UseReducerVersion({ initialTodos }: { initialTodos: Todo[] }) {
  // useReducer 훅을 사용해 상태 관리 (리듀서 함수 설정, 초기값 구성)
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

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

    // 리듀서(reducer)한테 이렇게 작업(action)하라고 알림(dispatch)
    dispatch({ type: '@todo/add', payload: newTodo })
  }

  // 삭제 기능
  const deleteTodo = (todoId: Todo['id']) => {
    // 리듀서(reducer)한테 이렇게 작업(action)하라고 알림(dispatch)
    dispatch({ type: '@todo/delete', payload: todoId })
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
