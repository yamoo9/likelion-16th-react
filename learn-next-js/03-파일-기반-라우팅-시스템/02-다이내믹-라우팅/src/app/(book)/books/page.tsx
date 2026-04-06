import { LucideBookOpen, LucideTrophy } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import PageSectionTitle from '@/components/ui/page-section-title'
import { BookSummary, getAllBooksSummary, SortOrder } from '@/services/books'

import BookLinkList from './_components/book-link-list'
import SortBooks from './_components/sort-books'
import Pagination from '@/components/ui/pagination'
import LimitControl from '@/components/ui/limit-control'

/**
 * 도서 목록 페이지
 * Next.js의 서버 컴포넌트로, URL의 쿼리 스트링(searchParams)을 받아 데이터를 조회합니다.
 *
 * @param searchParams - URL 뒤에 붙는 파라미터 (예: /books?page=1&sortKey=title)
 */
export default async function BooksPage({ searchParams }: PageProps<'/books'>) {
  
  const params = await searchParams

  /**
   * [데이터 가공 및 타입 안전성]
   * URL 파라미터는 항상 문자열이므로, 서비스 함수에서 사용하는 타입으로 단언(as)합니다.
   * 사용자가 직접 URL을 입력할 때 값이 없을 경우를 대비해 기본값('title')을 설정합니다.
   */
  const page = params.page ? Number(params.page) : 1
  const limit = params.limit ? Number(params.limit) : 9
  const sortKey = (params.sortKey as keyof BookSummary) || 'title'
  const orderBy = (params.orderBy as SortOrder) || 'desc'

  /**
   * [데이터 페칭]
   * 서버에서 직접 DB나 API를 호출하여 데이터를 가져옵니다.
   * 선택된 sortKey에 따라 서버에서 이미 정렬된 데이터를 받아오게 됩니다.
   */
  const responseData = await getAllBooksSummary({
    page,
    limit,
    sortKey,
    orderBy,
  })

  const totalPages = responseData.pagination.totalPages ?? 1

  /**
   * [예외 처리: 데이터 없음]
   * 조회된 도서가 없을 경우, 전체 화면을 차지하는 안내 문구(Empty State)를 반환합니다.
   */
  if (!responseData || totalPages === 0) {
    return (
      <div className="mx-auto max-w-7xl rounded-2xl border px-4 py-16 text-center text-gray-500">
        <LucideBookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium text-gray-700">
          등록된 도서가 없습니다.
        </p>
        <p className="mt-1 text-sm">새로운 도서가 큐레이션 될 예정입니다.</p>
      </div>
    )
  }

  /**
   * [정상 렌더링]
   * 데이터가 존재할 경우, 페이지의 레이아웃을 구성합니다.
   */
  return (
    <div className="mx-auto space-y-8 py-1">
      {/* 페이지의 제목과 부가 설명을 표시하는 공통 컴포넌트 */}
      <PageSectionTitle
        title="북 아카이브"
        description="현재 큐레이션 된 도서 목록입니다. 당신의 인생 책을 찾아보세요."
      />

      {/* 서버 컴포넌트를 사용한 예 */}
      {/* <SortBooks searchParams={params} sortKey={sortKey} /> */}

      {/* 클라이언트 컴포넌트를 사용한 예 */}
      {/* <SortBooksSummary sortKey={sortKey} /> */}

      <div className="flex gap-4 items-center justify-between">
        <SortBooks searchParams={params} sortKey={sortKey} />
        <LimitControl currentLimit={limit} searchParams={params} />
      </div>


      {/* [도서 목록] 실제 도서 데이터 배열을 전달하여 카드 형태로 렌더링합니다. */}
      {limit > 9 && <Pagination currentPage={page} totalPages={totalPages} searchParams={params} />}
      <BookLinkList books={responseData.data} />
      <Pagination currentPage={page} totalPages={totalPages} searchParams={params} />

      {/* [하단 홍보 카드] 다른 페이지로 유도하는 링크 카드입니다. */}
      <LinkCard
        href="/books/best"
        title="베스트셀러"
        description="지금 가장 인기 있는 도서들을 확인해보세요."
        icon={LucideTrophy}
      />
    </div>
  )
}
