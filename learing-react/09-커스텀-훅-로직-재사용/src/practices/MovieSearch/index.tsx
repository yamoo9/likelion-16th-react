import { useId } from 'react'
import MovieSearchLogo from './parts/MovieSearchLogo'
import S from './style.module.css'

export default function MovieSearch() {
  const searchId = useId()

  return (
    <div className={S.container}>
      <header className={S.searchHeader}>
        <h1 className={S.title} aria-label="영화 검색 서비스">
          <MovieSearchLogo />
        </h1>
         <form className={S.inputWrapper}>
          <label htmlFor={searchId} className="sr-only">영화 제목</label>
          <input 
            id={searchId} 
            type="search" 
            placeholder="영화 제목으로 검색하세요." 
            aria-label="영화 검색어 입력"
            autoComplete="off"
          />
          <button type="submit" className={S.searchButton}>
            검색
          </button>
        </form>
      </header>

      <div className={S.movieGrid}>
        {/* 템플릿 */}
        {Array.from({length: 4}).map((_, i) => (
          <article key={i} className={S.movieCard} aria-labelledby={'movie.id'}>
            <div className={S.posterWrapper}>
              <div className={S.badgeGroup}>
                <span className={`${S.badge} ${S.rating}`}>
                  <span aria-label="평점">★</span> 0.0<span className="sr-only">점</span>
                </span>
                <span className={`${S.badge} ${S.lang}`}>
                  ko
                </span>
              </div>
              <img
                src="/no-poster.png"
                alt="포스터 준비중"
              />
            </div>

            <div className={S.info}>
              <h3 id={'movie.id'} className={S.movieTitle}>영화 제목</h3>
              <p className={S.overview}>
                영화에 대한 상세 설명이 이곳에 표시됩니다. 
                줄거리가 길어지면 말줄임표 처리가 되는지 확인해보세요.
              </p>

              <div className={S.footer}>
                <span>2026</span>
                <span>리뷰 0개</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
