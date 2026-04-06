import Link from 'next/link'
import { LucideTrophy } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import PageSectionTitle from '@/components/ui/page-section-title'

import { cn } from '@/utils'
import { books } from './_resources/data'
import type { BookKeys, OrderBy, SortKey } from './_resources/data'
import SortOrderClient from './_resources/sort-order/client'
import SortOrderServer from './_resources/sort-order/server'

/**
 * [실습] 동적 세그먼트(Dynamic Segment) 및 쿼리 스트링 활용
 *
 * 핵심 학습 목표
 * - props.searchParams를 통한 URL 쿼리 스트링 데이터 추출
 * - 서버 컴포넌트에서의 데이터 정렬(Sorting) 및 필터링 로직 구현
 * - 클라이언트 컴포넌트(Link, useRouter)를 이용한 동적 경로 탐색
 *
 * 다루는 주요 상태 (Search Params)
 * - 정렬 기준: sortKey (이름순, 출판일순, ISBN순)
 * - 정렬 순서: orderBy (오름차순 asc, 내림차순 desc)
 * - 페이지네이션: page (현재 페이지), limit (한 번에 보여줄 개수)
 *
 * 구현 기능
 * - 서버 측: 전달받은 파라미터에 따라 DB(JSON) 데이터를 가공하여 전달
 * - 클라이언트 측: 드롭다운이나 버튼 클릭 시 URL을 변경하여 서버 다시 읽기 유도
 * - UI: 페이지네이션 정보(TotalCount, TotalPages, HasNextPage) 계산 및 표시
 */
export default async function BooksPage({ searchParams }: PageProps<'/books'>) {
  const {
    orderBy = 'desc',
    sortKey = 'pubdate',
    page = 1,
    size = 6,
  } = await searchParams

  // books ?sortKey=title&orderBy=asc&page=3&size=2
  console.log({ orderBy, sortKey, page, size })

  // 페이지네이션 정보 가져오기
  const pagination = getPagination(books, page as string, size as string)

  // ---------------------------------------------------------------------------
  // 정렬된 도서 목록
  // 도서A[정렬키] -로케일 비교 (localeCompare)- 도서B[정렬키]
  const filteredBooks = pagination.data.toSorted((a, b) => {
    const aField = String(a[sortKey as BookKeys] ?? '')
    const bField = String(b[sortKey as BookKeys] ?? '')
    const comparison = aField.localeCompare(bField) // 1, 0, -1
    return orderBy === 'asc' ? comparison : -comparison
  })

  return (
    <div className="mx-auto space-y-8">
      <PageSectionTitle
        title="북 아카이브"
        description="현재 큐레이션 된 도서 목록입니다. 당신의 인생 책을 찾아보세요."
      />

      {/* 클라이언트 컴포넌트를 사용해 정렬 기능 적용 */}
      <SortOrderClient />

      {/* 서버 컴포넌트를 사용해 정렬 기능 적용 */}
      <SortOrderServer
        sortKey={sortKey as SortKey}
        orderBy={orderBy as OrderBy}
      />

      {/* books 리스트 렌더링 */}
      <nav
        aria-label="도서 목록"
        className="flex flex-col gap-2 rounded-xl border p-5"
      >
        {filteredBooks.map((book) => {
          return (
            // Hard Navigation : <a> (외부 링크)
            // Soft Navigation : <Link> (내부 링크)
            <Link
              key={book.isbn}
              // href={`/books/${book.isbn}`}
              // href={`/books/${book.title}`}
              href={`/books/${book.pubdate}/${book.title}`}
              className={cn(
                'px-2 pt-1 pb-1.5',
                'text-foreground/80 hover:text-foreground font-medium',
              )}
            >
              {book.title}
              <div>
                <time className="text-rose-500">{book.pubdate}</time> /{' '}
                <span className="text-indigo-500">{book.isbn}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="rounded-xl border p-2 flex gap-3">
        {Array.from({ length: pagination.totalPages }).map((_, index) => {
          const pageIndex = index + 1
          const isActive = pageIndex === Number(page)
          
          return (
            <Link
              key={index}
              href={`?page=${pageIndex}&size=${size}`}
              scroll={false}
              className={
                cn(
                  'inline-flex justify-center items-center', 
                  'bg-background text-foreground size-6 border rounded-full p-1',
                  isActive && 'bg-foreground text-background font-semibold'
                )
              }
            >
              {pageIndex}
            </Link>
          )
        })}
      </div>

      <LinkCard
        href="/books/best"
        title="베스트셀러"
        description="지금 가장 인기 있는 도서들을 확인해보세요."
        icon={LucideTrophy}
      />
    </div>
  )
}

// 페이지네이션 정보를 반환하는 함수 (로직 재사용)
function getPagination<T>(
  list: T[],
  page: number | string = 1,
  size: number | string = 10,
) {
  // 방어적 프로그래밍
  const safePage = Math.max(1, Number(page))
  const safeSize = Math.max(1, Number(size))

  // 데이터의 총 개수
  const totalCount = list.length

  // 화면에 표시할 데이터
  const startIndex = (safePage - 1) * safeSize
  const data = list.slice(startIndex, startIndex + safeSize)

  // 총 페이지 수
  const totalPages = Math.ceil(totalCount / safeSize)

  // 페이지네이션 (Pagination)
  // - 화면에 표시할만큼 잘린 데이터 (data) ✅
  // - 현재 페이지 (currentPage) ✅
  // - 총 개수 (totalCount)  ✅
  // - 총 페이지 수 (totalPages) ✅
  // - 다음 페이지 제공 유무 (hasNextPage) ✅
  return {
    data,
    currentPage: safePage,
    totalCount,
    totalPages,
    hasNextPage: safePage < totalPages,
  }
}
