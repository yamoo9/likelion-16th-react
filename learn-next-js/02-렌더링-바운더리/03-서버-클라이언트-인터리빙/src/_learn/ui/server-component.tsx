import { ServerIcon } from 'lucide-react'

import { cn } from '@/utils'

type Props = { className?: string }

export default async function ServerComponent({ className }: Props) {
  return (
    <section
      className={cn(
        'max-w-120',
        'bg-card text-card-foreground rounded-xl border p-6 shadow-sm',
        'border-slate-200 bg-slate-50/50',
        'dark:border-slate-800 dark:bg-slate-900/50',
        className,
      )}
    >
      <header className="mb-2 flex items-center gap-2">
        <ServerIcon className="size-4.5 text-blue-600" />
        <h3
          className={cn(
            'leading-none font-semibold tracking-tight text-blue-700 mb-1',
            'dark:text-blue-400 text-xl',
          )}
        >
          서버 컴포넌트
        </h3>
      </header>

      <p className="text-muted-foreground text-sm leading-relaxed">
        이 영역은 서버에서 렌더링되어 HTML로 전달되었습니다.<br />
        클라이언트 번들에 포함되지 않아 성능 최적화에 유리합니다.
      </p>

      <div
        className={cn(
          'mt-4 border-t border-slate-200 pt-4 font-mono text-xs text-slate-600',
          'dark:border-slate-800',
        )}
      >
        렌더링 타임: {new Date().toISOString()}
      </div>
      
      <div className="mt-5">
        {/* 클라이언트 컴포넌트를 삽입해보세요. */}

      </div>
    </section>
  )
}
