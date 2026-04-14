'use client'

import {
  LucideUserCircle2,
  LucideShieldCheck,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/utils'

const NAV_ITEMS = [
  {
    href: '/auth-basic',
    label: '인증 기초',
    shortLabel: '인증',
    icon: LucideUserCircle2,
    activeColor: 'border-amber-100 bg-amber-50 text-amber-600',
    iconColor: 'text-amber-600',
  },
  {
    href: '/upload-profile-image',
    label: '스토리지',
    shortLabel: '스토리지',
    icon: LucideShieldCheck,
    activeColor: 'border-rose-100 bg-rose-50 text-rose-600',
    iconColor: 'text-rose-600',
  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 p-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-lg font-black tracking-tighter text-blue-600 transition-opacity hover:opacity-80 md:text-xl"
        >
          Supabase 스토리지
        </Link>

        <div className="flex items-center gap-1 text-xs font-bold md:gap-2 md:text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200',
                  isActive
                    ? `${item.activeColor} shadow-sm`
                    : 'border-transparent text-slate-500 hover:bg-slate-50',
                )}
              >
                <Icon
                  className={cn(
                    'size-4',
                    isActive ? item.iconColor : 'text-slate-400',
                  )}
                />
                <span className="hidden lg:inline">{item.label}</span>
                <span className="lg:hidden">{item.shortLabel}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
