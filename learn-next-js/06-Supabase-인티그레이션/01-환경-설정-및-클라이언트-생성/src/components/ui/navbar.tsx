'use client'

import { LucideSettings2, LucideDatabase } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/utils'


export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isSetupCheck = pathname.startsWith('/setup-check')
  const isReadTableData = pathname.startsWith('/read-table-data')

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
          Supabase 학습 가이드
        </Link>

        <div className="flex items-center gap-2 text-sm font-bold md:gap-3">

          <Link
            href="/setup-check"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isSetupCheck
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideSettings2
              className={cn(
                'h-4 w-4',
                isSetupCheck ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            환경 설정 <span className='hidden md:inline'>및 연결 확인</span>
          </Link>

          <Link
            href="/read-table-data"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isReadTableData
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <LucideDatabase
              className={cn(
                'h-4 w-4',
                isReadTableData ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            테이블 데이터 조회
          </Link>
        </div>
      </div>
    </nav>
  )
}