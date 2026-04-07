import { LucideArrowRight, LucideSend } from 'lucide-react'
import { cn } from '@/utils'


export default function ServerSidePage() {

  return (
    <div className="flex grow items-center justify-center">
      <div
        className={cn(
          'relative flex flex-col justify-between overflow-hidden',
          'mx-auto w-full max-w-md p-10',
          'min-h-87.5',
          'rounded-[40px] border border-emerald-100 bg-white',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
          'transition-all hover:shadow-xl',
        )}
      >
        <div
          role="presentation"
          className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-50 opacity-60"
        />

        <div className="relative z-10">
          <div
            className={cn(
              'mb-8 flex h-16 w-16 items-center justify-center rounded-2xl',
              'bg-emerald-600 shadow-lg shadow-emerald-200',
            )}
          >
            <LucideSend className="h-7 w-7 -rotate-12 text-white" />
          </div>

          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            서버 사이드
          </h1>
          <p className="mb-8 leading-relaxed text-slate-500">
            서버 컴포넌트에서 직접 액션을 호출합니다. 브라우저의 JS 없이도
            작동하는 전통적인 방식입니다.
          </p>
        </div>

        <form className="relative z-10 space-y-4">
          <input
            name="title"
            required
            placeholder="아이템 이름 입력..."
            className={cn(
              'w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4',
              'transition-all outline-none focus:ring-2 focus:ring-emerald-500',
            )}
          />
          <button
            type="submit"
            className={cn(
              '-translate-x-2 px-2 py-1',
              'group mt-2 flex cursor-pointer items-center gap-2 font-bold text-emerald-600',
            )}
          >
            서버 측 데이터 페칭{' '}
            <LucideArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </div>
  )
}
