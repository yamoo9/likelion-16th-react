import { LucideCheckCircle2, LucideCircle, LucideLoader2 } from 'lucide-react'

import { type Todo } from '@/actions/todo-actions'
import { type OptimisticTodo } from './todo-controller-optimistic'
import { cn } from '@/utils'

interface Props {
  data: OptimisticTodo[]
  onToggle: (id: Todo['id']) => void
}

export function TodoList({
  data,
  onToggle,
}: Props) {
  return (
    <ul className="space-y-3">
      {data.map((todo) => (
        <li
          key={todo.id}
          className={cn(
            'flex items-center justify-between rounded-2xl border border-slate-100 p-4 shadow-sm transition-all',
            // 조건부 스타일 처리
            // - 서버 통신 중일 때의 스타일
            // - 완료된 상태의 스타일
            todo.sending ? 'opacity-95' : 'opacity-100'
          )}
        >
          <div className="flex items-center gap-3">
            {/* 할 일 토글 버튼 */}
            <button
              type="button"
              onClick={() => {
                if (todo.sending) return
                onToggle(todo.id)
              }}
              className="group relative flex items-center gap-3 outline-none"
            >
              <div className="relative flex items-center justify-center">
                {todo.done ? (
                  <LucideCheckCircle2
                    className={cn(
                      'size-5 text-green-500 transition-transform',
                      'group-active:scale-90',
                    )}
                  />
                ) : (
                  <LucideCircle
                    className={cn(
                      'size-5 text-slate-300 transition-transform',
                      'group-active:scale-90',
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  'font-medium transition-all select-none',
                  todo.done ? 'text-slate-400 line-through' : 'text-slate-700',
                )}
              >
                {todo.title}
              </span>
            </button>
          </div>

          {/* 서버와 동기화 중일 때만 보여주는 인디케이터 */}
          <div
            hidden={!todo.sending}
            className={cn(
              'flex items-center gap-2 text-[10px] font-bold tracking-tighter uppercase',
              'animate-pulse text-blue-500',
            )}
          >
            <LucideLoader2 className="size-3 animate-spin" />
            서버 처리 중...
          </div>
        </li>
      ))}
    </ul>
  )
}
