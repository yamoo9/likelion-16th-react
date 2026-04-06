'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { LucideSearch } from 'lucide-react'
import { cn } from '@/utils'

/**
 * [클라이언트 컴포넌트] SearchForm
 * 사용자의 입력값을 받아 URL의 쿼리 스트링(?q=...)을 업데이트합니다.
 * 서버 컴포넌트인 BooksPage는 이 변경된 URL을 감지하여 데이터를 다시 페칭합니다.
 */
export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * [검색 실행 함수]
   * 폼 제출 시 실행되며, 입력된 검색어를 URL 파라미터에 반영합니다.
   */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q')?.toString().trim()

    // 기존 쿼리 파라미터를 유지하면서 검색어(q)만 업데이트하거나 삭제합니다.
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('q', query)
      params.set('page', '1') // 검색 시 페이지는 1페이지로 초기화
    } else {
      params.delete('q')
    }

    // 변경된 쿼리로 페이지 이동 (서버 컴포넌트 재실행 유도)
    router.push(`?${params.toString()}`)
  }

  return (
    <form 
      onSubmit={handleSearch}
      className="mb-12 flex flex-col gap-3 md:flex-row" 
    >
      <div className="relative flex-1">
        {/* 검색 아이콘: 입력창 내부에 절대 위치로 배치 */}
        <LucideSearch 
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" 
          aria-hidden="true"
        />
        
        <input
          type="text"
          name="q"
          // 현재 URL에 검색어가 있다면 기본값으로 설정
          defaultValue={searchParams.get('q') ?? ''}
          placeholder="찾는 도서 제목이나 저자를 입력하세요."
          className={cn(
            // [기본 구조]
            'w-full rounded-2xl border py-4 pr-4 pl-12 text-base transition-all outline-none',
            // [라이트 모드] 연한 배경과 테두리
            'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400',
            // [다크 모드] 어두운 배경과 테두리
            'dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500',
            // [포커스 상태] 테두리 강조 및 미세한 링 효과
            'focus:border-zinc-400 focus:ring-4 focus:ring-zinc-950/5',
            'dark:focus:border-zinc-600 dark:focus:ring-white/5'
          )}
        />
      </div>

      {/* 검색 버튼 */}
      <button
        type="submit"
        className={cn(
          // [기본 구조]
          'flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-2xl border transition-all cursor-pointer',
          // [라이트 모드]
          'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800 shadow-sm',
          // [다크 모드]
          'dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 dark:hover:bg-zinc-200',
          // [클릭 효과] 살짝 눌리는 느낌
          'active:scale-[0.98]'
        )}
      >
        검색
      </button>
    </form>
  )
}
