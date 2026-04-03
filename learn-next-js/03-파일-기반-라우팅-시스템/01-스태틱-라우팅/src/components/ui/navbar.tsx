import { Command } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/utils'
import NavList from './nav-list'


export default function Navbar() {
  

  return (
    <nav
      aria-label="메인 내비게이션"
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        'border-foreground/10 bg-background/70 backdrop-blur-xl',
        'focus-within:bg-background/90'
      )}
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

        <NavList />
      </div>
    </nav>
  )
}