import { notFound } from 'next/navigation'
import { Book, books } from '../../_resources/data'

interface Props {
  params: Promise<{
    title: Book['title']
    pubdate: Book['pubdate']
  }>
}

export default async function BookDetailPage({ params }: Props) {
  const { pubdate, title } = await params
  const decodedTitle = decodeURIComponent(title)

  // 제목과 출간일로 도서 찾기
  const book = books.find(
    (book) => book.title === decodedTitle && book.pubdate === pubdate,
  )

  // 서버에서 찾은 도서가 있는지 여부 확인
  console.log(book)

  // 도서를 찾을 수 없으면 Not Found 페이지로 이동
  if (!book) notFound()

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
        : {book.isbn}
      </span>
    </section>
  )
}
