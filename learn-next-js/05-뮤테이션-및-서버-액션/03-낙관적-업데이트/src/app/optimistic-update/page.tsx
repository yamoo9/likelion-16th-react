import { LucideZap } from 'lucide-react'

import { cn } from '@/utils'
import { Todo } from '@/actions/todo-actions'

import TodoController from './todos/todo-controller'

/**
 * [낙관적 업데이트 (Optimistic Updates)]
 * 
 * 개념
 *   - 서버의 응답을 기다리지 않고, UI를 '성공할 것이라 가정(Optimistic)'하고 즉시 업데이트하는 기술입니다.
 *   - 사용자에게 네트워크 지연(Latency)이 없는 듯한 초고속 경험을 제공합니다.
 * 
 * useOptimistic (React 19+)
 *   - 서버 액션 호출과 동시에 임시 상태(Optimistic State)를 생성합니다.
 *   - 서버 작업이 완료되면 실제 서버 데이터(Source of Truth)로 자동 교체됩니다.
 *   - 서버 작업 실패 시, 별도의 복구 로직 없이도 이전 상태로 자동 롤백(Rollback)됩니다.
 * 
 * 구현 조건
 *   - 반드시 클라이언트 컴포넌트('use client')에서 사용해야 합니다.
 *   - 서버 컴포넌트로부터 초기 데이터를 props로 전달받아 시작하는 패턴이 권장됩니다.
 * 
 * 주요 활용 사례
 *  - 좋아요 버튼, 할 일 목록 추가/삭제, 메시지 전송 등 즉각적인 피드백이 중요한 UI
 */

export default function OptimisticUpdatePage() {
  
  // 서버의 데이터베이스에서 할 일 목록을 가져옵니다.
  const initialTodos = [] as Todo[]

  return (
    <div className="grow flex items-center justify-center p-6">
      <div className={cn(
        'w-full max-w-lg rounded-[40px] border border-blue-100 bg-white p-10',
        'shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
      )}>
        <header className="mb-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <LucideZap className="size-7 text-blue-600 fill-blue-600/10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">
            낙관적인 UI 업데이트
          </h1>
          <p className="mt-2 text-slate-500 leading-relaxed">
            서버 응답을 기다리지 않고 UI를 즉시 업데이트합니다. 
            네트워크 지연이 있어도 사용자는 즉각적인 반응을 느낄 수 있습니다.
          </p>
        </header>

        {/* 클라이언트 컴포넌트에 할 일 목록을 전달합니다. */}
        <TodoController initialTodos={initialTodos} />
      </div>
    </div>
  )
}