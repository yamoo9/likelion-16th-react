'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideTags, LucideTimer, LucideZap } from 'lucide-react'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isTimeBased = pathname.startsWith('/time-based-revalidation')
  const isTagBased = pathname.startsWith('/tag-based-revalidation')
  const isHybrid = pathname.startsWith('/hybrid-revalidation')

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
            'text-xl font-black tracking-tighter text-blue-600',
            'transition-opacity hover:opacity-80',
          )}
        >
          데이터 캐싱 및 재검증
        </Link>

        <div className="flex items-center gap-4 text-sm font-bold">
          <Link
            href="/time-based-revalidation"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isTimeBased
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideTimer
              className={cn(
                'size-4',
                isTimeBased ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            시간<span className="hidden md:block"> 기반 재검증</span>
          </Link>

          <Link
            href="/tag-based-revalidation"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isTagBased
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <LucideTags
              className={cn(
                'size-4',
                isTagBased ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            태그<span className="hidden md:block"> 기반 재검증</span>
          </Link>

          <Link
            href="/hybrid-revalidation"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isHybrid
                ? 'border-amber-100 bg-amber-50 text-amber-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-amber-50/50 hover:text-amber-600',
            )}
          >
            <LucideZap
              className={cn(
                'size-4',
                isHybrid ? 'text-amber-600' : 'text-slate-400',
              )}
            />
            하이브리드 <span className="hidden md:block">재검증</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
