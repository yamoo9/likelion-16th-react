/* eslint-disable @typescript-eslint/no-unused-vars */

import { useTransition } from 'react'

import { useCollection } from '@/contexts/CollectionContext'
import { useAuth } from '@/contexts/AuthContext'
import { ThemeSwitcher } from '@/components'
import S from './style.module.css'

/**
 * [공통 UI: Navbar 컴포넌트]
 * - 앱의 상단 네비게이션 바를 담당합니다.
 * - 로그인 상태에 따라 메뉴(마이 포켓박스, 로그인/로그아웃)를 동적으로 변경합니다.
 */
export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  
  /* 
    [트랜지션 설정]
    - 로그아웃과 같은 상태 업데이트가 일어날 때 UI가 멈추지 않도록 '낮은 우선순위'로 처리합니다.
    - isPending 상태를 통해 로그아웃 처리 중 버튼을 비활성화하거나 로딩 표시를 할 수 있습니다.
  */
  const [isPending, startTransition] = useTransition()
  
  const { getTrainerInfo } = useCollection()

  /* 
    [현재 경로 감지]
    - useLocation: 현재 브라우저의 URL 정보를 가져옵니다.
    - location.pathname을 확인하여 현재 메뉴가 활성화되었는지(Active) 판단할 때 사용합니다.
    - 참고: https://reactrouter.com/api/hooks/useLocation
  */
  const location = undefined

  const handleLogout = () => {
    if (isPending) return
    // 로그아웃 처리를 트랜지션으로 감싸서 부드러운 UI 전환을 유도합니다.
    // 상태 업데이트 로직을 트랜지션으로 감쌉니다.
    startTransition(async () => {
      await logout()
    })
  }

  // 로그인 상태일 때만 트레이너 정보(랭크, 이모지)를 계산합니다.
  const { rank, emoji } = isAuthenticated
    ? getTrainerInfo()
    : { rank: '', emoji: '' }

  return (
    <nav className={S.navbar} aria-label="메인 내비게이션">
      <div className={S.container}>
        {/* 
          [로고 영역] 
          - Link 컴포넌트를 사용하여 홈('/')으로 이동 시 새로고침 없이 전환합니다.
          - 참고: https://reactrouter.com/api/components/Link
        */}
        <h1 className={S.logo}>
          <a href="/" aria-label="포케닷 홈으로 이동">
            <img src="/pokedot.svg" alt="포케닷 로고" width="140" height="32" />
          </a>
        </h1>

        <div className={S.rightContent}>
          {/* [인증 기반 조건부 렌더링]: 로그인했을 때만 보여주는 메뉴 */}
          {isAuthenticated && (
            <div className={S.userGroup}>
              
              {/* 사용자 정보 표시 */}
              <div className={S.userInfo} aria-label={`사용자 정보: ${user?.id}, 등급: ${rank}`}>
                <span className={S.username}>{user?.id}</span>
                <span className={S.rank} aria-hidden="true">({rank})</span>
              </div>
              
              {/* 
                [현재 페이지 표시 (Active Link)]
                - aria-current: 현재 위치한 페이지의 링크임을 스크린 리더에 알립니다.
                - location.pathname을 비교하여 시각적인 활성화 상태를 제어할 수 있습니다.
              */}
              <a
                href="/my" 
                className={S.navLink}
                // aria-current={location.pathname === '/my' ? 'page' : undefined}
              >
                <span className={S.emoji} aria-hidden="true">{emoji}</span>
                <span className={S.linkText}>마이 포켓박스</span>
              </a>
            </div>
          )}

          {/* 로그아웃/로그인 & 테마 설정 그룹 */}
          <div className={S.utilGroup}>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className={S.logoutButton}
                disabled={isPending} // 로그아웃 처리 중 중복 클릭 방지
              >
                {isPending ? '...' : '로그아웃'}
              </button>
            ) : (
              // Link 컴포넌트로 교체하세요.
              <a href="/login" className={S.loginButton}>로그인</a>
            )}

            <div className={S.divider} aria-hidden="true" />
            
            {/* 다크모드/라이트모드 전환 컴포넌트 */}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
