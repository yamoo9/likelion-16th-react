'use client'

import { startTransition, useEffect, useReducer, useRef } from 'react'

import {
  createTodoAction,
  toggleTodoAction,
  type Todo,
} from '@/actions/todo-actions'
import { TodoCreateForm } from './todo-create-form'
import { TodoList } from './todo-list'

type TodoAction =
  | { type: '@todo/add'; payload: { title: Todo['title'] } }
  | { type: '@todo/toggle'; payload: { todoId: Todo['id'] } }
  | { type: '@todo/sync'; payload: { todos: Todo[] } }

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

    case '@todo/sync': {
      // 서버 액션 성공 후 revalidatePath에 의해 새로운 initialTodos가 
      // 전달되면, 서버의 '진짜' 데이터로 상태를 교체해 상태를 동기화합니다.
      return action.payload.todos
    }

    default: {
      return todos
    }
  }
}

interface Props {
  initialTodos: Todo[]
}

export default function TodoController({ initialTodos }: Props) {
    
  const formRef = useRef<HTMLFormElement>(null)

  // useReducer는 최초 렌더링 시의 `initialTodos` prop만 기억합니다.
  // 이후 부모 컴포넌트에서 새로운 `initialTodos`를 내려줘도 스스로 상태를 바꾸지 않습니다.
  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  const handleAddTodo = (formData: FormData) => {
    const title = formData.get('title')?.toString().trim()
    if (!title) return

    startTransition(async () => {
      dispatch({ type: '@todo/add', payload: { title } })
      formRef.current?.reset()

      // 서버에 실제 데이터 저장 요청
      await createTodoAction(formData)
    })
  }

  const handleToggleTodo = (id: Todo['id']) => {
    startTransition(async () => {
      dispatch({ type: '@todo/toggle', payload: { todoId: id } })
      
      // 서버에 실제 데이터 저장 요청
      await toggleTodoAction(id)
    })
  }

  // [동기화 로직]
  // Server Action 내부의 revalidatePath()가 실행되면 
  // 이 컴포넌트가 리렌더링되면서 새로운 initialTodos Props를 받게 됩니다.
  // 이때 useEffect가 이를 감지하고 리듀서에 동기화(@todo/sync) 액션을 디스패치합니다.
  useEffect(() => {
    dispatch({ type: '@todo/sync', payload: { todos: initialTodos } })
  }, [initialTodos])

  return (
    <div className="space-y-6">
      <TodoCreateForm ref={formRef} action={handleAddTodo} />
      <TodoList data={todos} onToggle={handleToggleTodo} />
    </div>
  )
}
