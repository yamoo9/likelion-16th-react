'use client'

import {
  LucideSettings2,
  LucideDatabase,
  LucideUserCircle2,
  LucideShieldCheck,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 각 경로 활성화 여부 확인
  const isSetup = pathname.startsWith('/setup-check')
  const isCrud = pathname.startsWith('/memos-crud')
  const isAuth = pathname.startsWith('/auth-basic')
  const isRls = pathname.startsWith('/rls-secure')

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full px-4 py-3',
        'border-b border-slate-100 bg-white/80 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className={cn(
            'text-lg font-black tracking-tighter text-blue-600 md:text-xl',
            'transition-opacity hover:opacity-80',
          )}
        >
          Supabase 인증 &{' '}
          <abbr title="Row Level Security" className="cursor-help no-underline">
            RLS
          </abbr>
        </Link>

        <div className="flex items-center gap-1 text-xs font-bold md:gap-2 md:text-sm">
          <Link
            href="/setup-check"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200',
              isSetup
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-blue-600',
            )}
          >
            <LucideSettings2
              className={cn(
                'h-4 w-4',
                isSetup ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span className="hidden lg:inline">환경 설정</span>
            <span className="lg:hidden">설정</span>
          </Link>

          <Link
            href="/memos-crud"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200',
              isCrud
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-emerald-600',
            )}
          >
            <LucideDatabase
              className={cn(
                'h-4 w-4',
                isCrud ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            <span className="hidden lg:inline">개인 CRUD</span>
            <span className="lg:hidden">CRUD</span>
          </Link>

          <Link
            href="/auth-basic"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200',
              isAuth
                ? 'border-amber-100 bg-amber-50 text-amber-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-amber-600',
            )}
          >
            <LucideUserCircle2
              className={cn(
                'h-4 w-4',
                isAuth ? 'text-amber-600' : 'text-slate-400',
              )}
            />
            <span className="hidden lg:inline">인증 기초</span>
            <span className="lg:hidden">인증</span>
          </Link>

          <Link
            href="/rls-secure"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200',
              isRls
                ? 'border-rose-100 bg-rose-50 text-rose-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-rose-600',
            )}
          >
            <LucideShieldCheck
              className={cn(
                'h-4 w-4',
                isRls ? 'text-rose-600' : 'text-slate-400',
              )}
            />
            <span className="hidden lg:inline">보안 정책(RLS)</span>
            <span className="lg:hidden">보안</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
