import { Link } from 'react-router-dom'
import NavLink from '../NavLink'
import S from './style.module.css'

export default function Navbar() {
  const user = null

  return (
    <nav className={S.navbar}>
      <div className={S.wrapper}>
        <h1 className={S.logo} lang="en">
          <Link to="/" className={S.homeLink} aria-label="무비 앱 홈">
            🎬 Movie App
          </Link>
        </h1>
        <ul className={S.navLinks}>
          <li>
            <NavLink to="/actors">배우</NavLink>
          </li>
          <li>
            {!user ? (
              <NavLink to="/login">로그인</NavLink>
            ) : (
              <NavLink to="/mypage">마이 페이지</NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
