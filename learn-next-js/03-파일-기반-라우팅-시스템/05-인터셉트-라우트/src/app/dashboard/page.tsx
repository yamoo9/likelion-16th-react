import Link from 'next/link'
import {
  Settings,
  ArrowRight,
  LucideBookOpen,
  LucideShoppingBag,
} from 'lucide-react'

import { cn } from '@/utils'
import LinkCard from '@/components/ui/link-card'

export default function DashboardPage() {
  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-700',
        '',
      )}
    >
      <header className={cn('flex flex-col gap-2', '')}>
        <h1
          className={cn('text-3xl font-bold tracking-tight', 'text-slate-900')}
        >
          대시보드 홈
        </h1>
        <p className={cn('font-medium', 'text-slate-500')}>
          병렬 라우트를 통해 구성된 통합 관리 화면입니다.
        </p>
      </header>

      <div className={cn('grid grid-cols-1 gap-8 md:grid-cols-2')}>
        {/* 학습 문서 카드 */}
        <LinkCard
          href="/docs/%EA%B8%B0%EC%B4%88"
          icon={LucideBookOpen}
          actionLabel="가이드 읽어보기"
          title="학습 문서"
          description={
            <>
              Next.js의 라우팅 원리와
              <br />
              기초 개념을 차근차근 익혀보세요.
            </>
          }
        />

        {/* 쇼핑 카드 */}
        <LinkCard
          href="/shop"
          color="emerald"
          icon={LucideShoppingBag}
          actionLabel="스토어 입장하기"
          title="쇼핑"
          description={
            <>
              복잡한 카테고리 구조를 가진
              <br />
              스토어 예제를 직접 확인해보세요.
            </>
          }
        />
      </div>

      {/* 설정 페이지 바로가기 (추가된 섹션) */}
      <Link href="/dashboard/settings" className="block">
        <div
          className={cn(
            'group flex items-center justify-between rounded-[40px] p-10',
            'border border-slate-800 bg-slate-900',
            'text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-slate-800',
          )}
        >
          <div className={cn('flex items-center gap-6', '')}>
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-2xl',
                'bg-white/10',
              )}
            >
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className={cn('mb-1 text-xl font-bold', 'text-white')}>
                환경 설정으로 이동
              </h3>
              <p className={cn('font-medium', 'text-slate-400')}>
                병렬 라우트의 default.tsx 동작을 테스트해보세요.
              </p>
            </div>
          </div>
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full transition-all',
              'bg-white/5 text-white group-hover:bg-white group-hover:text-slate-900',
            )}
          >
            <ArrowRight className="h-6 w-6" />
          </div>
        </div>
      </Link>
    </div>
  )
}
