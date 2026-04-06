import { LucideHash, LucideType, LucideUser } from 'lucide-react'
import { cn } from '@/utils'

/**
 * [로딩 컴포넌트] Loading
 * 데이터를 불러오는 동안 사용자에게 보여줄 스켈레톤 UI입니다.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="북 아카이브 로딩 중..."
      className="space-y-8 py-1"
    >
      {/* [헤더 섹션] 제목과 설명 영역 스켈레톤 */}
      <div
        className={cn(
          'flex flex-col gap-3 border-l-6 pl-6 transition-colors duration-500',
          'border-foreground',
        )}
        >
          {/* 메인 타이틀 바 */}
        <div
          className={cn(
            'text-5xl font-black tracking-tighter uppercase md:text-6xl',
            'h-14 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800',
          )}
          />
          {/* 서브 설명 바 */}
        <div
          className={cn(
            'text-foreground/50 text-lg font-medium tracking-tight',
            'h-5 w-90 animate-pulse rounded-md bg-gray-100 dark:bg-zinc-900',
          )}
        />
      </div>

      {/* [정렬 옵션 섹션] 버튼 형태의 스켈레톤 */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: '제목 순', icon: LucideType },
          { label: '저자 순', icon: LucideUser },
          { label: 'ISBN 순', icon: LucideHash },
        ].map((option, i) => (
          <div
            key={i}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium opacity-50',
              // 라이트 모드: 연회색 배경 / 다크 모드: 진회색 배경
              'bg-gray-100 text-gray-300 dark:bg-zinc-800 dark:text-zinc-600',
            )}
          >
            <option.icon className="h-3.5 w-3.5" />
            {option.label}
          </div>
        ))}
      </div>

      {/* [도서 리스트 그리드] 카드 형태의 스켈레톤 (6개 반복) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex items-start gap-4 rounded-3xl border p-6 shadow-sm',
              // 라이트 모드: 연회색 테두리 / 다크 모드: 진회색 테두리
              'border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-950',
            )}
          >
            {/* 왼쪽: 아이콘/이미지 자리 스켈레톤 */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 dark:bg-zinc-900">
              <div className="h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            </div>

            {/* 오른쪽: 텍스트 정보 스켈레톤 */}
            <div className="flex-1 space-y-2.5 overflow-hidden">
              {/* 제목 영역 (두 줄) */}
              <div className="space-y-1.5">
                <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
              </div>
              {/* 저자/출판사 영역 */}
              <div className="h-4 w-16 animate-pulse rounded bg-gray-100 dark:bg-zinc-900" />
              {/* 날짜/기타 메타 정보 영역 */}
              <div className="mt-2 h-3 w-32 animate-pulse rounded bg-gray-50 dark:bg-zinc-900/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
