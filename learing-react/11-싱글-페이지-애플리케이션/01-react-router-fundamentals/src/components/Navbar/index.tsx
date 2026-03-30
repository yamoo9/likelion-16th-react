import { Link } from 'react-router-dom'

import { NAVIGATION_PATH } from '@/configs/navigationPaths'
import { useAuth } from '@/contexts'
import NavLink from '../NavLink'
import S from './style.module.css'

export default function Navbar() {

  // 인증 사용자 정보 가져오기
  const { user } = useAuth()

  return (
    <nav className={S.navbar}>
      <div className={S.wrapper}>
        <h1 className={S.logo} lang="en">
          <Link
            to={NAVIGATION_PATH.base}
            className={S.homeLink}
            aria-label="무비 앱 홈"
          >
            🎬 Movie App
          </Link>
        </h1>
        <ul className={S.navLinks}>
          <li>
            <NavLink to={NAVIGATION_PATH.actors}>배우</NavLink>
          </li>
          <li>
            {!user ? (
              <NavLink to={NAVIGATION_PATH.login}>로그인</NavLink>
            ) : (
              <NavLink to={NAVIGATION_PATH.mypage}>마이 페이지</NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
