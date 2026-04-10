'use client'

import { useState, useTransition } from 'react'
import {
  LucideArrowRight,
  LucideLoader2,
  LucideSparkles,
  LucideAlertCircle,
  LucideCheckCircle2,
} from 'lucide-react'

import { createItemAction } from '@/actions'
import { useInput } from '@/hooks'
import { cn } from '@/utils'


/**
 * [Next.js 폼 상태 관리: useActionState (이전 이름: useFormState)]
 * 
 * useActionState란?
 * - 서버 액션의 실행 결과(성공, 에러 메시지 등)를 클라이언트 상태로 관리하는 React 훅입니다.
 * - 폼 제출 시 서버와 클라이언트 간의 상태 동기화를 간결하게 처리합니다.
 * - 참고: https://react.dev/reference/react/useActionState 
 *        (현재 한글 번역 문서는 하이드레이션 오류 발생 가능성이 있으니 영문 문서 권장)
 * 
 * 왜 사용하는가?
 * - 기존의 useState + useEffect 조합 없이도 서버의 응답을 UI에 즉각 반영할 수 있기 때문입니다.
 * 
 * 주요 특징 및 장점
 * - 자동 상태 업데이트: 액션이 반환하는 값을 자동으로 상태(state)에 반영합니다.
 * - Pending 상태 제공: 현재 액션이 실행 중인지 여부(isPending)를 불리언 값으로 제공합니다.
 * - 점진적 향상 지원: JS가 로드되기 전에도 기본 폼 제출이 작동하며, 로드 후에는 풍부한 UI 경험을 제공합니다.
 * 
 * 사용 방법
 * - [상태, 액션함수, 대기상태] = useActionState(서버액션, 초기상태)
 * - 폼의 <form action={액션함수}>에 연결하여 사용합니다.
 */


export default function ClientSidePage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const itemInput = useInput('')
  const isNotInput = itemInput.props.value.trim().length === 0

  const handleSubmit = async (formData: FormData) => {
    if (isPending || isNotInput) return

    setError(null)
    setMessage('')

    startTransition(async () => {
      const result = await createItemAction(formData)

      if (result.success) {
        setMessage(result.message ?? '')
        // 성공 시 입력창 초기화
        itemInput.methods.reset()
      } else {
        // 서버에서 보낸 error 메시지 사용
        setError(result.error ?? '알 수 없는 에러가 발생했습니다.')
      }
    })
  }

  const handleReset = () => {
    setError(null)
    setMessage('')
    const { reset, focus } = itemInput.methods
    reset()
    setTimeout(focus, 50)
  }

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
              action={handleSubmit}
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
                onClick={handleReset}
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
