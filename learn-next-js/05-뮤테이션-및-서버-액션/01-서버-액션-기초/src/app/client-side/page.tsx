'use client'

import { useState } from 'react'
import { LucideArrowRight, LucideSparkles } from 'lucide-react'

import { cn } from '@/utils'

/**
 * [서버 액션 처리 방법 비교]
 * 
 * 1. useTransition 훅 사용
 *    - 로딩 상태(isPending) 제공
 *    - JS 없는 환경 사용 불가 ❌
 *    - 단순 상태 변경 및 UI 전환에 적합
 * 
 * 2. useActionState 훅 사용 (React 19+)
 *    - 로딩 상태(isPending) 제공
 *    - 서버 응답값(state) 자동 관리
 *    - JS 없는 환경에서도 Form 전송 가능 (Progressive Enhancement) ✅
 *    - 데이터 생성/수정 등 Form 처리에 최적화
 */

export default function ClientSidePage() {
  const [message] = useState('')


  return (
    <div className="flex grow items-center justify-center">
      <div
        className={cn(
          'relative flex flex-col justify-between overflow-hidden',
          'mx-auto min-h-87.5 w-full max-w-md p-10',
          'rounded-[40px] border border-blue-100 bg-white',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-xl',
        )}
      >
        <div className="relative z-10">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <LucideSparkles className="h-7 w-7 text-blue-500" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            클라이언트 사이드
          </h1>
          <p className="mb-2 leading-relaxed text-slate-500">
            클라이언트 컴포넌트에서 상태를 관리하며 호출합니다. 즉각적인
            피드백과 로딩 처리가 가능합니다.
          </p>

          {!message ? (
            <form className="relative z-10 space-y-3" noValidate>
              <input
                type="text"
                required
                name="title"
                placeholder="아이템 이름 입력..."
                className={cn(
                  'mt-2 w-full rounded-full border border-slate-200 bg-slate-50/50 p-4 transition-all outline-none',
                  'focus:ring-2 focus:ring-blue-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                )}
              />
              <button
                type="submit"
                className={cn(
                  'cursor-pointer',
                  'group mt-2 flex -translate-x-2 items-center gap-2 px-2 py-1 font-bold text-blue-600',
                  'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                )}
              >
                클라이언트 측 데이터 페칭{' '}
                <LucideArrowRight
                  className={cn(
                    'size-4 transition-transform',
                    'duration-400 group-hover:translate-x-1',
                    'group-aria-disabled:group-hover:translate-x-0',
                  )}
                />
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-2">
              <p className={cn('my-5.5 text-lg font-medium text-blue-600')}>
                {message}
              </p>
              <button
                type="button"
                className="cursor-pointer self-start rounded-sm bg-blue-600 px-2 py-1 text-white"
              >
                다시 아이템 생성하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
