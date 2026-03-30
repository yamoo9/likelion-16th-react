import { useNavigate } from 'react-router-dom'
import S from './style.module.css'
import AppTitle from '@/components/AppTitle'

export default function NotFound() {
  // 프로그래밍 방식으로 내비게이션
  const navigate = useNavigate()

  const handleGoHome = () => navigate('/') // 홈으로 탐색 기능
  const handleGoBack = () => navigate(-1) // 뒤로가기 탐색 기능

  return (
    <section className={S.container}>
      <AppTitle subTitle="페이지 없음" />
      <div className={S.content}>
        <h1 className={S.errorCode}>404</h1>
        <h2 className={S.title}>페이지를 찾을 수 없습니다</h2>
        <p className={S.description}>
          존재하지 않는 주소이거나, 페이지가 이동되었을 수 있습니다. <br />
          입력하신 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
        <div className={S.actions}>
          <button type="button" className={S.homeButton} onClick={handleGoHome}>
            홈 페이지로 이동
          </button>
          <button type="button" className={S.backButton} onClick={handleGoBack}>
            이전 페이지로 이동
          </button>
        </div>
      </div>
    </section>
  )
}
