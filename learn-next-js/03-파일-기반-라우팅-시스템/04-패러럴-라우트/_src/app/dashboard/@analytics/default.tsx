import { BarChart3 } from 'lucide-react'

export default function AnalyticsDefault() {
  return (
    <div className="flex h-full flex-col">
      <header className="mb-10 flex items-center justify-between opacity-50">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-200 p-2">
            <BarChart3 className="h-5 w-5 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-400">분석 데이터</h2>
        </div>
      </header>

      <div className="flex grow flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-blue-500" />
        <p className="animate-pulse text-sm font-medium text-slate-400">
          데이터를 불러오는 중입니다...
        </p>
      </div>

      <div className="mt-8 h-14 w-full animate-pulse rounded-2xl bg-slate-100" />
    </div>
  )
}
