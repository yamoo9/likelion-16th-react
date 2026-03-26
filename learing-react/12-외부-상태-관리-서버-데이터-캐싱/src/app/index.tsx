import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import QueryProvider from '@/contexts/QueryProvider'
import { useAuthActions, useAuthLoading } from '@/stores/authStore'
import { ErrorFallback, GlobalModal, LoadingState, Navbar, ProtectedRoute } from '@/components'
import S from './style.module.css'
import '@/styles/main.css'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const PokemonDetailPage = lazy(() => import('@/pages/PokemonDetailPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const MyPage = lazy(() => import('@/pages/MyPage'))

export default function App() {
  const { checkAuth } = useAuthActions()
  const isLoading = useAuthLoading() // 인증 확인 로딩 상태
  const [isAppReady, setIsAppReady] = useState(false)

  useEffect(() => {
    const initializeApp = async () => {
      await checkAuth() // 인증 확인
      setIsAppReady(true) // 앱 준비 완료
    }

    initializeApp()
  }, [checkAuth])

  return (
    <QueryProvider>
      <BrowserRouter>
        <div className={S.container}>
          {/* 내비게이션은 항상 렌더링 */}
          <Navbar />
          <main className={S.main}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {isLoading || !isAppReady ? (
                // 인증 확인 중 또는 Suspense 로딩 중일 때 로딩 화면 표시
                <LoadingState message="페이지 로딩 중..." />
              ) : (
                <Suspense fallback={<LoadingState message="페이지 로딩 중..." />}>
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
              )}
            </ErrorBoundary>
          </main>
        </div>
        <GlobalModal />
      </BrowserRouter>
    </QueryProvider>
  )
}
