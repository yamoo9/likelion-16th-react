import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* 

[SPA :: React Router 리마인드]

브라우저 라우터 구성

라우츠(routes) 스위치 → 라우트(route) path, element 

레이아웃 ← 페이지                                 (레이아웃 라우트, 중첩된 라우트)

'/'                → 페이지 <Home />          (인덱스 라우트)
'/login'           → 페이지 <Login />
'/movies/:movieId' → 페이지 <MovieDetail />   (동적 세그먼트: Dynamic Segments)
'/my'              → 페이지 <MyPage />        (보호된 라우트)             
'*'                → 페이지 <NotFound />      (와일드 카드)

*/

// 컨텍스트 프로바이더
import { MoviesProvider } from './contexts'

// 공용 레이아웃
import CommonLayout from './layouts/CommonLayout'

// 페이지
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetail from './pages/MovieDetail'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <MoviesProvider>
      <BrowserRouter>
        <Routes>
          {/* 레이아웃 라우트 */}
          <Route path="/" element={<CommonLayout />}>
            {/* 중첩된, 인덱스 라우트 */}
            <Route index element={<Home />} />
            {/* 경로(path)를 가지는 라우트 */}
            <Route path="/login" element={<Login />} />
            {/* 다이내믹 세그먼트 라우트 */}
            <Route path="/movies/:movieId" element={<MovieDetail />} />
            {/* 프로텍티드 라우트 */}
            <Route path="/my" element={<MyPage />} />
            {/* 와일드 카드 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MoviesProvider>
  )
}
