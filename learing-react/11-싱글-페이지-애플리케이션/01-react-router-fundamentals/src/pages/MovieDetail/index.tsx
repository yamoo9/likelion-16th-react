import { useNavigate, useParams } from 'react-router-dom'
import S from './style.module.css'
import { useMovies } from '@/contexts'
import { useEffect } from 'react'
import AppTitle from '@/components/AppTitle'

export default function MovieDetail() {
  // 페이지 이동을 위해 navigate 함수 꺼내기
  const navigate = useNavigate()

  // URL 주소에서 영화 ID 정보 가져오기
  const { movieId } = useParams()

  // 영화 프로바이더로 공급된 영화 정보 가져오기
  const { movies } = useMovies()

  // 영화 찾기
  const movie = movies.find((movie) => movie.id === movieId)

  // 만약 영화가 없다면?
  // 이펙트 사용해 렌더링 이후에 404 Not Found 페이지 이동
  useEffect(() => {
    if (!movie) navigate('/not-found-movie')
  }, [movie, navigate])

  // 뒤로가기 기능
  const handleGoBack = () => navigate(-1)

  return (
    <div className={S.container}>
      <AppTitle subTitle={movie?.title} />

      <button type="button" aria-label="뒤로 가기" onClick={handleGoBack}>
        ← Back
      </button>

      <h1>영화 정보</h1>
      {!movie ? (
        <p>영화 정보 없음</p>
      ) : (
        <>
          <ul>
            <li>ID: {movie?.id}</li>
            <li>
              {movie?.title} ({movie?.year})
            </li>
          </ul>
          <p>상세 정보를 불러오는 중...</p>
        </>
      )}
    </div>
  )
}
