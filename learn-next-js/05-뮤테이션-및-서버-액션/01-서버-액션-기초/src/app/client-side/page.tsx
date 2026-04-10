'use client'

import {
  LucideArrowRight,
  LucideLoader2,
  LucideSparkles,
  LucideAlertCircle,
  LucideCheckCircle2,
} from 'lucide-react'
import { useState, useTransition } from 'react'

import {
  createItemAction,
  // progressiveEnhancementAction
} from '@/server-actions/create-item-action' // 서버 함수

import { useInput } from '@/hooks'
import { cn } from '@/utils'

export default function ClientSidePage() {
  // 폼 상태를 클라이언트 측 메모리에 관리해보세요.
  const [isPending, startTransition] = useTransition() // 서버 액션 요청 (로딩 상태 관리, 렌더링)
  const [message, setMessage] = useState('') // 서버에서 성공 응답이 왔을 때 상태 업데이트 -> UI 반영 (성공 메시지)
  const [error, setError] = useState<undefined | string>(undefined) // 서버에서 실패 응답이 왔을 때 상태 업데이트 -> UI 반영 (에러 메시지)

  const itemInput = useInput('')
  const isNotInput = itemInput.props.value.trim().length === 0

  // 서버 액션을 클라이언트 핸들러 내부에서 실행하는 코드를 작성하고
  // 응답 성공 또는 실패 상황에 따라 UI 화면을 제공하도록 설정합니다.
  const handleClientAction = (formData: FormData) => {
    if (isPending || isNotInput) return // 방어적 프로그래밍

    // 서버 함수는 startTransition 함수 안에서 실행하세요!
    startTransition(async () => {
      // 서버 함수에 formData 전달해 실행 후, 반환된 결과 받기
      const result = await createItemAction(formData)

      if (result.success) {
        // 서버의 응답 결과가 성공했을 때
        setMessage(result.message ?? '요청이 성공적으로 수행되었습니다.')
      } else {
        // 서버의 응답 결과가 실패했을 때
        setError(result.error ?? '알 수 없는 에러가 발생했습니다.')
      }
    })
  }

  // 입력 폼 초기화 함수
  const handleReset = () => {
    // 방법 1. 브라우저 API를 사용해 페이지를 새로고침(하드 내비게이션)
    // window.location.reload()

    // 방법 2. 리액트의 방식으로 컴포넌트 초기화
    setError(undefined)
    setMessage('')
    itemInput.methods.reset()
    setTimeout(() => itemInput.methods.focus(), 50) // 0.05초 뒤에 초점 이동
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

          <p className="text-md mb-6 leading-relaxed text-slate-500">
            클라이언트 컴포넌트에서 상태를 직접 관리합니다.
            <span className="mt-1 block font-medium text-slate-400">
              #useTransition #useState
            </span>
          </p>

          {!message ? (
            <form
              // 실제 서버에서 실행되는 액션(함수)
              // form 요소의 action에 연결된 서버 액션 함수는 반환 값이 없어야 한다.
              // 점진적 향상 (Progressive EnhancementAction) 테스트
              // action={progressiveEnhancementAction}

              // 클라이언트 핸들러 (내부에서 서버 액션 실행)
              action={handleClientAction}
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
                aria-disabled={isPending || isNotInput}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all',
                  'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
                  'disabled:text-slate-400 aria-disabled:scale-100 aria-disabled:cursor-not-allowed aria-disabled:bg-slate-200',
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
