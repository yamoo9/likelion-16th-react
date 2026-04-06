/**
 * [실습] 동적 세그먼트 (Dynamic Segment) 활용 및 데이터 바인딩
 *
 * 핵심 학습 목표
 * - URL 경로에 포함된 동적 파라미터(isbn, title 등) 추출 방법 습득
 * - 추출한 파라미터를 인자로 사용하여 특정 도서 정보(Service) 조회
 * - 서버 컴포넌트에서 비동기(Async)로 데이터를 불러와 화면에 렌더링
 *
 * 다루는 주요 데이터 (Dynamic Params)
 * - props.params: URL 경로 `/book/[isbn]`에서 `isbn` 값을 읽어옴
 * - Next.js 15+ 환경에서는 `await props.params`로 비동기 처리 필요
 *
 * 실습 미션
 * - 전달받은 ISBN 번호를 이용해 도서(book) 찾기
 * - 존재하지 않는 ISBN으로 접속 시 에러 처리 또는 '도서 없음' 메시지 표시
 * - 조회된 도서의 제목(title), 이미지(image), 설명(description) 등을 화면에 출력
 */

import { notFound } from 'next/navigation'
import { type Book, books } from '../data'

interface Props {
  params: Promise<{ isbn: Book['isbn'] }>
}

export default async function BookDetailPage({ params }: Props) {
  const { isbn } = await params

  // 화면에 표시할 도서 찾기
  const book = books.find(book => book.isbn === isbn)
  console.log(book) // 서버 컴포넌트 (터미널 콘솔 확인)

  // 도서가 없는 경우 (에러 표시 or 찾을 수 없음(Not Found) 페이지로 이동)
  if (!book) { notFound() }

  return (
    <section className="flex flex-col gap-2">
      {/* 도서의 제목 */}
      <h1 className="text-3xl font-black">{book.title}</h1>
      {/* 도서의 설명 */}
      <p>{book.description}</p>
      {/* 도서의 저자 */}
      <p className="text-lg font-medium">{book.author}</p>
      {/* 도서 이미지 */}
      <img src={book.image} alt={`${book.title} 도서 커버`} />
      {/* 도서의 고유 번호 */}
      <span>
        도서의{' '}
        <abbr
          className="cursor-help no-underline"
          title="Iternational Standard Book Number"
        >
          ISBN
        </abbr>
        : {isbn}
      </span>
    </section>
  )
}
