import { useTransition } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import useAuthStore from '@/stores/authStore'
import { useTrainerInfo } from '@/stores/collectionStore'
import { ThemeSwitcher } from '@/components'
import S from './style.module.css'
import { wait } from '@/utils'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const { isAuthenticated, isLoading, user, logout } = useAuthStore()
  const trainerInfo = useTrainerInfo()


  const handleLogout = () => {
    if (isPending) return

    startTransition(async () => {
      await wait(300) // 로그아웃 사용자 경험 테스트
      await logout()
      navigate('/')
    })
  }

  const { rank, emoji } = isAuthenticated ? trainerInfo : { rank: '', emoji: '' }

  return (
    <nav className={S.navbar} aria-label="메인 내비게이션">
      <div className={S.container}>
        {/* 로고: 왼쪽 고정 */}
        <h1 className={S.logo}>
          <Link to="/" aria-label="포케닷 홈으로 이동">
            <img src="/pokedot.svg" alt="포케닷 로고" width="140" height="32" />
          </Link>
        </h1>

        {/* 모든 메뉴와 유틸리티: 오른쪽 정렬 */}
        <div className={S.rightContent}>
          {!isLoading && isAuthenticated && (
            <div className={S.userGroup}>
              {/* 사용자 정보 */}
              <div className={S.userInfo} aria-label={`사용자 정보: ${user?.id}, 등급: ${rank}`}>
                <span className={S.username}>{user?.id}</span>
                <span className={S.rank} aria-hidden="true">({rank})</span>
              </div>

              {/* 마이 포켓박스 메뉴 */}
              <Link 
                to="/my" 
                className={S.navLink}
                aria-current={location.pathname === '/my' ? 'page' : undefined}
              >
                <span className={S.emoji} aria-hidden="true">{emoji}</span>
                <span className={S.linkText}>마이 포켓박스</span>
              </Link>
            </div>
          )}

          {/* 로그아웃/로그인 & 테마 스위처 */}
          <div className={S.utilGroup}>
            {!isLoading && isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className={S.logoutButton}
                aria-disabled={isPending}
              >
                {isPending ? '로그아웃 중...' : '로그아웃'}
              </button>
            ) : (
              !isLoading && (
                <Link to="/login" className={S.loginButton}>로그인</Link>
              )
            )}

            <div className={S.divider} aria-hidden="true" />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
