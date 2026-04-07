import Image from 'next/image'
import { notFound } from 'next/navigation'

import { getBookByTitle } from '@/services/books'
import { cn } from '@/utils'

/**
 * [서버 컴포넌트] BookDetailPage
 * 특정 도서의 상세 정보를 조회하여 렌더링합니다.
 * Next.js 15의 비동기 params 규격을 따릅니다.
 */
export default async function BookDetailPage({
  params,
}: PageProps<'/books/[isbn]/[title]'>) {
  // URL 파라미터에서 제목을 가져와 디코딩합니다.
  const { isbn, title } = await params
  const book = await getBookByTitle(decodeURIComponent(title))

  console.log({isbn})

  // 도서 정보가 없으면 404 페이지로 이동합니다.
  if (!book) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-4">
      {/* [메인 상세 카드 섹션] 전체적인 정보의 틀을 잡는 컨테이너 */}
      <div
        className={cn(
          'rounded-3xl border-2 border-dashed p-8',
          // 라이트: 흰색 배경/슬레이트 테두리 | 다크: 진회색 배경/어두운 테두리
          'border-slate-200 bg-white/50 backdrop-blur-sm',
          'dark:border-zinc-800 dark:bg-zinc-950/50',
        )}
      >
        <h2 className="text-foreground/60 mb-8 text-lg font-bold dark:text-zinc-500">
          도서 상세 정보
        </h2>

        <div className="flex flex-col gap-10 md:flex-row">
          {/* [도서 이미지 섹션] 책 표지를 보여주는 영역 */}
          <div
            className={cn(
              'relative flex w-full max-w-xs self-start overflow-hidden rounded-2xl border shadow-sm',
              // 라이트: 흰색 배경/슬레이트 테두리 | 다크: 진회색 배경/어두운 테두리
              'border-slate-100 bg-white',
              'dark:border-zinc-800 dark:bg-zinc-900',
            )}
          >
            <Image
              src={book.image}
              alt={book.title}
              width={320}
              height={480}
              priority
              className="object-contain p-4 transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* [정보 텍스트 섹션] 제목, 저자, 소개 등 텍스트 정보 영역 */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl leading-tight font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
                {book.title}
              </h3>
              <p className="text-lg font-medium text-slate-600 dark:text-zinc-400">
                {book.author} 저{' '}
                <span className="mx-2 text-slate-300 dark:text-zinc-700">
                  |
                </span>{' '}
                {book.publisher}
              </p>
            </div>

            {/* [메타 정보 태그] 출판일과 ISBN 정보 */}
            <div className="flex flex-wrap gap-2">
              <span
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs font-bold',
                  // 라이트: 파란색 테마 | 다크: 어두운 파란색 테마
                  'border-blue-100 bg-blue-50 text-blue-700',
                  'dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400',
                )}
              >
                출판일: {book.pubdate}
              </span>
              <span
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs font-bold',
                  // 라이트: 슬레이트 테마 | 다크: 진회색 테마
                  'border-slate-200 bg-slate-100 text-slate-700',
                  'dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
                )}
              >
                ISBN: {book.isbn}
              </span>
            </div>

            {/* [도서 소개 박스] 책에 대한 상세 설명 영역 */}
            <div
              className={cn(
                'rounded-2xl border p-8',
                // 라이트: 연한 배경 | 다크: 어두운 배경
                'border-slate-100 bg-slate-50/80',
                'dark:border-zinc-800/50 dark:bg-zinc-900/30',
              )}
            >
              <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-800 dark:text-zinc-200">
                <span className="h-4 w-1 rounded-full bg-blue-500" />
                도서 소개
              </h4>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-zinc-400">
                {book.description.length > 300
                  ? book.description.slice(0, 300) + '...'
                  : book.description}
              </p>
            </div>

            {/* [외부 링크 버튼] 네이버 도서로 연결되는 액션 버튼 */}
            <div className="pt-4">
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-block rounded-2xl px-8 py-4 font-bold transition-all duration-200',
                  // 라이트: 검정 배경/그림자 | 다크: 흰색 배경
                  'bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-95',
                  'dark:bg-zinc-100 dark:text-zinc-900 dark:shadow-none dark:hover:bg-zinc-200',
                )}
              >
                네이버 도서 정보 보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
