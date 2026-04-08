import { LucideLoader2 } from 'lucide-react'

export function Spinner({children = '데이터 로딩중...'}: React.PropsWithChildren) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-20"
    >
      <LucideLoader2 className="h-10 w-10 animate-spin text-blue-500" />
      <p className="animate-pulse font-medium text-slate-400">
        {children}
      </p>
    </div>
  )
}
