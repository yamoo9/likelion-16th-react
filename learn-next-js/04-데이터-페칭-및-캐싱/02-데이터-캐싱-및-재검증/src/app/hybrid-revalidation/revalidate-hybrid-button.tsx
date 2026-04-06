'use client'

import { useTransition } from 'react'
import { Loader2, RefreshCw } from 'lucide-react'

import { revalidateHybrid } from '@/actions/revalidate'
import { cn, wait } from '@/utils'


export function RevalidateHybridButton() {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    if (isPending) return

    startTransition(async () => {
      try {
        // 로딩 상태 (지연 처리)
        await wait(600)

        // 서버 액션 호출
        await revalidateHybrid('/hybrid-revalidation', 'pokemons')

        console.log('경로 및 태그 캐시가 성공적으로 무효화되었습니다.')
      } catch (error) {
        console.error('재검증 실패:', error)
        alert('캐시 갱신 중 오류가 발생했습니다.')
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleRevalidate}
      disabled={isPending}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md',
        'px-4 py-2 text-sm font-semibold tracking-tight transition-all duration-200',
        'border shadow-sm',
        isPending
          ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
          : 'cursor-pointer border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-100 active:scale-95',
      )}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <RefreshCw className="size-4 text-amber-500" />
      )}
      <span>
        {isPending ? '캐시 갱신 중...' : '경로 & 태그 혼합 즉시 갱신'}
      </span>
    </button>
  )
}
