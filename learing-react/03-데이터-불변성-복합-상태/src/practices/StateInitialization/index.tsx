import { useState } from 'react'
import S from './style.module.css'
import UserForm from './UserForm'

// 부모(상위) 컴포넌트
export default function StateInitialization() {
  const [resetComponent, setResetComponent] = useState('')

  return (
    <div className={S.container}>
      <header className={S.header}>
        <h2>
          회원가입 <span>(컴포넌트 초기화 Key: {resetComponent})</span>
        </h2>
        <button
          type="button"
          className={S.resetButton}
          onClick={() => setResetComponent(resetComponent + '🌈')}
        >
          폼 초기화
        </button>
      </header>

      {/* 자식(하위) 컴포넌트
          이 내부의 상태에 접근 불가능
          그러면 어떻게 하위 컴포넌트의 상태를 초기화할 수 있을까? */}
      <UserForm key={resetComponent} />
    </div>
  )
}
