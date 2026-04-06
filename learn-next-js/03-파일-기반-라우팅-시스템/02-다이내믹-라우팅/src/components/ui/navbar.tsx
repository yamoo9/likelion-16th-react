'use client'

import React from 'react' // Activity 대신 표준 React 패턴 권장 (아래 주석 참고)
import { Command, BookOpen, Bookmark, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { cn } from '@/utils'

/**
 * [내비게이션 설정] navItems
 * 메뉴 이름, 경로, 아이콘을 정의합니다.
 */
const navItems = [
  { name: '아카이브', href: '/books', icon: BookOpen },
  { name: '카테고리', href: '/categories', icon: Bookmark },
  { name: '프로필', href: '/profile', icon: User },
]

/**
 * [상단 내비게이션 바] Navbar
 * 서비스 전체에서 사용되는 메인 메뉴입니다.
 */
export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        // 레이아웃: 상단 고정, 테두리, 배경색(투명도 포함)
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        'border-foreground/10 bg-background/70 backdrop-blur-xl',
        'focus-within:bg-background/90',
        'dark:border-white/5 dark:bg-zinc-950/70' // 다크 모드 보정
      )}
      aria-label="메인 내비게이션"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* [로고 섹션] 홈으로 이동하는 링크와 애니메이션 아이콘 */}
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
              'dark:bg-white dark:text-black'
            )}
          >
            <Command className="size-5" />
          </span>
          {/* 서비스 명칭 */}
          <span className={cn(
            'text-xl font-black tracking-tighter uppercase',
            'text-foreground transition-colors'
          )}>
            Urban 🪧 Lib
          </span>
        </Link>

        {/* [메뉴 리스트] navItems를 순회하며 메뉴 생성 */}
        <ul 
          role="list"
          className="flex items-center gap-1 sm:gap-2"
        >
          {navItems.map((item) => {
            // 현재 경로와 메뉴의 href가 일치하는지 확인
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
                    // 활성 상태일 때 강조 색상 적용
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground/40 hover:text-foreground/70 dark:text-zinc-500 dark:hover:text-zinc-300'
                  )}
                >
                  <item.icon
                    className={cn(
                      'size-4 transition-colors',
                      isActive ? 'text-primary' : 'text-inherit'
                    )}
                    aria-hidden="true"
                  />
                  {/* 모바일에서는 아이콘만, 태블릿 이상에서는 텍스트 표시 */}
                  <span className="hidden md:inline">{item.name}</span>
                  
                  {/* [활성화 표시 점] 현재 페이지일 때만 나타나는 하단 포인트 */}
                  {isActive && (
                    <span 
                      className={cn(
                        'absolute -bottom-[18.5px] size-1 rounded-full left-1/2 -translate-x-1/2',
                        'bg-primary animate-in fade-in zoom-in duration-300',
                        'md:translate-x-2 md:-bottom-[16.5px]',
                      )} 
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  )
}