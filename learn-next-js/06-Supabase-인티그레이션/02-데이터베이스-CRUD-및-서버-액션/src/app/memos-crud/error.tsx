'use client'

import Link from 'next/link'
import { useEffect, useTransition } from 'react'
import { AlertCircle, RotateCcw, Home, ChevronRight } from 'lucide-react'

import { cn } from '@/utils'

interface Props {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function Error({ error, unstable_retry }: Props) {

  const [ isPending, startTransition ] = useTransition()

  useEffect(() => {
    console.error('Next.js 런타임 에러', error.message)
  }, [error])

  const handleRetry = () => {
    // UI 렌더링 차단(block)않고 부드럽게 렌더링
    startTransition(() => {
      unstable_retry() // 리-페칭 -> 리-렌더 복구 시도
    })
  }

  return (
    <section className="mt-10 flex items-center justify-center p-4">
      <div className={cn(
        "w-full max-w-md overflow-hidden rounded-2xl border border-slate-200",
        "bg-white shadow-xl transition-all"
      )}>
        <div className="p-8 text-center">
          <div className={cn(
            "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full",
            "bg-red-50 text-red-500 transition-transform hover:scale-110"
          )}>
            <AlertCircle size={40} strokeWidth={1.5} />
          </div>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">
            문제가 발생했습니다
          </h1>
          
          <p className="mb-8 text-balance text-sm leading-relaxed text-slate-500">
            데이터를 처리하는 중에 오류가 발생했습니다. <br />
            아래 버튼을 눌러 다시 시도해 주세요.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className={cn(
              "mb-8 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left shadow-inner"
            )}>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Next.js 16 디버깅 정보
              </div>
              <p className="font-mono text-xs font-medium text-red-600 line-clamp-2">
                {error.message || 'Unknown Error'}
              </p>
              {error.digest && (
                <p className="mt-1 font-mono text-[10px] text-slate-400">
                  다이제스트: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-3">
            <button
              type="button"
              onClick={handleRetry}
              aria-disabled={isPending}
              className={cn(
                "group relative flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
                "bg-slate-900 text-white hover:bg-slate-800",
                "aria-disabled:cursor-not-allowed aria-disabled:opacity-70"
              )}
            >
              <RotateCcw 
                size={18} 
                className={cn(
                  "transition-transform duration-500",
                  isPending ? "animate-spin" : "group-hover:-rotate-45"
                )} 
              />
              {isPending ? '다시 시도 중...' : '다시 시도하기'}
            </button>

            <Link
              href="/"
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3.5 text-sm font-semibold transition-all active:scale-[0.98]",
                "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Home size={18} />
              메인으로 돌아가기
              <ChevronRight size={16} className="ml-1 opacity-50" />
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50/50 py-4 text-center">
          <p className="text-[11px] text-slate-400">
            ID: {error.digest || '사용 가능한 다이제스트가 없습니다.'}
          </p>
        </div>
      </div>
    </section>
  )
}
