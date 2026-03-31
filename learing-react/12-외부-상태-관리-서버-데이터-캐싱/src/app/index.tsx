import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import QueryProvider from '@/contexts/QueryProvider'
import { useAuthActions, useAuthLoading } from '@/stores/authStore'
import { ErrorFallback, GlobalModal, LoadingState, Navbar, ProtectedRoute } from '@/components'
import S from './style.module.css'
import '@/styles/main.css'

// 레이지 로딩 컴포넌트 정의
const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const PokemonDetailPage = lazy(() => import('@/pages/PokemonDetailPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const MyPage = lazy(() => import('@/pages/MyPage'))

export default function App() {
  const { checkAuth } = useAuthActions()
  const isAuthLoading = useAuthLoading() 
  const [isAppReady, setIsAppReady] = useState(false)

  // 초기화 로직을 useCallback으로 감싸 불필요한 재생성 방지
  const initializeApp = useCallback(async () => {
    try {
      await checkAuth()
    } finally {
      setIsAppReady(true)
    }
  }, [checkAuth])

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  // 초기 앱 준비 상태(인증 확인 중) 처리
  if (!isAppReady || isAuthLoading) {
    return <LoadingState message="사용자 정보를 확인하고 있습니다..." />
  }

  return (
    <QueryProvider>
      <BrowserRouter>
        <div className={S.container}>
          <Navbar />
          <main className={S.main}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {/* Suspense를 Routes 바로 바깥에 배치하여 페이지 전환 시에만 로딩 표시 */}
              <Suspense fallback={<LoadingState message="페이지를 불러오는 중입니다..." />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
                  <Route
                    path="/my"
                    element={
                      <ProtectedRoute>
                        <MyPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
        <GlobalModal />
      </BrowserRouter>
    </QueryProvider>
  )
}