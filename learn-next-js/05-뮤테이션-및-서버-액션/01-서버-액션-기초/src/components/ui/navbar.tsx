'use client'

import { LucideMousePointer2, LucideZap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isClientActive = pathname.startsWith('/client-side')
  const isServerAction = pathname.startsWith('/server-side')

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
          서버 액션 기초
        </Link>

        <div className="flex items-center gap-3 text-sm font-bold">
          {/* 클라이언트 사이드 링크 */}
          <Link
            href="/client-side"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isClientActive
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideMousePointer2
              className={cn(
                'h-4 w-4',
                isClientActive ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span>클라이언트 사이드</span>
          </Link>

          {/* 서버 사이드 링크 */}
          <Link
            href="/server-side"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isServerAction
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <LucideZap
              className={cn(
                'h-4 w-4',
                isServerAction ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            <span>서버 스트리밍</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
