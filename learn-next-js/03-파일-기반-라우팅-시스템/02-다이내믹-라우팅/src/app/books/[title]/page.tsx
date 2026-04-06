import { notFound } from "next/navigation"
import { Book, books } from "../_resources/data"

interface Props {
  params: Promise<{ title: Book['title'] }>
}

export default async function BookDetailPage({ params }: Props) {

  const title = (await params).title
  console.log(title) // 인코딩(encoding)된 도서 제목
  
  const decodedTitle = decodeURIComponent(title) 
  console.log(decodedTitle) // 디코딩(decoding)된 도서 제목

  // 제목으로 도서 찾기
  const book = books.find((book) => book.title === decodedTitle)

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
