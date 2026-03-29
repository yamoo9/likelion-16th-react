
/* 
  [SPA :: React Router 리마인드]
  
  브라우저 라우터 구성

    라우츠(routes) 스위치 → 라우트(route) path, element 

    레이아웃 ← 페이지                                 (레이아웃 라우트, 중첩된 라우트)

      '/'                → 페이지 <Home />          (인덱스 라우트)
      '/login'           → 페이지 <Login />
      '/movies/:movieId' → 페이지 <MovieDetail />   (동적 세그먼트)
      '/my'              → 페이지 <MyPage />        (보호된 라우트)             
      '*'                → 페이지 <NotFound />      (와일드 카드)

*/

export default function App() {
  return (
    <></>
  )
}
