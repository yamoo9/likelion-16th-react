import { LucideBookOpen } from 'lucide-react'
import Link from 'next/link'

import { BookSummary } from '@/services/books'
import { cn } from '@/utils'

/**
 * BookLinkList 컴포넌트
 * 도서 요약 정보(BookSummary) 배열을 받아 카드 형태의 그리드 목록으로 렌더링합니다.
 */
export default function BookLinkList({ books }: { books: BookSummary[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <li key={book.isbn} className="group">
          <Link
            // 제목에 특수문자가 있을 경우를 대비해 URL 인코딩을 적용합니다.
            href={`/books/${book.isbn}/${encodeURIComponent(book.title)}`}
            className={cn(
              // [레이아웃 & 기본 스타일]
              'block h-full rounded-3xl border p-6 transition-all duration-300',
              // [라이트 모드]
              'border-zinc-200 bg-white shadow-sm',
              // [다크 모드]
              'dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none',
              // [호버 효과] 테두리를 진하게 하고 미세한 그림자 추가
              'hover:border-zinc-400 hover:shadow-md dark:hover:border-zinc-600 dark:hover:shadow-zinc-900/50',
            )}
          >
            <div className="flex h-full items-start gap-4">
              {/* 
                [아이콘 영역] 
                도서 아이콘을 감싸는 박스로, 호버 시 테두리 색상이 변하며 입체감을 줍니다.
              */}
              <div
                className={cn(
                  'shrink-0 rounded-2xl border p-3 transition-colors duration-300',
                  // 라이트 모드 색상
                  'border-zinc-100 bg-zinc-50 group-hover:border-zinc-200',
                  // 다크 모드 색상
                  'dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-zinc-700',
                )}
              >
                <LucideBookOpen
                  className={cn(
                    'h-7 w-7 transition-colors duration-300',
                    'text-zinc-600 group-hover:text-zinc-900', // 라이트
                    'dark:text-zinc-400 dark:group-hover:text-zinc-100', // 다크
                  )}
                />
              </div>

              {/* [도서 정보 영역] 제목, 저자, ISBN을 수직으로 배치 */}
              <div className="flex h-full flex-col justify-between gap-1 overflow-hidden pt-1">
                <div>
                  {/* 도서 제목: 길 경우 말줄임(...) 처리, 호버 시 색상 강조 */}
                  <p
                    className={cn(
                      'truncate text-lg leading-tight font-semibold transition-colors duration-300',
                      'text-zinc-500 group-hover:text-zinc-900', // 라이트
                      'dark:text-zinc-400 dark:group-hover:text-zinc-100', // 다크
                    )}
                  >
                    {book.title}
                  </p>

                  {/* 저자 정보: 텍스트가 길면 한 줄로 제한(line-clamp-1) */}
                  <p className="mt-1 line-clamp-1 text-sm text-zinc-600 dark:text-zinc-500">
                    {book.author}
                  </p>
                </div>

                {/* ISBN: 고정폭 글꼴(font-mono)을 사용하여 데이터 느낌 강조 */}
                <p className="mt-2 font-mono text-xs tracking-tighter text-zinc-400 dark:text-zinc-600">
                  ISBN: {book.isbn}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}