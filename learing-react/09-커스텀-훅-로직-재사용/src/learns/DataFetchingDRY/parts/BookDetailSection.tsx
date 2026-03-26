import { useState } from 'react'
import { formatDate } from '@/utils'
import { useFetch } from '@/hooks'
import type { ResponseBookData, ResponseReviewsData } from '../types/book'
import { getEndpoint } from '../util/getEndpoint'
import S from './BookDetailSection.module.css'

export default function BookDetailSection() {
  const [bookId, setBookId] = useState(1)

  const bookResponse = useFetch<ResponseBookData>({
    url: getEndpoint(`/api/books/${bookId}`),
    dependencies: [bookId],
  })

  const book = bookResponse.data?.book // 서버에서 가져온 도서 데이터


  const reviewsResponse = useFetch<ResponseReviewsData>({
    url: getEndpoint(`/api/books/${bookId}/reviews`),
    dependencies: [bookId],
  })
  
  const reviews = reviewsResponse.data?.reviews // 서버에서 가져온 리뷰 리스트 데이터

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
          {bookResponse.isLoading ? (
            <div role="status" className={S.skeleton}>
              도서 정보를 불러오는 중...
            </div>
          ) : bookResponse.error ? (
            <div role="alert" className={S.errorBox}>
              {bookResponse.error.message}
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
          <h4 className={S.sectionLabel}>독자 리뷰 ({reviews?.length})</h4>
          {reviewsResponse.isLoading ? (
            <div className={S.skeleton}>리뷰 로딩 중...</div>
          ) : reviewsResponse.error ? (
            <div role="alert" className={S.errorBox}>
              {reviewsResponse.error.message}
            </div>
          ) : (
            <ul className={S.reviewList}>
              {reviews ? (
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
