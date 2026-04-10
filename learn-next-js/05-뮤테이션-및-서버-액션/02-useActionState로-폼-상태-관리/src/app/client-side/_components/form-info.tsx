import {
  LucideCheckCircle2,
  LucideAlertCircle,
  LucideSparkles,
} from 'lucide-react'

import { type FormState } from '@/actions/create-item-action'
import { cn } from '@/utils'

export function FormInfo({ state }: { state: FormState }) {
  return (
    <header>
      <div
        role="presentation"
        className={cn(
          'mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-500',
          state.message
            ? 'bg-green-50'
            : state.error
              ? 'bg-red-50'
              : 'bg-blue-50',
        )}
      >
        {state.message ? (
          <LucideCheckCircle2 className="h-7 w-7 text-green-500" />
        ) : state.error ? (
          <LucideAlertCircle className="h-7 w-7 animate-pulse text-red-500" />
        ) : (
          <LucideSparkles className="h-7 w-7 text-blue-500" />
        )}
      </div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
        클라이언트 사이드
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-slate-500">
        클라이언트 컴포넌트에서 상태를 직접 관리합니다.
        <span className="mt-1 block font-medium text-slate-400">
          #useTransition #useState
        </span>
      </p>
    </header>
  )
}
