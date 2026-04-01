'use client'

import { useState } from 'react'

import { cn } from '@/utils'

interface Props {
  initialLikes: number
}

export default function LikeButton({ initialLikes }: Props) {
  
  const [count, setCount] = useState(initialLikes)
  const [isPending, setIsPending] = useState(false)

  const handleLike = async () => {
    setIsPending(true)
    
    try {
      const nextCount = count + 1

      // 서버 함수 호출 (서버의 JSON 파일을 업데이트)
      const result = { success: true }
      
      // 서버 함수 결과에 따라 상태 업데이트
      if (result.success) setCount(nextCount)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      type="button"
      aria-disabled={isPending}
      className={cn(
        'flex items-center gap-2',
        'rounded-full border border-rose-200',
        'bg-rose-50 px-6 py-2 text-rose-600',
        'transition-all hover:bg-rose-100 disabled:opacity-50',
      )}
      onClick={handleLike}
    >
      <span>{isPending ? '⏳' : '❤️'}</span>
      <span className="font-bold">좋아요 {count}</span>
    </button>
  )
}
