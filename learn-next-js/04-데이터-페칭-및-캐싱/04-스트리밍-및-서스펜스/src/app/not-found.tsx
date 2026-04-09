import Link from 'next/link'
import { LucideFileQuestion, LucideArrowRight } from 'lucide-react'
import { cn } from '@/utils'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-slate-50/30 p-6">
      <div className="w-full max-w-120 space-y-8">
        {/* 상단 타이틀 영역 */}
        <div className="space-y-2 text-center">
          <h1 className="text-8xl font-black tracking-tighter text-slate-200/80 animate-pulse">
            404
          </h1>
          <p className="text-lg font-medium text-slate-500">
            이런... 페이지를 찾을 수 없네요.
          </p>
        </div>

        {/* 메인 카드 */}
        <div
          className={cn(
            'relative overflow-hidden rounded-[40px] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/50',
            'transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60',
          )}
        >
          <div
            role="presentation"
            className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-50/50"
          />

          <div className="relative z-10 space-y-6">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
              <LucideFileQuestion className="h-8 w-8 text-white" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-base leading-relaxed text-slate-500">
                요청하신 페이지가 존재하지 않거나 다른 주소로 이동되었을 수
                있습니다. 입력하신 주소가 올바른지 다시 한번 확인해 주세요.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className={cn(
                  'group inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all',
                  'hover:gap-3',
                )}
              >
                메인 페이지로 돌아가기
                <LucideArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400">
          도움이 필요하신가요?{' '}
          <span className="cursor-pointer underline">고객센터 문의하기</span>
        </p>
      </div>
    </section>
  )
}
