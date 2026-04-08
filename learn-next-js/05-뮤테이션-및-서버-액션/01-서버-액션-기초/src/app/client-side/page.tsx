'use client'

import {
  LucideArrowRight,
  LucideLoader2,
  LucideSparkles,
  LucideAlertCircle,
  LucideCheckCircle2,
} from 'lucide-react'

import { useInput } from '@/hooks'
import { cn } from '@/utils'

export default function ClientSidePage() {
  
  // 폼 상태를 클라이언트 측 메모리에 관리해보세요.
  const message = ''
  const isPending = false
  const error = null

  const itemInput = useInput('')
  const isNotInput = itemInput.props.value.trim().length === 0

  // 서버 액션을 클라이언트 핸들러 내부에서 실행하는 코드를 작성하고
  // 응답 성공 또는 실패 상황에 따라 UI 화면을 제공하도록 설정합니다.

  return (
    <div className="flex grow items-center justify-center p-4">
      <div
        className={cn(
          'relative flex flex-col justify-between overflow-hidden',
          'mx-auto min-h-87.5 w-full max-w-md p-10',
          'rounded-[40px] border border-slate-100 bg-white',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-xl',
        )}
      >
        <div className="relative z-10">
          <div
            role="presentation"
            className={cn(
              'mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-500',
              message ? 'bg-green-50' : error ? 'bg-red-50' : 'bg-blue-50',
            )}
          >
            {message ? (
              <LucideCheckCircle2 className="h-7 w-7 text-green-500" />
            ) : error ? (
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

          {!message ? (
            <form
              // 서버 액션을 연결해보세요.
              // ...
              className="relative z-10 space-y-4"
              noValidate
            >
              <div className="space-y-2">
                <input
                  name="title"
                  required
                  aria-disabled={isPending}
                  aria-invalid={!!error}
                  {...itemInput.props}
                  placeholder="아이템 이름 입력..."
                  className={cn(
                    'w-full rounded-2xl border bg-slate-50/50 p-4 transition-all outline-none',
                    'placeholder:text-slate-400',
                    error
                      ? 'border-red-200 bg-red-50/30 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
                    'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                  )}
                />

                {/* 에러 메시지 UI */}
                {error && (
                  <div className="animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5 px-1 text-red-500">
                    <LucideAlertCircle className="h-4 w-4" />
                    <p role="alert" className="text-[13px] font-medium">
                      {error}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending || isNotInput}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all',
                  'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
                  'disabled:scale-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400',
                )}
              >
                {isPending ? (
                  <>
                    <LucideLoader2 className="h-5 w-5 animate-spin" />
                    <span>처리 중...</span>
                  </>
                ) : (
                  <>
                    <span>아이템 생성하기</span>
                    <LucideArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* 성공 메시지 UI */
            <div
              aria-live="polite"
              className="animate-in fade-in zoom-in-95 flex flex-col gap-6 duration-500"
            >
              <div className="rounded-2xl border border-green-100 bg-green-50/50 p-4">
                <p className="text-base leading-relaxed font-medium text-green-700">
                  {message}
                </p>
              </div>
              <button
                type="button"
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all',
                  'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
                )}
                // 폼 초기화 로직을 실행하는 핸들러를 연결해보세요.
                // ...
              >
                새로운 아이템 추가
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
