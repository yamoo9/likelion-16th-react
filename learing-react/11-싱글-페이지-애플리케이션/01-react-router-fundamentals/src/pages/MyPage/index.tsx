import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts'
import S from './style.module.css'
import AppTitle from '@/components/AppTitle'

export default function MyPage() {

  // 사용자 정보 가져오기
  // 로그아웃 기능 가져오기
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  // 이벤트 핸들러 (부수 효과 처리 가능)
  // 이펙트 (부수 효과 처리 가능)
  const handleLogout = () => {
    console.log('홈 페이지로 이동')
    navigate('/')
    console.log('로그아웃')
    setTimeout(logout, 50) // 0.05초 뒤에 로그아웃
  }

  const nickname = user?.email.split('@').at(0)

  return (
    <div className={S.container}>
      <AppTitle subTitle={`${nickname}의 페이지`} />
      <section className={S.profileCard}>
        <div className={S.avatar}>{user?.email?.[0].toUpperCase() || 'U'}</div>

        <div className={S.info}>
          <h1 className={S.title}>마이 페이지</h1>
          <p className={S.welcome}>
            안녕하세요! <span className={S.email}>{nickname}</span>님!
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

        <button type="button" className={S.logoutButton} onClick={handleLogout}>
          로그아웃
        </button>
      </section>
    </div>
  )
}
