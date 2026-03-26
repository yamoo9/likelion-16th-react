import { useId, useState } from 'react'
import MovieSearchLogo from './parts/MovieSearchLogo'
import S from './style.module.css'

export interface ResponseMovieData {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export default function MovieSearch() {
  const searchId = useId()

  // loading
  // error
  const [data, setData] = useState<Movie[] | null>(null)

  const handleSearchMovie = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const searchQuery = (formData.get('searchQuery') ?? '') as string

    let endpoint = `${import.meta.env.VITE_TMDB_URL}/movie/popular?language=ko-KR`

    if (searchQuery.trim().length > 0) {
      endpoint = `${import.meta.env.VITE_TMDB_URL}/search/movie?query=${encodeURIComponent(searchQuery)}&language=ko-KR`
    }

    // 서버에 요청
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
        },
      })

      if (!response.ok) {
        throw new Error(
          `[에러 발생] ${response.status}: ${response.statusText}`,
        )
      }

      const responseData = (await response.json()) as ResponseMovieData
      setData(responseData.results)
    } catch (error) {
      console.error(error)
    } finally {
      formElement.reset()
    }
  }

  return (
    <div className={S.container}>
      <header className={S.searchHeader}>
        <h1 className={S.title} aria-label="영화 검색 서비스">
          <MovieSearchLogo />
        </h1>
        <form className={S.inputWrapper} onSubmit={handleSearchMovie}>
          <label htmlFor={searchId} className="sr-only">
            영화 제목
          </label>
          <input
            id={searchId}
            name="searchQuery"
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
        {data?.map((movie, i) => (
          <article
            key={i}
            className={S.movieCard}
            aria-labelledby={movie.id.toString()}
          >
            <div className={S.posterWrapper}>
              <div className={S.badgeGroup}>
                <span className={`${S.badge} ${S.rating}`}>
                  <span aria-label="평점">★</span> {movie.vote_average}
                  <span className="sr-only">점</span>
                </span>
                <span className={`${S.badge} ${S.lang}`}>
                  {movie.original_language}
                </span>
              </div>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-poster.png'}
                alt={
                  movie.poster_path ? `${movie.title} 포스터` : '포스터 준비중'
                }
              />
            </div>

            <div className={S.info}>
              <h3 id={movie.id.toString()} className={S.movieTitle}>
                {movie.title}
              </h3>
              <p className={S.overview}>
                {movie.overview ||
                  '영화에 대한 상세 설명이 이곳에 표시됩니다. 줄거리가 길어지면 말줄임표 처리가 되는지 확인해보세요.'}
              </p>

              <div className={S.footer}>
                <span>{movie.release_date.split('-').at(0)}</span>
                <span>리뷰 {movie.vote_count}개</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
