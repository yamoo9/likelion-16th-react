'use client'

import { useEffect } from 'react'
import { LucideAlertCircle, LucideRefreshCcw } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  error: Error & { digest?: string }
  unstable_retry: () => void
  reset: () => void
}

export default function Error({ error, unstable_retry }: Props) {
  
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      className={cn(
        'm-8 flex h-100 flex-col items-center justify-center p-8 text-center lg:mx-0',
        'rounded-xl border-2 border-dashed border-rose-200 bg-rose-50',
      )}
    >
      <LucideAlertCircle className={cn('mb-4 size-12', 'text-rose-500')} />

      <h2 className={cn('mb-2 text-xl font-bold', 'text-rose-900')}>
        데이터 로드 중 오류 발생!
      </h2>

      <p className={cn('mb-6 text-sm', 'text-rose-600')}>
        {error.message ??
          '스트리밍 데이터를 불러오는 과정에서 문제가 생겼습니다.'}
      </p>

      <button
        type="button"
        onClick={unstable_retry}
        className={cn(
          'flex items-center gap-2 px-4 py-2',
          'rounded-lg bg-rose-600 font-medium text-white',
          'transition-all duration-200 hover:bg-rose-700 active:scale-95',
        )}
      >
        <LucideRefreshCcw className="size-4" />
        다시 시도하기
      </button>
    </div>
  )
}
