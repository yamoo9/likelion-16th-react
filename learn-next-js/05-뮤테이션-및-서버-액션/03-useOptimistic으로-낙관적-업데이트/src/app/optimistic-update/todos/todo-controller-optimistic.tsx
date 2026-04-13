'use client'

import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from 'react'
import {
  createTodoAction,
  toggleTodoAction,
  type Todo,
} from '@/actions/todo-actions'
import { TodoCreateForm } from './todo-create-form'
import { TodoList } from './todo-list'
import { cn, isErrorObject } from '@/utils'
import { LucideMessageCircleWarning } from 'lucide-react'

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
        sending: true, // UI에 '전송 중'임을 표시하기 위한 플래그
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

interface Props {
  initialTodos: Todo[]
}

export default function TodoController({ initialTodos }: Props) {

  const [error, setError] = useState('')

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (error.trim().length > 0) {
      timeoutId = setTimeout(() => setError(''), 1000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [error])

  const formRef = useRef<HTMLFormElement>(null)


  // [useOptimistic 작동 원리]
  // `initialTodos`를 '진짜 상태'로 취급합니다.
  // revalidatePath에 의해 서버에서 새로운 `initialTodos`가 내려오면,
  // useOptimistic은 자신이 임시로 들고 있던 낙관적 상태를 즉시 폐기하고
  // 새로 받은 진짜 데이터로 화면을 자동 교체합니다.
  const [optimisticTodos, distachOptimistic] = useOptimistic(
    initialTodos as OptimisticTodo[],
    optimisticTodosReducer,
  )

  // 할 일 추가 이벤트 핸들러
  const handleAddTodo = (formData: FormData) => {
    const title = formData.get('title')?.toString().trim()
    if (!title) return

    startTransition(async () => {
      // UI 즉각 업데이트 (sending: true 상태의 가짜 데이터)
      distachOptimistic({ type: '@todos/add', payload: { title } })
      formRef.current?.reset()

      // 서버 액션 실행
      // 성공적으로 완료되어 revalidatePath가 작동하면, 페이지 컴포넌트가
      // 새로운 `initialTodos`를 내려주면서 sending 상태의 가짜 데이터가
      // 서버에서 온 진짜 데이터로 자동 교체됩니다.
      try {
        const result = await createTodoAction(formData)
        if (!result.success) throw new Error(result.payload?.toString())
      } catch (error) {
        if (isErrorObject(error)) setError(error.message)
      }
    })
  }

  // 할 일 토글 이벤트 핸들러
  const handleToggleTodo = (id: Todo['id']) => {
    startTransition(async () => {
      distachOptimistic({ type: '@todos/toggle', payload: { id: id } })
      try {
        const result = await toggleTodoAction(id)
        if (!result.success) throw new Error(result.payload?.toString())
      } catch (error) {
        if (isErrorObject(error)) setError(error.message)
      }
    })
  }

  return (
    <div className="relative space-y-6">
      <TodoCreateForm ref={formRef} action={handleAddTodo} />
      <TodoList data={optimisticTodos} onToggle={handleToggleTodo} />
      <TemporalPrintError error={error} />
    </div>
  )
}

function TemporalPrintError({ error }: { error: string }) {
  if (error) {
    return (
      <div
        role="alert"
        className="absolute top-7.25 left-1/2 z-50 w-full -translate-1/2"
      >
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl border border-red-100',
            'bg-red-50/30 px-4.5 py-3.5 shadow-lg shadow-red-900/5 backdrop-blur-2xl',
          )}
        >
          <LucideMessageCircleWarning className="size-8 text-red-600" />
          <span className="text-sm font-medium text-red-800">{error}</span>
        </div>
      </div>
    )
  }

  return null
}
