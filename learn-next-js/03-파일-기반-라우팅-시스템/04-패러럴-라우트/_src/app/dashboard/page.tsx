import { cn } from '@/utils'
import { ArrowRight, BookOpen, Settings, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-700">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          대시보드 홈
        </h1>
        <p className="font-medium text-slate-500">
          병렬 라우트를 통해 구성된 통합 관리 화면입니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* 학습 문서 카드 */}
        <div
          className={cn(
            'group relative flex flex-col justify-between rounded-[48px] p-12',
            'border border-slate-100 bg-white shadow-sm transition-all duration-500',
            'hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10',
          )}
        >
          <div>
            <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              학습 문서
            </h2>
            <p className="text-lg leading-relaxed text-slate-500">
              Next.js의 라우팅 원리와
              <br />
              기초 개념을 차근차근 익혀보세요.
            </p>
          </div>
          <button className="mt-12 flex items-center gap-2 text-base font-bold text-blue-600">
            가이드 읽어보기{' '}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        {/* 쇼핑 카드 */}
        <div
          className={cn(
            'group relative flex flex-col justify-between rounded-[48px] p-12',
            'border border-slate-100 bg-white shadow-sm transition-all duration-500',
            'hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10',
          )}
        >
          <div>
            <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <ShoppingBag className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">쇼핑</h2>
            <p className="text-lg leading-relaxed text-slate-500">
              복잡한 카테고리 구조를 가진
              <br />
              스토어 예제를 직접 확인해보세요.
            </p>
          </div>
          <button className="mt-12 flex items-center gap-2 text-base font-bold text-emerald-600">
            스토어 입장하기{' '}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>

      {/* 설정 페이지 바로가기 (추가된 섹션) */}
      <Link href="/dashboard/settings" className="block">
        <div
          className={cn(
            'group flex items-center justify-between rounded-[40px] p-10',
            'border border-slate-800 bg-slate-900 shadow-xl transition-all duration-500',
            'hover:-translate-y-1 hover:bg-slate-800',
          )}
        >
          <div className="flex items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold text-white">
                환경 설정으로 이동
              </h3>
              <p className="font-medium text-slate-400">
                병렬 라우트의 default.tsx 동작을 테스트해보세요.
              </p>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all group-hover:bg-white group-hover:text-slate-900">
            <ArrowRight className="h-6 w-6" />
          </div>
        </div>
      </Link>
    </div>
  )
}
