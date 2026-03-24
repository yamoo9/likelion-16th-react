import { useState, useEffect } from 'react'
import S from './BookDetailSection.module.css'
import { formatDate } from '@/utils'

// API 참고
// - https://koreandummyjson.vercel.app/docs/books

export interface ResponseBookData {
  message: string
  book: Book
}

export interface Book {
  id: number
  author: string
  genre: string
  title: string
  publicationDate: string
  totalPage: number
}

export interface ResponseReviewData {
  message: string
  reviews: Review[]
}

export interface Review {
  id: number
  rating: number
  content: string
  createdAt: string
  userId: number
  bookId: number
}

const getEndpoint = (path: string) => {
  return `${import.meta.env.VITE_API_URL}${path}`
}

export default function BookDetailSection() {
  const [bookId, setBookId] = useState(1)

  // 중복 로직 1: 도서 정보 가져오기
  const [book, setBook] = useState<Book | null>(null)
  const [isBookLoading, setIsBookLoading] = useState(false)
  const [bookError, setBookError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchBook = async () => {
      setIsBookLoading(true)
      setBookError(null)
      try {
        const res = await fetch(getEndpoint(`/api/books/${bookId}`), { signal })
        if (!res.ok) throw new Error('도서 정보를 가져오지 못했습니다.')
        const data = (await res.json()) as ResponseBookData
        setBook(data.book)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        setBookError(err instanceof Error ? err.message : '에러 발생')
      } finally {
        if (!signal.aborted) setIsBookLoading(false)
      }
    }

    fetchBook()
    return () => controller.abort()
  }, [bookId])

  // 중복 로직 2: 리뷰 목록 가져오기
  const [reviews, setReviews] = useState<Review[]>([])
  const [isReviewLoading, setIsReviewLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchReviews = async () => {
      setIsReviewLoading(true)
      try {
        const res = await fetch(getEndpoint(`/api/books/${bookId}/reviews`), {
          signal,
        })
        if (!res.ok) throw new Error('리뷰를 가져오지 못했습니다.')
        const data = (await res.json()) as ResponseReviewData
        setReviews(data.reviews)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return
        console.error(err)
      } finally {
        if (!signal.aborted) setIsReviewLoading(false)
      }
    }

    fetchReviews()
    return () => controller.abort()
  }, [bookId])

  return (
    <div className={S.container}>
      <header className={S.header}>
        <h2 className={S.title}>도서 상세 정보</h2>
        <div className={S.pagination}>
          <button
            type="button"
            aria-disabled={bookId < 2}
            className={S.navButton}
            aria-label="이전 도서 정보로 이동"
            title="이전 도서 정보로 이동"
            onClick={() => {
              if (bookId < 2) return
              setBookId((bookId) => Math.max(1, bookId - 1))
            }}
          >
            ←
          </button>
          <span className={S.idBadge}>도서 번호: {bookId}</span>
          <button
            type="button"
            className={S.navButton}
            aria-label="다음 도서 정보로 이동"
            title="다음 도서 정보로 이동"
            onClick={() => setBookId((bookId) => bookId + 1)}
          >
            →
          </button>
        </div>
      </header>

      <div className={S.contentGrid}>
        <article className={S.card}>
          {isBookLoading ? (
            <div role="status" className={S.skeleton}>
              도서 정보를 불러오는 중...
            </div>
          ) : bookError ? (
            <div role="alert" className={S.errorBox}>
              {bookError}
            </div>
          ) : (
            book && (
              <div className={S.bookInfo}>
                <span className={S.genreTag}>{book.genre}</span>
                <h3 className={S.bookTitle}>{book.title}</h3>
                <p className={S.author}>✍️ 저자: {book.author}</p>
                <div className={S.metaInfo}>
                  <span>출판일: {formatDate(book.publicationDate)}</span>
                  <span>페이지: {book.totalPage}P</span>
                </div>
              </div>
            )
          )}
        </article>

        <aside className={S.card}>
          <h4 className={S.sectionLabel}>독자 리뷰 ({reviews.length})</h4>
          {isReviewLoading ? (
            <div className={S.skeleton}>리뷰 로딩 중...</div>
          ) : (
            <ul className={S.reviewList}>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <li key={review.id} className={S.reviewItem}>
                    <div className={S.reviewHeader}>
                      <span className={S.userName}>리뷰 #{review.userId}</span>
                      <span className={S.rating}>
                        ⭐ {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className={S.reviewContent}>{review.content}</p>
                    <time className={S.reviewDate}>
                      {formatDate(review.createdAt)}
                    </time>
                  </li>
                ))
              ) : (
                <p className={S.empty}>아직 등록된 리뷰가 없습니다.</p>
              )}
            </ul>
          )}
        </aside>
      </div>
    </div>
  )
}
