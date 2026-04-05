'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, ShoppingBag } from 'lucide-react'
import { cn } from '@/utils'

export function Navbar() {
  const pathname = usePathname()

  // 활성화 여부 확인 (하위 경로 포함)
  const isDocsActive = pathname.startsWith('/docs')
  const isShopActive = pathname.startsWith('/shop')

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-blue-600 transition-opacity hover:opacity-80"
        >
          포괄적 세그먼트
        </Link>

        <div className="flex items-center gap-4 text-sm font-bold">
          {/* Docs 링크 */}
          <Link
            href="/docs/기초"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isDocsActive
                ? 'border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-blue-50/50 hover:text-blue-600',
            )}
          >
            <Book
              className={cn(
                'h-4 w-4',
                isDocsActive ? 'text-blue-600' : 'text-slate-400',
              )}
            />
            <span>docs/기초</span>
          </Link>

          {/* Shop 링크 */}
          <Link
            href="/shop"
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all duration-200',
              isShopActive
                ? 'border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm'
                : 'border-transparent text-slate-500 hover:bg-emerald-50/50 hover:text-emerald-600',
            )}
          >
            <ShoppingBag
              className={cn(
                'h-4 w-4',
                isShopActive ? 'text-emerald-600' : 'text-slate-400',
              )}
            />
            <span>shop</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
