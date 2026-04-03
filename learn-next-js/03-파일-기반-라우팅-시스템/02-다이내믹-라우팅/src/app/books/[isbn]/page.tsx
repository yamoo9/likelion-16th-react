import { getBookByISBN } from "@/services/books"

interface Props {
  params: Promise<{ isbn: string }>
}

// [동적 세그먼트 (Dynamic Segment)]
export default async function BookDetailPage({ params }: Props) {
  const { isbn } = await params
  const book = await getBookByISBN(isbn)

  if (!book) {
    return <p role="alert">도서가 존재하지 않습니다.</p>
  }

  return (
    <section>
      <h1>도서 &ldquo;ISBN: {isbn}&rdquo; 상세 페이지</h1>
      <p>도서 이름 {book.title}</p>
    </section>
  )
}
