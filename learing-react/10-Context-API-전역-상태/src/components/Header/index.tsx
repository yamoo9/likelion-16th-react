import S from './style.module.css'

export default function Header() {
  
  return (
    <header className={S.header}>
      <div className={S.headerInner}>
        <h1 className={S.logo} aria-label="인증 마스터">AuthMaster</h1>
        <nav className={S.nav}>
          <a href="#" className={S.navLink}>
            대시보드
          </a>
          <a href="#" className={S.navLink}>
            설정
          </a>
        </nav>
      </div>
    </header>
  )
}
