'use client'

import { LucideDatabase, LucideHourglass, LucideMousePointer2, LucideServer } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isClient = pathname.startsWith('/client')
  const isServer = pathname === '/server-side'
  const isUse = pathname.endsWith('with-use')
  const isORM = pathname.startsWith('/orm')

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
          데이터 페칭
        </Link>

        <div className="flex items-center gap-4 text-sm font-bold">
          <Link
            href="/client-side"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isClient
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <LucideMousePointer2
              className={cn(
                'h-4 w-4',
                isClient ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span>클라이언트 사이드</span>
          </Link>

          <Link
            href="/server-side"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isServer
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <LucideServer
              className={cn(
                'h-4 w-4',
                isServer ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            <span>서버 사이드</span>
          </Link>

          <Link
            href="/orm-database"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isORM
                ? 'border-rose-100 bg-rose-50 text-rose-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-rose-50/50 hover:text-rose-600',
            )}
          >
            <LucideDatabase
              className={cn(
                'h-4 w-4',
                isORM ? 'text-rose-600' : 'text-slate-400',
              )}
            />
            <span>
              <abbr
                className="cursor-help no-underline"
                title="Object.relational Mapping"
              >
                ORM
              </abbr>
            </span>
          </Link>
          
          <Link
            href="/server-side-with-use"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isUse
                ? 'border-amber-100 bg-amber-50 text-amber-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-amber-50/50 hover:text-amber-600',
            )}
          >
            <LucideHourglass
              className={cn(
                'h-4 w-4',
                isUse ? 'text-amber-600' : 'text-slate-400',
              )}
            />
            <span>
              <abbr
                className="cursor-help no-underline"
                title="Object.relational Mapping"
              >
                use API
              </abbr>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
