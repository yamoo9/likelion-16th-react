import { LucideAlertCircle, LucideRefreshCw } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  message?: string
  reset?: () => void
}

export default function UserListError({
  message = '사용자 목록을 불러오는 중 오류가 발생했습니다.',
  reset,
}: Props) {
  return (
    <div role="alert" aria-live="assertive" className="grid w-full gap-4">
      <div
        className={cn(
          'border-destructive/10 bg-destructive/5 flex flex-col items-center justify-center gap-4 rounded-xl border p-8 text-center',
          'animate-in fade-in zoom-in-95 duration-300',
        )}
      >
        <div className="bg-destructive/10 text-destructive flex h-12 w-12 items-center justify-center rounded-full">
          <LucideAlertCircle className="h-6 w-6" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h3 className="text-destructive font-semibold">데이터 로드 실패</h3>
          <p className="text-muted-foreground max-w-60 text-sm leading-relaxed">
            {message}
          </p>
        </div>

        {reset && (
          <button
            type="button"
            onClick={() => reset()}
            className={cn(
              'bg-destructive mt-2 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all',
              'hover:bg-destructive/90 active:scale-95',
              'focus-visible:ring-destructive focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            )}
          >
            <LucideRefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>다시 시도하기</span>
          </button>
        )}
      </div>

      <span className="sr-only">
        오류가 발생했습니다. 다시 시도 버튼을 눌러주세요.
      </span>
    </div>
  )
}
