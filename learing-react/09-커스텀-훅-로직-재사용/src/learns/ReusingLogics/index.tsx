import { useState } from 'react'
import S from './style.module.css'

export default function ReusingLogics() {
  
  // 중복 로직 1: Toggle (상세 정보용)
  const [isVisible, setIsVisible] = useState(true)

  const toggleVisible = () => {
    setIsVisible((prev) => !prev)
  }

  // 중복 로직 2: Toggle (다크 모드용)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  // 중복 로직 3: Input (사용자 이름용)
  const [name, setName] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const resetName = () => setName('')

  // 중복 로직 4: Input (이메일용)
  const [email, setEmail] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const resetEmail = () => setEmail('')

  const handleResetAll = () => {
    resetName()
    resetEmail()
  }

  return (
    <section className={`${S.container} ${isDarkMode ? S.dark : ''}`}>
      <header className={S.header}>
        <h2 className={S.title}>로직(Logic) 중복</h2>
        <p className={S.description}>
          동일한 형태의 useState와 핸들러가 반복되고 있습니다.
        </p>
      </header>

      <div className={S.card}>
        {/* 입력 그룹 */}
        <div className={S.inputGroup}>
          <label htmlFor="user-name" className={S.label}>
            사용자 이름
          </label>
          <input
            id="user-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
            className={S.input}
          />
        </div>

        <div className={S.inputGroup}>
          <label htmlFor="user-email" className={S.label}>
            이메일 주소
          </label>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
            className={S.input}
          />
        </div>

        <div className={S.resultBox}>
          <p className={S.resultText}>
            입력된 이름: <span>{name ?? '없음'}</span>
          </p>
          <p className={S.resultText}>
            입력된 이메일: <span>{email ?? '없음'}</span>
          </p>
        </div>

        {/* 버튼 그룹 */}
        <div role="group" className={S.actionGroup}>
          <button
            type="button"
            onClick={toggleVisible}
            className={S.buttonOutline}
          >
            상세 정보 {isVisible ? '숨기기' : '보기'}
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className={S.buttonOutline}
          >
            {isDarkMode ? '라이트 모드' : '다크 모드'}
          </button>
          <button
            type="button"
            onClick={handleResetAll}
            className={S.buttonGhost}
          >
            전체 초기화
          </button>
        </div>

        {isVisible && (
          <div aria-live="polite" className={S.infoBox}>
            <p>
              커스텀 훅(Custom Hook)을 사용하면 <code>useState</code> 훅과
              핸들러를 매번 만들 필요가 없습니다.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
