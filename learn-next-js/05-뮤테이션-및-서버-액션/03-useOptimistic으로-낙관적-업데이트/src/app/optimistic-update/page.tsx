import { LucideZap, LucideInfo } from 'lucide-react'

import { cn } from '@/utils'
import { getTodos } from '@/actions/todo-actions'
import TodoController from './todos/todo-controller'
import TodoControllerOptimistic from './todos/todo-controller-optimistic'

export default async function OptimisticUpdatePage() {
  const initialTodos = await getTodos()

  return (
    <div className={cn("min-h-screen", "p-6 lg:p-12")}>
      <div className="mx-auto max-w-6xl">
        
        <header className="mb-12">
          <div className={cn(
            "mb-6 flex size-16 items-center justify-center",
            "rounded-2xl bg-blue-600",
            "shadow-lg shadow-blue-200"
          )}>
            <LucideZap className="size-8 fill-white/20 text-white" />
          </div>
          <h1 className={cn(
            "text-4xl font-extrabold tracking-tight text-slate-900"
          )}>
            낙관적인 UI 업데이트
          </h1>
          <p className={cn(
            "mt-4 text-lg leading-relaxed text-slate-600 max-w-2xl"
          )}>
            사용자의 액션에 즉각 반응하여 체감 속도를 극대화합니다. 
            서버 응답을 기다리는 지루함을 없애고 부드러운 사용자 경험을 제공해 보세요.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* 일반 업데이트 */}
          <section className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 px-2 text-slate-500">
              <LucideInfo className="size-4" />
              <span className="text-sm font-medium uppercase tracking-wider">
                일반적 업데이트
              </span>
            </div>
            <div className={cn(
              "h-full p-8 bg-white",
              "rounded-3xl border border-slate-200",
              "shadow-sm transition-all hover:shadow-md"
            )}>
              <h3 className="mb-6 text-xl font-bold text-slate-800">
                일반 방식 업데이트
              </h3>
              <div className="rounded-xl bg-slate-50 p-4">
                <TodoController initialTodos={initialTodos} />
              </div>
            </div>
          </section>

          {/* 낙관적 업데이트 */}
          <section className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 px-2 text-blue-600">
              <LucideZap className="size-4 fill-blue-600" />
              <span className="text-sm font-bold uppercase tracking-wider">
                낙관적 업데이트
              </span>
            </div>
            <div className={cn(
              "h-full p-8 bg-white",
              "rounded-3xl border-2 border-blue-100",
              "shadow-xl shadow-blue-900/5",
              "transition-all hover:border-blue-200"
            )}>
              <h3 className={cn(
                "mb-6 text-xl font-bold text-slate-800",
                "underline decoration-blue-200 decoration-4 underline-offset-8"
              )}>
                낙관적인 방식 업데이트
              </h3>
              <div className="rounded-xl bg-blue-50/30 p-4">
                <TodoControllerOptimistic initialTodos={initialTodos} />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}