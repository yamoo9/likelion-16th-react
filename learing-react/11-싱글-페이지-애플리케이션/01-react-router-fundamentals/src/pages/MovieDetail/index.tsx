import S from './style.module.css'


export default function MovieDetail() {
  const movie = null

  return (
    <div className={S.container}>
      <button type="button" aria-label="뒤로 가기" onClick={() => console.log('뒤로 가기')}>
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
