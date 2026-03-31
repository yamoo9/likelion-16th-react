import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
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
  const isAuthLoading = useAuthLoading() 
  const [isAppReady, setIsAppReady] = useState(false)

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
              <Suspense fallback={<LoadingState message="페이지를 불러오는 중입니다..." />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
                  <Route path="/my" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
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