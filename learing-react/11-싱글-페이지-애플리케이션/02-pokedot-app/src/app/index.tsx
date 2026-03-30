import { Route, Routes } from 'react-router'

import AppProvider from '@/contexts/AppContext'
import { Navbar } from '@/components'

import S from './style.module.css'
import '@/styles/main.css'


import { NAVIGATION } from '@/config/paths'
import HomePage from '@/pages/HomePage'

export default function App() {
  return (
    // AppProvider를 사용해 프로바이더 래퍼 헬 문제를 해결해보세요.
    <AppProvider>
      <div className={S.container}>
        {/* 앱 내비게이션 컴포넌트를 추가합니다. */}
        <Navbar />
        <main>
          {/* 
            앱 라우트(routes)를 구성합니다.
            - src/pages 폴더의 페이지 컴포넌트를 확인하세요.
          */}
          <Routes>
            <Route path={NAVIGATION.home} element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}
