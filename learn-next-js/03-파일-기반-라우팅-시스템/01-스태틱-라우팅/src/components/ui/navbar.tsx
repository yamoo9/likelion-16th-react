'use client'

import { Activity } from 'react'
import { Command, BookOpen, Bookmark, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/utils'


const navItems = [
  { name: '아카이브', href: '/books', icon: BookOpen },
  { name: '카테고리', href: '/categories', icon: Bookmark },
  { name: '프로필', href: '/profile', icon: User },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        'border-foreground/10 bg-background/70 backdrop-blur-xl',
        'focus-within:bg-background/90'
      )}
      aria-label="메인 내비게이션"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link 
          href="/" 
          className="group flex items-center gap-2.5 outline-none"
          aria-label="Urban Library 홈으로 이동"
        >
          <span
            aria-hidden="true"
            className={cn(
              'flex size-9 items-center justify-center rounded-xl transition-all duration-500',
              'bg-foreground text-background group-hover:rotate-360 group-hover:rounded-full',
            )}
          >
            <Command className="size-5" />
          </span>
          <span className={cn(
            'text-xl font-black tracking-tighter uppercase',
            'text-foreground transition-colors'
          )}>
            Urban 🪧 Lib
          </span>
        </Link>

        <ul 
          role="list"
          className="flex items-center gap-1 sm:gap-2"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all outline-none',
                    'hover:bg-foreground/5 active:scale-95',
                    'focus-visible:ring-2 focus-visible:ring-primary/50',
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground/40 hover:text-foreground/70'
                  )}
                >
                  <item.icon
                    className={cn(
                      'size-4 transition-colors',
                      isActive ? 'text-primary' : 'text-inherit'
                    )}
                    aria-hidden="true"
                  />
                  <span className="hidden md:inline">{item.name}</span>
                  
                  <Activity mode={isActive ? 'visible' : 'hidden'}>
                    <span 
                      className={cn(
                        'absolute -bottom-[16.5px] size-1 rounded-full left-1/2',
                        'bg-primary animate-in fade-in zoom-in duration-300',
                        'md:left-1/2 md:translate-x-2',
                      )} 
                      aria-hidden="true"
                    />
                  </Activity>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  )
}