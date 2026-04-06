import Link from 'next/link'
import { LucideHash, LucideType, LucideUser } from 'lucide-react'

import { BookSummary } from '@/services/books'
import { cn } from '@/utils'

/**
 * [정렬 옵션 데이터]
 * 화면에 표시할 정렬 기준들을 정의합니다. 
 * 'as const'를 사용하여 TypeScript가 각 key를 정확한 리터럴 타입으로 인식하게 합니다.
 */
const sortOptions = [
  { key: 'title', label: '제목 순', icon: LucideType },
  { key: 'author', label: '저자 순', icon: LucideUser },
  { key: 'isbn', label: 'ISBN 순', icon: LucideHash },
] as const

interface SortBooksProps {
  /** 현재 서버에서 적용된 정렬 키 (예: 'title', 'author', 'isbn') */
  sortKey: keyof BookSummary
  /** 
   * 서버 컴포넌트(page.tsx)의 searchParams를 그대로 전달받습니다.
   * 기존의 검색어(q)나 필터 상태를 유지하면서 정렬만 바꾸기 위함입니다.
   */
  searchParams: Record<string, string | string[] | undefined>
}

/**
 * [서버 컴포넌트 전용] SortBooks
 * 클릭 시 페이지 전체를 새로고침하지 않고, Next.js의 Link를 통해 URL 쿼리 스트링만 업데이트합니다.
 */
export default function SortBooks({ sortKey, searchParams }: SortBooksProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {sortOptions.map((option) => {
        const Icon = option.icon
        const isActive = sortKey === option.key

        /**
         * [URL 생성 로직]
         * - 현재 URL의 모든 쿼리 파라미터를 복사합니다.
         * - 클릭한 옵션의 정렬 키(sortKey)를 설정합니다.
         * - 정렬이 바뀌면 데이터 순서가 달라지므로 페이지(page)는 1로 초기화합니다.
         */
        const params = new URLSearchParams()
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) {
            // 배열 형태의 파라미터(string[])인 경우 첫 번째 값을 사용합니다.
            params.set(key, Array.isArray(value) ? value[0] : (value as string))
          }
        })
        params.set('sortKey', option.key)
        params.set('page', '1')

        return (
          <Link
            key={option.key}
            // 생성된 쿼리 스트링을 포함한 경로로 이동합니다.
            href={`/books?${params.toString()}`}
            // scroll={false}: 정렬 시 브라우저 스크롤이 맨 위로 튀는 것을 방지합니다.
            scroll={false}
            className={cn(
              // [공통 스타일] 둥근 캡슐 모양, 부드러운 전환 효과
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              
              // [조건부 스타일링] 활성/비활성 상태에 따른 색상 대비
              isActive
                ? [
                    // 활성화 상태: 라이트(검정 배경) / 다크(흰색 배경)
                    'bg-zinc-900 text-zinc-50 shadow-md shadow-zinc-900/10',
                    'dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none'
                  ]
                : [
                    // 비활성화 상태: 라이트(연회색) / 다크(진회색)
                    'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900',
                    'dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200'
                  ]
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {option.label}
          </Link>
        )
      })}
    </div>
  )
}