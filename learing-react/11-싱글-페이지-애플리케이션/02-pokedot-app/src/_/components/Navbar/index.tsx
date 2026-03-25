import S from './style.module.css'

export default function Navbar() {
  return (
    <nav className={S.navbar} aria-label="글로벌 내비게이션">
      {/* 외부 사이트는 <a> 사용 */}
      <a href="https://google.com" rel="noopener noreferrer" target="_blank">
        외부 사이트 (새로고침 발생)
      </a>

      {/* Link 컴포넌트를 사용해 `/` 경로로 이동 설정 : '홈으로 (새로고침 없음)' */}
    </nav>
  )
}
