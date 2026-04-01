'use client'

import { cn } from '@/utils'
import { useImmer } from 'use-immer'

export default function ClientComponent() {
  const [counterStore, setCountStore] = useImmer({
    counter: {
      countValue: {
        count: 0,
      },
    },
  })

  const handleUpdateCountStore = () => {
    setCountStore((draft) => {
      draft.counter.countValue.count += 1
    })
  }

  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center gap-y-3',
        'my-5 px-6 py-5',
        'rounded-xl border-3 border-pink-400',
        'bg-pink-50',
      )}
    >
      <h2 className="text-lg font-bold text-pink-400">
        클라이언트 컴포넌트 (
        <abbr
          title="React Client Component"
          aria-label="React Client Component"
          className={cn(
            'cursor-help',
            'no-underline decoration-pink-500/30 underline-offset-4 hover:underline',
          )}
        >
          RCC [{counterStore.counter.countValue.count}]
        </abbr>
        )
      </h2>
      <p className="text-center font-mono text-xs leading-relaxed text-pink-800">
        이 컴포넌트는 서버(Node.js)에서 렌더링되고,
        <br />
        클라이언트(Browser) 환경에서 하이드레이션되었습니다.
      </p>

      <button
        type="button"
        aria-label="좋아요"
        className={cn(
          'cursor-pointer',
          'rounded-2xl p-1.5',
          'bg-slate-950 text-pink-300',
          'leading-none',
          'active:scale-95',
          'focus:outline-pink-200',
        )}
        onClick={handleUpdateCountStore}
      >
        🩷
      </button>
    </section>
  )
}
