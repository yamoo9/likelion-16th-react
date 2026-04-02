'use client'

import { type ComponentProps, useState } from 'react'
import { MousePointerClick, Layers } from 'lucide-react'
import { cn } from '@/utils'

export default function ClientComponent({
  className,
  children,
  ...restProps
}: ComponentProps<'section'>) {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const handleCountUpAndActive = () => {
    setCount((c) => c + 1)
    setIsActive(true)
  }

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <section
      className={cn(
        'max-w-120',
        'relative overflow-hidden rounded-2xl border-2 p-8',
        'transition-all duration-300',
        isActive
          ? 'border-emerald-500 bg-emerald-50/30 shadow-lg ring-4 ring-emerald-500/10'
          : 'border-dashed border-slate-300 bg-white shadow-sm',
        className,
      )}
      {...restProps}
    >
      <div className="mb-6 flex items-center justify-between">
        <header className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-emerald-600">
            클라이언트 래퍼
          </h2>
        </header>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            isActive
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-400',
          )}
        >
          {isActive ? 'Active State' : 'Idle'}
        </span>
      </div>

      <div className="mb-8 space-y-4">
        <p className="text-sm leading-relaxed text-slate-600">
          이 컴포넌트는 <strong>&ldquo;use client&rdquo;</strong>를 사용합니다.
          <br />
          내부 상태가 변경되어도 <code>children</code>으로 전달된 서버
          컴포넌트는 다시 페칭되지 않습니다.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCountUpAndActive}
            className={cn(
              'cursor-pointer',
              'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
              'h-10 bg-slate-900 px-4 py-2 text-slate-50 shadow hover:bg-slate-900/90',
              'focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:outline-none',
            )}
          >
            <MousePointerClick className="mr-2 h-4 w-4" />
            카운트: {count}
          </button>

          <button
            type="button"
            onClick={handleToggle}
            className={cn(
              'cursor-pointer',
              'h-10 rounded-md border border-slate-200 bg-white',
              'px-4 py-2 text-sm transition-colors hover:bg-slate-100',
            )}
          >
            토글
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            'absolute -top-2.5 left-4 rounded border border-slate-100 bg-white',
            'px-2 py-0.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase',
          )}
        >
          Children 슬롯(
          <abbr
            title="React Server Component"
            aria-label="React Server Component"
          >
            RSC
          </abbr>
          )
        </div>

        <div className="mt-5">
          {/* 서버 컴포넌트를 삽입하면 에러가 발생 */}

          {/* 서버에서 렌더링된 결과가 클라이언트 환경에서 문제없이 작동할 수 있도록 구멍(slot) 생성 */}
          {/* 클라이언트 컴포넌트 내부에 서버 컴포넌트를 에러 없이 렌더링하는 방법 - 인터리빙 */}
          {children}
        </div>
      </div>
    </section>
  )
}
