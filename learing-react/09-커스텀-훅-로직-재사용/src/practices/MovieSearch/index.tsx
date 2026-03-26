import { useEffect, useId } from 'react'

import { FetchStatus } from '@/components'
import { useDebounce, useFetch, useInput } from '@/hooks'

import type { ResponseMovieData } from './api/type'
import { getTmdbQuery, tmdbFetchOptions } from './api/getTmdbQuery'
import SkeletonMovieList from './parts/SkeletonMovieList'
import MovieSearchLogo from './parts/MovieSearchLogo'
import { getTmdbPoster } from './api/getTmdbPoster'

import S from './style.module.css'

export default function MovieSearch() {
  const searchId = useId()

  // useInput 훅을 사용해 사용자 입력 값을 상태로 관리 (로직 재사용)
  const searchInput = useInput('') // 이 값이 바뀌어도 서버에 요청하지 않음 (왜! 입력과 동시에 업데이트 될테니까)
  const searchTerm = searchInput.props.value

  // 디바운스(debounce) 검색
  // - 사용자 입력이 멈춘 후, 특정 시간이 지나도 다시 입력되지 않으면 그 때 서버에 요청
  const [debouncedSearch] = useDebounce(searchTerm, 1000)

  // 디바운스 처리 확인
  useEffect(() => {
    console.log({ debouncedSearch })
  }, [debouncedSearch])

  // useFetch 훅을 사용해 서버에 데이터 요청 (로직 재사용)
  const { isLoading, error, data, refetch } = useFetch<ResponseMovieData>({
    url: getTmdbQuery(debouncedSearch), // 인기 또는 검색된 영화 목록 요청 엔드포인트 반환
    options: tmdbFetchOptions,
  })

  const handleSearchMovie = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const searchQuery = (formData.get('searchQuery') ?? '') as string
    console.log(searchQuery)
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
            {...searchInput.props}
          />
          <button type="submit" className={S.searchButton}>
            검색
          </button>
        </form>
      </header>

      <FetchStatus
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        loadingFallback={<SkeletonMovieList count={8} />}
      >
        <div className={S.movieGrid}>
          {data?.results?.map((movie, i) => {
            const { poster, alt } = getTmdbPoster(movie)

            return (
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
                  <img src={poster} alt={alt} />
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
            )
          })}
        </div>
      </FetchStatus>
    </div>
  )
}
