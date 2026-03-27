import { useAuth } from '@/contexts'
import S from './style.module.css'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className={S.header}>
      <div className={S.headerInner}>
        <h1 className={S.logo} aria-label="인증 마스터">
          {!user ? 'AuthMaster' : user.name}
        </h1>
        <nav className={S.nav}>
          <a href="#" className={S.navLink}>
            대시보드
          </a>
          <a href="#" className={S.navLink}>
            설정
          </a>
          <button
            type="button"
            onClick={logout}
            aria-disabled={!user}
            className={S.button}
          >
            로그아웃
          </button>
        </nav>
      </div>
    </header>
  )
}
