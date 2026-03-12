import S from './style.module.css'
import UserForm from './UserForm'

// 컴포넌트 인스턴스는 key를 기반으로 갱신되고 재사용됩니다.
// 인스턴스 = 설계도를 기반으로 생성된 객체
// 갱신 = 업데이트

export default function StateInitialization() {
  
  return (
    <div className={S.container}>
      <header className={S.header}>
        <h2>회원가입 (버전: {0})</h2>
        <button type="button" className={S.resetButton}>
          폼 초기화
        </button>
      </header>

      <UserForm />
    </div>
  )
}
