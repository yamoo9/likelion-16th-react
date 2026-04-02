'use client'

import { useState } from 'react'
import { LucidePlay, LucideX } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  children?: React.ReactNode
}

export default function Modal({ children }: Props) {
  const [isShow, setIsShow] = useState(false)

  const handleOpen = () => {
    // console.log('오픈 모달 다이얼로그')
    setIsShow(true)
  }

  const handleClose = () => {
    // console.log('클로즈 모달 다이얼로그')
    setIsShow(false)
  }

  return (
    <>
      <button
        type="button"
        aria-label="열기"
        onClick={handleOpen}
        className={cn(
          'cursor-pointer rounded-lg border-2 bg-white p-2 text-sky-600',
          'outline-sky-600 focus-visible:outline-offset-4 active:scale-95',
        )}
      >
        <LucidePlay />
      </button>
      {isShow && (
        <div
          data-dim
          className={cn(
            'fixed inset-0 z-50 backdrop-blur-sm',
            'flex items-center justify-center',
            'bg-slate-950/20',
          )}
        >
          <div
            role="modal"
            aria-modal="true"
            className={cn(
              'relative',
              'max-w-1/2 max-h-100 min-w-100 min-h-80 overflow-y-auto',
              'bg-foreground text-background',
              'rounded-xl p-10 shadow-2xl',
            )}
          >
            {children}
            <button type="button" aria-label="닫기" onClick={handleClose} className={
              cn('cursor-pointer absolute top-1 right-1')
            }>
              <LucideX />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
