import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/utils'
import PageButton from './page-button'

/**
 * [타입 정의] PaginationProps
 * @param currentPage - 현재 사용자가 보고 있는 페이지 번호
 * @param totalPages - 전체 페이지 개수
 * @param searchParams - URL의 쿼리 파라미터 (검색어, 필터 등을 유지하기 위함)
 */
interface PaginationProps {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | string[] | undefined>
}

/**
 * [UI 컴포넌트] Pagination
 * 도서 목록 등의 하단에서 페이지를 이동할 수 있는 내비게이션을 제공합니다.
 */
export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  
  /**
   * [로직] getPageNumbers
   * 현재 페이지를 기준으로 앞뒤 2개씩, 최대 5개의 페이지 번호를 계산하여 배열로 반환합니다.
   * 예: 현재 5페이지고 전체 10페이지라면 [3, 4, 5, 6, 7] 반환
   */
  const getPageNumbers = () => {
    const delta = 2 // 현재 페이지 앞뒤로 보여줄 개수
    const range = []
    
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i)
    }
    return range
  }

  /**
   * [로직] createPageHref
   * 기존의 검색 조건(searchParams)을 유지하면서 'page' 파라미터만 변경된 URL을 생성합니다.
   */
  const createPageHref = (page: number) => {
    const params = new URLSearchParams()
    
    // 기존 쿼리 파라미터 복사 (검색어, 정렬 등 유지)
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, Array.isArray(value) ? value[0] : (value as string))
      }
    })
    
    // 이동할 페이지 번호 설정
    params.set('page', page.toString())
    return `?${params.toString()}`
  }

  // 데이터가 한 페이지뿐이라면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) return null

  return (
    <nav
      className="flex items-center justify-center gap-1 py-2"
      aria-label="Pagination"
    >
      {/* 처음으로 이동 (<<) */}
      <PageButton
        href={createPageHref(1)}
        disabled={currentPage === 1}
        icon={ChevronsLeft}
        label="처음으로"
      />

      {/* 이전 페이지로 이동 (<) */}
      <PageButton
        href={createPageHref(currentPage - 1)}
        disabled={currentPage === 1}
        icon={ChevronLeft}
        label="이전"
      />

      {/* [페이지 번호 목록] */}
      <div className="mx-2 flex items-center gap-1">
        {getPageNumbers().map((page) => {
          const isActive = page === currentPage
          
          return (
            <Link
              key={page}
              href={createPageHref(page)}
              scroll={false} // 이동 시 페이지 상단으로 튕김 방지
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all',
                // 활성 상태: 반전 색상 및 그림자 | 비활성 상태: 은은한 호버 효과
                isActive
                  ? 'bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200',
              )}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* 다음 페이지로 이동 (>) */}
      <PageButton
        href={createPageHref(currentPage + 1)}
        disabled={currentPage === totalPages}
        icon={ChevronRight}
        label="다음"
      />

      {/* 마지막으로 이동 (>>) */}
      <PageButton
        href={createPageHref(totalPages)}
        disabled={currentPage === totalPages}
        icon={ChevronsRight}
        label="마지막으로"
      />
    </nav>
  )
}