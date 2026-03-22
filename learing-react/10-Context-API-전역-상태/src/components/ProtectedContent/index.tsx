import S from './style.module.css'

interface Props {
  user?: { name: string } | null
}

export default function ProtectedContent({ user }: Props) {
  
  const handleLogout = () => {
    // 로그아웃 처리합니다. (동기 또는 비동기 방식 검토)
  }

  return (
    <section className={S.card}>
      <h2 className={S.title}>인증 시스템</h2>
      <p className={S.description}>
        Context API와 커스텀 훅을 활용한 전역 인증 상태를 관리합니다.
      </p>

      <div className={S.grid}>
        <article className={`${S.statusBox} ${user ? S.statusActive : ''}`}>
          <h3 className={S.statusTitle}>{user ? '인증 완료' : '인증 필요'}</h3>
          <p>
            {user
              ? `"${user.name}"님으로 로그인되었습니다.`
              : '로그인 상태에 따라 이 문구가 바뀝니다.'}
          </p>
          <button
            type="button"
            className={S.logoutButton}
            onClick={handleLogout}
            aria-disabled={!user}
          >
            {/* 비동기 방식으로 로그아웃 처리할 경우, 레이블 조건부 렌더링 */}
            로그아웃
          </button>
        </article>

        <article className={S.statusBox}>
          <h3 className={S.statusTitle}>실습 주제</h3>
          <ul className={S.statusList}>
            <li>AuthProvider 전역 상태 공급</li>
            <li>useAuth 커스텀 훅 설계</li>
          </ul>
        </article>
      </div>

      {user && (
        <div className={S.debugSection}>
          <p className={S.debugHeadline}>디버깅: 유저 세션 정보</p>
          <pre className={S.codeBlock}>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}
