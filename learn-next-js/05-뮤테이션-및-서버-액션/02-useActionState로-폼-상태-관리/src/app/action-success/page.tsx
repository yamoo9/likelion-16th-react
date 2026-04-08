import Link from 'next/link'
import { LucideCheckCircle2, LucideHome, LucideArrowLeft } from 'lucide-react'

import { cn } from '@/utils'

export default function CreateActionResultPage() {
  return (
    <div className="flex grow items-center justify-center p-6">
      <div
        className={cn(
          'relative flex flex-col items-center justify-center overflow-hidden',
          'mx-auto min-h-100 w-full max-w-md p-10 text-center',
          'rounded-[40px] border border-emerald-100 bg-white',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-xl',
        )}
      >
        <div
          role="presentation"
          className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-50 opacity-60"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div
            className={cn(
              'mb-8 flex h-20 w-20 items-center justify-center rounded-3xl',
              'bg-emerald-500 shadow-lg shadow-emerald-200',
            )}
          >
            <LucideCheckCircle2 className="h-10 w-10 text-white" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900">처리 완료!</h1>

          <p className="mb-10 leading-relaxed text-slate-500">
            서버 액션이 성공적으로 실행되었습니다.
            <br />
            데이터가 안전하게 서버에 저장되고
            <br />
            캐시가 갱신되었습니다.
          </p>

          <div className="flex w-full flex-col gap-3">
            <Link
              href="/"
              className={cn(
                'flex items-center justify-center gap-2 rounded-2xl bg-slate-900 p-4',
                'font-bold text-white transition-all hover:bg-slate-800 active:scale-95',
              )}
            >
              <LucideHome className="h-4 w-4" />
              메인으로 돌아가기
            </Link>

            <Link
              href="/server-side"
              className={cn(
                'group flex items-center justify-center gap-2 p-2',
                'font-bold text-slate-400 transition-colors hover:text-slate-600',
              )}
            >
              <LucideArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              다시 작성하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
