'use client'

import { useState, useTransition } from 'react'
import { cn, isErrorObject } from '@/utils'
import { writeLikes } from '@/functions/likes-read-write' // 서버 함수

interface Props {
  initialLikes: number
}

export default function LikeButton({ initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes)
  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    if (isPending) {
      console.log('사용자의 클릭 연타 방지 (방어)')
      return
    }

    startTransition(async () => {
      try {
        const nextCount = likes + 1

        // 서버 함수 호출 (서버의 JSON 파일을 업데이트)
        // const result = { success: true }
        const result = await writeLikes(nextCount)

        // await wait(2000) // 서버 응답 대기 시간 시뮬레이션
        // 서버 함수 결과에 따라 상태 업데이트
        if (result.success) setLikes(nextCount)
      } catch (error) {
        if (isErrorObject(error)) console.error(error)
        else console.error('[에러 발생]', String(error))
      }
    })
  }

  return (
    <button
      type="button"
      aria-disabled={isPending}
      className={cn(
        'cursor-pointer active:scale-97',
        'flex items-center gap-2',
        'rounded-full border border-rose-200',
        'bg-rose-50 px-6 py-2 text-rose-600',
        'transition-all hover:bg-rose-100',
        isPending && 'cursor-not-allowed opacity-60 grayscale-100 active:scale-100',
      )}
      onClick={handleLike}
    >
      <span>{isPending ? '⏳' : '❤️'}</span>
      <span className="font-bold">좋아요 {likes}</span>
    </button>
  )
}
