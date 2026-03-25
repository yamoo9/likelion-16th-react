import MyLink from '../MyLink'
import S from './style.module.css'

export default function Navbar() {
  const user = null

  return (
    <nav className={S.navbar}>
      <div className={S.wrapper}>
        <h1 className={S.logo} lang="en">🎬 Movie App</h1>
        <ul className={S.navLinks}>
          <li>
            <MyLink to="/">홈</MyLink>
          </li>
          <li>
            <MyLink to="/actors">배우</MyLink>
          </li>
          <li>
            {!user ? (
              <MyLink to="/login">로그인</MyLink>
            ) : (
              <MyLink to="/mypage">마이 페이지</MyLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

