import styles from '../RefStudy.module.css'

export default function DomFocusControl() {
  // TODO 1: DOM 요소(input, div)를 참조하기 위한 Ref를 각각 생성하세요.
  // 로직 작성

  // TODO 2: input 요소에 포커스를 주는 함수를 작성하세요.
  const handleFocus = () => {
    // 로직 작성
  }

  // TODO 3: scrollBoxRef가 참조하는 요소의 스크롤을 맨 위(top: 0)로 이동시키세요.
  const scrollToTop = () => {
    // 로직 작성
  }

  // TODO 4: scrollBoxRef가 참조하는 요소의 스크롤을 맨 아래로 이동시키세요.
  const scrollToBottom = () => {
    // 로직 작성
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>3. DOM 직접 제어 (Focus & Scroll)</h3>

      {/* 포커스 제어 영역 */}
      <div className={styles.inputGroup}>
        {/* TODO 5: 위에서 만든 inputRef를 이 input 요소에 연결하세요. */}
        <input
          type="text"
          className={styles.input}
          placeholder="여기에 초점이 이동됩니다."
        />
        <button
          type="button"
          className={`${styles.button} ${styles.primary}`}
          onClick={handleFocus}
        >
          초점 이동
        </button>
      </div>

      {/* 스크롤 제어 영역 */}
      <div className={styles.scrollContainer}>
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.button} onClick={scrollToTop}>
            맨 위로 ▲
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={scrollToBottom}
          >
            맨 아래로 ▼
          </button>
        </div>

        {/* TODO 6: 위에서 만든 scrollBoxRef를 이 div 요소에 연결하세요. */}
        <div className={styles.scrollBox}>
          <div className={styles.scrollContent}>
            <p>📜 스크롤 테스트 영역입니다.</p>
            <p>내용이 아주 길어요...</p>
            <p>Ref를 사용하면</p>
            <p>특정 DOM 요소의</p>
            <p>스크롤 위치를</p>
            <p>자유롭게 조절할 수 있습니다.</p>
            <p>마지막 줄에 도달했습니다! 🏁</p>
          </div>
        </div>
      </div>

      <p className={styles.info}>
        명령적으로 DOM을 조작해야 할 때(포커스, 스크롤, 애니메이션 등) Ref를 사용합니다.
      </p>
    </section>
  )
}
