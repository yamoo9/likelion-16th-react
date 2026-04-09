import { LucideHash } from 'lucide-react'
import { cn } from '@/utils'

interface PokemonSkeletonProps {
  count?: number
}

export function PokemonSkeleton({ count = 6 }: PokemonSkeletonProps) {
  return (
    <div
      className={cn('grid grid-cols-1 gap-4', 'sm:grid-cols-2 lg:grid-cols-3')}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={cn(
            'relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5',
            'animate-pulse',
          )}
        >
          {/* 상단 헤더 영역 스켈레톤 */}
          <div className="mb-4 flex items-start justify-between">
            <div
              className={cn(
                'flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1',
                'h-5 w-16',
              )}
            >
              <LucideHash className="h-3 w-3 text-slate-200" />
              <div className="h-2 w-8 rounded bg-slate-200" />
            </div>
            <div className="h-2 w-2 rounded-full bg-slate-100" />
          </div>

          {/* 메인 콘텐츠 영역 스켈레톤 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* 이미지 자리 */}
              <div className="size-10 shrink-0 rounded-full bg-slate-100" />
              {/* 이름 자리 */}
              <div className="h-5 w-24 rounded bg-slate-200" />
            </div>

            {/* 설명문 자리 (두 줄) */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
            </div>
          </div>

          {/* 하단 태그 영역 스켈레톤 */}
          <div className="mt-5 flex gap-2">
            <div className="h-5 w-12 rounded-md border border-blue-50 bg-blue-50/50" />
            <div className="h-5 w-12 rounded-md border border-blue-50 bg-blue-50/50" />
          </div>
        </div>
      ))}
    </div>
  )
}
