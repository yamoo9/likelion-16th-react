'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideShieldCheck, LucideZap } from 'lucide-react'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (변경된 라우트 경로 기준)
  const isUseCacheActive = pathname.startsWith('/cache-directive')
  const isCacheControlActive = pathname.startsWith('/cache-control')

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full px-6 py-4',
        'border-b border-slate-100 bg-white/80 backdrop-blur-md',
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
          새로운 캐시 전략
        </Link>

        <div className="flex items-center gap-3 text-sm font-bold">
          {/* 'use cache' 지시어 링크 */}
          <Link
            href="/cache-directive"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isUseCacheActive
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideZap
              className={cn(
                'h-4 w-4',
                isUseCacheActive ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span>'use cache' 디렉티브</span>
          </Link>

          {/* 캐시 수명 및 태그 링크 */}
          <Link
            href="/cache-control"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isCacheControlActive
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <LucideShieldCheck
              className={cn(
                'h-4 w-4',
                isCacheControlActive ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            <span>캐시 제어</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}