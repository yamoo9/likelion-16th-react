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

// 내비게이션 경로 (상수)
import { NAVIGATION_PATH } from './configs/navigationPaths'

// 컨텍스트 프로바이더
import { AuthProvider, MoviesProvider } from './contexts'

// 공용 레이아웃
import CommonLayout from './layouts/CommonLayout'

// 페이지
import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetail from './pages/MovieDetail'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFound'

// 페이지 전환 시, 스크롤 위치를 페이지 상단으로 이동
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    // 인증 프로바이더(공급자)
    <AuthProvider>
      {/* 영화 프로바이더(공급자) */}
      <MoviesProvider>
        {/* 라우터 프로바이더(공급자) */}
      <BrowserRouter>
        <Routes>
          {/* 레이아웃 라우트 */}
          <Route path={NAVIGATION_PATH.base} element={<CommonLayout />}>
            {/* 중첩된, 인덱스 라우트 */}
            <Route index element={<Home />} />
            {/* 경로(path)를 가지는 라우트 */}
            <Route path={NAVIGATION_PATH.login} element={<Login />} />
            {/* 다이내믹 세그먼트 라우트 */}
            <Route path={`${NAVIGATION_PATH.movies}/:movieId`} element={<MovieDetail />} />
            {/* 프로텍티드 라우트 */}
            <Route path={NAVIGATION_PATH.mypage} element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
            {/* 보호된 라우트 예시 (예: 배우들) */}
            {/* <Route path={NAVIGATION_PATH.actors} element={<ProtectedRoute><div>배우들</div></ProtectedRoute>} /> */}
            {/* 와일드 카드 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
      </MoviesProvider>
    </AuthProvider>
  )
}
