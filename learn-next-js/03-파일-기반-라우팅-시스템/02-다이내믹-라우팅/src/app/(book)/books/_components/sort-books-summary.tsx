'use client'

import { LucideHash, LucideType, LucideUser } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

import { BookSummary } from "@/services/books"
import { cn } from "@/utils"

/**
 * [정렬 옵션 설정]
 * 화면에 표시할 정렬 기준들을 배열로 정의합니다. 
 * 아이콘과 레이블을 한곳에서 관리하여 유지보수가 용이합니다.
 */
const sortOptions = [
  { key: 'title', label: '제목 순', icon: LucideType },
  { key: 'author', label: '저자 순', icon: LucideUser },
  { key: 'isbn', label: 'ISBN 순', icon: LucideHash },
] as const

/**
 * [내부 컴포넌트] SortButtons
 * 실제 버튼들을 렌더링하고 클릭 이벤트를 처리합니다.
 */
function SortButtons({ sortKey }: { sortKey: keyof BookSummary }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  /**
   * [정렬 변경 함수]
   * 새로운 정렬 기준을 URL의 쿼리 스트링(`?sortKey=...`)에 반영합니다.
   */
  const handleSort = (newSortKey: string) => {
    // 현재 URL의 모든 파라미터를 복사합니다.
    const params = new URLSearchParams(searchParams.toString())
    
    // 새로운 정렬 키를 설정하고, 데이터가 섞이므로 페이지는 1로 초기화합니다.
    params.set('sortKey', newSortKey)
    params.set('page', '1') 

    // 변경된 쿼리로 이동합니다. { scroll: false }를 통해 화면 튐 현상을 방지합니다.
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {sortOptions.map((option) => {
        const Icon = option.icon
        const isActive = sortKey === option.key

        return (
          <button
            type="button"
            key={option.key}
            onClick={() => handleSort(option.key)}
            className={cn(
              // [기본 구조] 둥근 캡슐 형태, 텍스트 크기 및 간격 설정
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
              
              // [상태별 스타일링]
              isActive
                ? // 활성화 상태: 강조색 (라이트: 검정, 다크: 흰색)
                  'bg-zinc-900 text-zinc-50 shadow-md dark:bg-zinc-100 dark:text-zinc-900'
                : // 비활성화 상태: 은은한 배경 (라이트: 연회색, 다크: 짙은회색)
                  'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200'
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * [메인 컴포넌트] SortBooksSummary
 * Next.js 13+에서 useSearchParams를 사용하는 클라이언트 컴포넌트는 
 * 정적 빌드 시 오류를 방지하기 위해 반드시 <Suspense>로 감싸야 합니다.
 * 
 * @param sortKey - 현재 서버에서 적용된 정렬 기준 키
 */
export default function SortBooksSummary(props: { sortKey: keyof BookSummary }) {
  return (
    <Suspense
      // 로딩 중일 때 표시할 스켈레톤 UI
      fallback={
        <div
          role="status"
          aria-label="로딩중..."
          className="h-9 w-64 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800"
        />
      }
    >
      <SortButtons {...props} />
    </Suspense>
  )
}