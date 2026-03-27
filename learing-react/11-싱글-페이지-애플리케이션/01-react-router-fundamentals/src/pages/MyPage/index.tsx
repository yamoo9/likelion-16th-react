import S from './style.module.css'

export default function MyPage() {

  const user = null

  if (user) {
    return (
      <p role="status">인증된 사용자만 이용할 수 있습니다.</p>
    )
  }

  return (
    <div className={S.container}>
      <section className={S.profileCard}>
        <div className={S.avatar}>{user?.email?.[0].toUpperCase() || 'U'}</div>

        <div className={S.info}>
          <h1 className={S.title}>마이 페이지</h1>
          <p className={S.welcome}>
            안녕하세요! <span className={S.email}>{user?.email}</span>님!
          </p>
          <p className={S.description}>
            무비 앱의 회원이 되신 것을 환영합니다. <br />
            여기서 시청 기록과 선호하는 영화를 관리할 수 있습니다.
          </p>
        </div>

        <div className={S.stats}>
          <div className={S.statItem}>
            <span className={S.statValue}>12</span>
            <span className={S.statLabel}>본 영화</span>
          </div>
          <div className={S.statItem}>
            <span className={S.statValue}>5</span>
            <span className={S.statLabel}>보고싶은 영화</span>
          </div>
        </div>

        <button type="button" className={S.logoutButton} onClick={() => console.log('로그아웃')}>
          로그아웃
        </button>
      </section>
    </div>
  )
}
