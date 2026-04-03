'use client'

import { Activity } from 'react'
import { Bookmark, BookOpen, User } from 'lucide-react'

import NavLink from './nav-link'
import { cn } from '@/utils'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: '아카이브', href: '/books', icon: BookOpen },
  { name: '카테고리', href: '/categories', icon: Bookmark },
  { name: '프로필', href: '/profile', icon: User },
]

export default function NavList() {
  const pathname = usePathname()

  return (
    <ul role="list" className="flex items-center gap-1 sm:gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <li key={item.href}>
            <NavLink
              href={item.href}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all outline-none',
                  'hover:bg-foreground/5 active:scale-95',
                  'focus-visible:ring-primary/50 focus-visible:ring-2',
                  isActive
                    ? 'text-primary'
                    : 'text-foreground/40 hover:text-foreground/70',
                )
              }
            >
              <item.icon
                aria-hidden="true"
                className={cn(
                  'size-4 transition-colors',
                  isActive ? 'text-primary' : 'text-inherit',
                )}
              />
              <span className="hidden md:inline">{item.name}</span>
              <Activity mode={isActive ? 'visible' : 'hidden'}>
                <span
                  role="presentation"
                  className={cn(
                    'absolute -bottom-[16.5px] left-1/2 size-1 rounded-full',
                    'bg-primary animate-in fade-in zoom-in duration-300',
                    'md:left-1/2 md:translate-x-2',
                  )}
                />
              </Activity>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
