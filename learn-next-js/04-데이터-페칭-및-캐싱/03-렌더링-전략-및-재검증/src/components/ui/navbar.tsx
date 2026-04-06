'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideGlobe, LucideZap, LucideRefreshCw } from 'lucide-react'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (각 전략별 경로 설정)
  const isStatic = pathname.startsWith('/static-rendering')
  const isDynamic = pathname.startsWith('/dynamic-rendering')
  const isISR = pathname.startsWith('/time-based-revalidation')

  return (
    <nav
      className={cn(
        'sticky top-0 z-50',
        'w-full border-b border-slate-100 px-6 py-4',
        'bg-white/80 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className={cn(
            'text-xl font-black tracking-tighter text-slate-800',
            'transition-opacity hover:opacity-80',
          )}
        >
          렌더링 전략 및 재검증
        </Link>

        <div className="flex items-center gap-2 text-sm font-bold md:gap-4">
          {/* 정적 렌더링 (Static) */}
          <Link
            href="/static-rendering"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isStatic
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideGlobe
              className={cn(
                'size-4',
                isStatic ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            정적 <span className="hidden sm:block">렌더링</span>
          </Link>

          {/* 동적 렌더링 (Dynamic) */}
          <Link
            href="/dynamic-rendering"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isDynamic
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <LucideZap
              className={cn(
                'size-4',
                isDynamic ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            동적 <span className="hidden sm:block">렌더링</span>
          </Link>

          {/* 시간 기반 재검증 (ISR) */}
          <Link
            href="/time-based-revalidation"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isISR
                ? 'border-amber-100 bg-amber-50 text-amber-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-amber-50/50 hover:text-amber-600',
            )}
          >
            <LucideRefreshCw
              className={cn(
                'size-4',
                isISR ? 'text-amber-600' : 'text-slate-400',
              )}
            />
            <span className="hidden sm:block">시간 기반</span> 재검증
          </Link>
        </div>
      </div>
    </nav>
  )
}
