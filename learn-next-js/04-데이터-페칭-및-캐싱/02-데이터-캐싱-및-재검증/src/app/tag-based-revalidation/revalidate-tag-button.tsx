'use client'

import { useTransition } from 'react'
import { Loader2, RefreshCw } from 'lucide-react'

import { revalidatePokemonTag } from '@/actions/revalidate'
import { cn, wait } from '@/utils'

export function RevalidateTagButton() {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    if (isPending) return 

    startTransition(async () => {
      try {
        await wait(600)
        await revalidatePokemonTag() // 서버 함수
        console.log('Next.js 16 캐시가 성공적으로 무효화되었습니다.')
      } catch (error) {
        console.error('재검증 실패:', error)
        console.log('캐시 무효화 중 오류가 발생했습니다.')
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleRevalidate}
      aria-disabled={isPending}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md',
        'px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-200',
        'border shadow-sm',
        isPending
          ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
          : 'cursor-pointer border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-100 active:scale-95',
      )}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <RefreshCw className="size-4 text-emerald-500" />
      )}
      <span>{isPending ? '캐시 갱신 중...' : '태그 기반 데이터 즉시 갱신'}</span>
    </button>
  )
}