import { useInput, useToggle } from '@/hooks'
import S from './style.module.css'

export default function ReusingLogics() {
  const [isVisible, toggleVisible] = useToggle(true)
  const [isDarkMode, toggleDarkMode] = useToggle(false)

  // 간소화 버전 (simple)
  // const nameInput = useInputV1('')
  // const emailInput = useInputV1('')

  // { props, methods } 반환 버전 (advanced)
  // const nameInput = useInputV2('')
  // const emailInput = useInputV2('')
  
  const nameInput = useInput('')
  const emailInput = useInput('')

  const handleResetAll = () => {
    nameInput.methods.reset()
    emailInput.methods.reset()
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
            placeholder="이름을 입력하세요"
            className={S.input}
            {...nameInput.props}
          />
        </div>

        <div className={S.inputGroup}>
          <label htmlFor="user-email" className={S.label}>
            이메일 주소
          </label>
          <input
            id="user-email"
            type="email"
            placeholder="이메일을 입력하세요"
            className={S.input}
            {...emailInput.props}
          />
        </div>

        <div className={S.resultBox}>
          <p className={S.resultText}>
            입력된 이름: <span>{nameInput.props.value ?? '없음'}</span>
          </p>
          <p className={S.resultText}>
            입력된 이메일: <span>{emailInput.props.value ?? '없음'}</span>
          </p>
        </div>

        {/* 버튼 그룹 */}
        <div role="group" className={S.actionGroup}>
          <button
            type="button"
            onClick={() => {
              toggleVisible()
              emailInput.methods.select()
            }}
            className={S.buttonOutline}
          >
            상세 정보 {isVisible ? '숨기기' : '보기'}
          </button>
          <button
            type="button"
            onClick={() => {
              toggleDarkMode() 
              nameInput.methods.focus()
            }}
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
