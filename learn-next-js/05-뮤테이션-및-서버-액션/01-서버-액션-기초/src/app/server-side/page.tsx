import { LucideSend, LucideArrowRight } from 'lucide-react'
import { redirect } from 'next/navigation'

import { createItemAction } from '@/server-actions/create-item-action'
import { cn } from '@/utils'

// 서버 컴포넌트
export default async function ServerSidePage({ searchParams }: PageProps<'/server-side'>) {
  
  // 에러 제어를 위한 변수
  const { error } = await searchParams // ?error=error-message

  // 인라인 서버 함수 작성
  // <form> 요소의 action 속성에 연결된 함수 (반환값이 없어야 함)
  const handleInlineServerAction = async (formData: FormData) => {
    'use server'

    // 클라이언트 측과 공유하는 서버 함수를 실행 (결과 값이 필요해서)
    const result = await createItemAction(formData)

    if (!result.success) {
      // 에러 상황
      redirect(`?error=${encodeURIComponent(result.error ?? '알 수 없는 오류')}`, 'replace')
    } else {
      // 성공 상황
      // 아이템 성공 페이지로 리디렉션
      redirect('/action-success', 'push')
    }
  }

  return (
    <div className="flex grow items-center justify-center">
      <div
        className={cn(
          'relative flex flex-col justify-between overflow-hidden',
          'mx-auto w-full max-w-md p-10',
          'min-h-87.5',
          'rounded-[40px] border border-emerald-100 bg-white',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
          'transition-all hover:shadow-xl',
        )}
      >
        <div
          role="presentation"
          className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-50 opacity-60"
        />

        <div className="relative z-10">
          <div
            className={cn(
              'mb-8 flex h-16 w-16 items-center justify-center rounded-2xl',
              'bg-emerald-600 shadow-lg shadow-emerald-200',
            )}
          >
            <LucideSend className="h-7 w-7 -rotate-12 text-white" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            서버 사이드
          </h1>
          <p className="mb-8 leading-relaxed text-slate-500">
            서버 컴포넌트에서 직접 액션을 호출합니다.
            <span className="block">
              브라우저의 JS 없이도 작동하는 방식입니다.
            </span>
          </p>

          {/* 에러 메시지 표시 영역 */}
          {error && (
            <div
              role="alert"
              className="animate-in fade-in slide-in-from-top-2 mb-3 rounded-2xl border border-red-100 bg-red-50 p-4"
            >
              <p className="text-xs leading-snug font-medium text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>

        <form
          // 서버 액션을 연결하세요.
          // 반환 값이 있는 이유는 클라이언트 측의 UX 향상
          // 문제 해결 방법 1. 비슷한 기능을 가진 다른 함수 작성
          // 문제 해결 방법 2. 인라인 서버 함수 사용하는 것
          action={handleInlineServerAction}
          className="relative z-10 space-y-4"
        >
          <input
            name="title"
            required
            placeholder="아이템 이름 입력..."
            aria-invalid={!!error}
            className={cn(
              'w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4',
              'transition-all outline-none focus:ring-2 focus:ring-emerald-500',
              error
                ? 'border-red-200 bg-red-50/50 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-200 focus:ring-2 focus:ring-emerald-500',
            )}
          />
          <button
            type="submit"
            className={cn(
              '-translate-x-2 px-2 py-1',
              'group mt-2 flex cursor-pointer items-center gap-2 font-bold text-emerald-600',
            )}
          >
            <span>{error ? '다시 시도하기' : '서버 측 데이터 전송'}</span>{' '}
            <LucideArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  )
}
