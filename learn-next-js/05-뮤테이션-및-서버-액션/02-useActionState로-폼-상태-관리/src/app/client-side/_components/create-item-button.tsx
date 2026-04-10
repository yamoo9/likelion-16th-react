'use client'

import { LucideArrowRight, LucideLoader2 } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'
import { cn } from '@/utils'

interface Props {
  isPending: boolean
  isNotInput: boolean
}

export function CreateItemButton({ isPending, isNotInput }: Props) {

  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setIsDisabled(isPending || isNotInput)
    })
  }, [isNotInput, isPending])

  return (
    <button
      type="submit"
      aria-disabled={isDisabled}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all',
        'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
        'disabled:text-slate-400 aria-disabled:scale-100 aria-disabled:cursor-not-allowed aria-disabled:bg-slate-200',
      )}
    >
      {isPending ? (
        <>
          <LucideLoader2 className="h-5 w-5 animate-spin" />
          <span>처리 중...</span>
        </>
      ) : (
        <>
          <span>아이템 생성하기</span>
          <LucideArrowRight className="h-5 w-5" />
        </>
      )}
    </button>
  )
}
