import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CommonLayout from './layouts/CommonLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import MovieDetail from './pages/MovieDetail'
import NotFound from './pages/NotFound'
import MyPage from './pages/MyPage'

export default function App() {
  return (
    <BrowserRouter>
      {/* 
        라우츠(routes) 스위치 -> 라우트(route) path, element 

        레이아웃 <- 페이지

        '/'                -> 페이지 <Home />
        '/login'           -> 페이지 <Login />
        '/movies/:movieId/:release' -> 페이지 <MovieDetail /> 
        '/my'              -> 페이지 <MyPage />
        '*'                -> 페이지 <NotFound />

      */}
      <Routes>
        {/* 공통 레이아웃 */}
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
        
        {/* 레이아웃 없음 */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
