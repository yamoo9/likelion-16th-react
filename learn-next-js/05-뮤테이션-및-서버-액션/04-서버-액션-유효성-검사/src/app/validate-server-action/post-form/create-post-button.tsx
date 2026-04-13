import { Loader2, LucideMousePointerClick } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/utils'

export function CreaetPostButton() {
  // 현재 폼의 제출 상태를 가져옵니다.
  // (true: 서버 통신 중, false: 대기 중)
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl py-4 font-bold text-white transition-all',
        'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200',
        'aria-disabled:bg-slate-200 aria-disabled:text-slate-400 aria-disabled:shadow-none',
      )}
    >
      <div
        className="flex items-center justify-center gap-2"
        aria-busy={pending}
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>등록 중...</span>
          </>
        ) : (
          <>
            <span className="font-semibold">등록</span>
            <LucideMousePointerClick
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </>
        )}
      </div>
    </button>
  )
}
