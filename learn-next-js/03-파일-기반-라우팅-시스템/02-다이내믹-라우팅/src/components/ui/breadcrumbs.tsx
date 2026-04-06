'use client'

import { Fragment } from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * [클라이언트 컴포넌트] Breadcrumbs
 * 현재 URL 경로(pathname)를 분석하여 사용자의 위치를 탐색 경로 형태로 표시합니다.
 * 한글 URL 디코딩 및 영문 첫 글자 대문자화 기능을 포함합니다.
 */
export default function Breadcrumbs() {
  const pathname = usePathname()

  // [경로 분리] 전체 경로를 '/' 기준으로 나누고 빈 문자열(루트 등)을 제거합니다.
  const segments = pathname.split('/').filter((item) => item !== '')

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-sm font-medium text-zinc-500 dark:text-zinc-400"
    >
      {/* [홈 링크] 언제나 첫 번째에 위치하는 홈 아이콘 */}
      <Link
        href="/"
        className="flex items-center transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        aria-label="홈"
      >
        <Home className="h-4 w-4" />
      </Link>

      {/* [세그먼트 매핑] 각 경로 조각을 순회하며 링크 또는 텍스트 생성 */}
      {segments.map((segment, index) => {
        // 현재 단계까지의 전체 경로(href) 생성
        const href = `/${segments.slice(0, index + 1).join('/')}`
        // 현재 요소가 마지막(현재 페이지)인지 확인
        const isLast = index === segments.length - 1

        // [텍스트 가공] URL 인코딩된 문자열을 읽기 좋게 변환
        let title = decodeURIComponent(segment) // 한글 깨짐 방지 (예: %EB%8F%84%EC%84%9C -> 도서)
        
        title = title
          .replace(/-/g, ' ') // 하이픈(-)을 공백으로 변경
          .replace(/\b\w/g, (l) => l.toUpperCase()) // 영문일 경우 단어 첫 글자를 대문자로 (예: books -> Books)

        return (
          <Fragment key={href}>
            {/* 구분선 아이콘 */}
            <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-600" />
            
            {isLast ? (
              /* [현재 페이지] 클릭 불가능한 강조 텍스트 */
              <span
                title={title}
                className="max-w-50 truncate font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {title}
              </span>
            ) : (
              /* [상위 페이지] 클릭 가능한 링크 */
              <Link
                href={href}
                title={title}
                className="max-w-37.5 truncate transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {title}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}