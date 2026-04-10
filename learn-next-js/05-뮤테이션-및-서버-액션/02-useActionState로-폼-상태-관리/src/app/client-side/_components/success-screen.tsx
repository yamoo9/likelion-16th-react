'use client'

import type { FormState } from '@/actions/create-item-action'
import { cn } from '@/utils'
import Link from 'next/link'

interface Props {
  state: FormState
  onReset: () => void
}

export function SuccessScreen({ state, onReset }: Props) {

  const handleRestore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onReset()
  }

  return (
    <div
      aria-live="polite"
      className="animate-in fade-in zoom-in-95 flex flex-col gap-6 duration-500"
    >
      <div className="rounded-2xl border border-green-100 bg-green-50/50 p-4">
        <p className="text-base leading-relaxed font-medium text-green-700">
          {state.message}
        </p>
      </div>
      <Link
        href="/client-side"
        onClick={handleRestore}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all',
          'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
        )}
      >
        새로운 아이템 추가
      </Link>
    </div>
  )
}
