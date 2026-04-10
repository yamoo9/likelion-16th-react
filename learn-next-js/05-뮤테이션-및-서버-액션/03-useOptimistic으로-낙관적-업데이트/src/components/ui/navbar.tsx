'use client'

import { LucideZap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isOptimisticActive = pathname.startsWith('/optimistic-update')

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
          낙관적인{' '}
          <abbr title="User Interface" className="cursor-help no-underline">
            UI
          </abbr>{' '}
          업데이트
        </Link>

        <div className="flex items-center gap-3 text-sm font-bold">
          <Link
            href="/optimistic-update"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isOptimisticActive
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideZap
              className={cn(
                'h-4 w-4',
                isOptimisticActive ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span>옵티미스틱 업데이트</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
