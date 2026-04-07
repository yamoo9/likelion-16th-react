import { BarChart3, TrendingUp, ArrowUpRight } from 'lucide-react'
import { cn } from '@/utils'

export default function AnalyticsPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-600 p-2">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">실시간 분석</h2>
        </div>
        <span
          lang="en"
          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600"
        >
          LIVE
        </span>
      </header>

      <div className="grow space-y-6">
        <div
          className={cn(
            'rounded-3xl border border-slate-100 bg-white p-6 shadow-sm',
          )}
        >
          <p className="mb-1 text-sm font-medium text-slate-400">
            오늘의 방문자
          </p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900">2,840</span>
            <span className="mb-1 flex items-center text-sm font-bold text-emerald-500">
              <ArrowUpRight className="h-4 w-4" /> 12%
            </span>
          </div>
        </div>

        <div
          className={cn(
            'rounded-3xl border border-slate-100 bg-white p-6 shadow-sm',
          )}
        >
          <p className="mb-1 text-sm font-medium text-slate-400">
            평균 체류 시간
          </p>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900">04:12</span>
            <span className="mb-1 flex items-center text-sm font-bold text-blue-500">
              <TrendingUp className="mr-1 h-4 w-4" /> 안정적
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          'cursor-pointer',
          'mt-8 w-full rounded-2xl py-4 text-sm font-bold transition-all',
          'bg-slate-900 text-white hover:bg-slate-800',
        )}
      >
        데이터 리포트 다운로드
      </button>
    </div>
  )
}
