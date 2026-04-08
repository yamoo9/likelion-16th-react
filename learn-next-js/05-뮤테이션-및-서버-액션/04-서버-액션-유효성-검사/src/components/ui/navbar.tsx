'use client'

import { LucideShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isValidateActive = pathname.startsWith('/validate-server-action')

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
          서버 액션 유효성 검사
        </Link>

        <div className="flex items-center gap-3 text-sm font-bold">
          <Link
            href="/validate-server-action"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isValidateActive
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideShieldCheck
              className={cn(
                'h-4 w-4',
                isValidateActive ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span>서버 액션 밸리데이션</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
