import styles from '../RefStudy.module.css'

// ---------------------------------------------------------------------
// 실습 가이드
// ---------------------------------------------------------------------
// 1. inputRef 참조 생성 (input 요소 포커스 제어용)
// 2. handleSelect 핸들러 로직 작성 (input에 포커스 및 텍스트 선택)
// 3. scrollBoxRef 참조 생성 (스크롤 박스 DOM 조작용)
// 4. scrollToTop 함수 로직 작성 (스크롤 위치를 0으로 이동)
// 5. scrollToBottom 함수 로직 작성 (스크롤 위치를 맨 아래로 이동)
// 6. handleScroll 핸들러 로직 작성 (버튼 비활성화를 위한 상태 갱신)
//    - isTop 상태 생성 (scrollTop === 0)
//    - isBottom 상태 생성 (scrollTop + clientHeight >= scrollHeight - 1)
// 7. 스크롤 이벤트가 발생하는 주기를 조정해 성능 최적화 (쓰로틀링 활용)
// ---------------------------------------------------------------------

const SCROLL_ITEMS_COUNT = 10 // 스크롤 아이템 개수

export default function DomFocusControl() {

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>3. DOM 직접 제어 (Focus & Scroll)</h3>

      {/* 포커스 제어 영역 */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="여기에 초점이 이동됩니다."
        />
        <button
          type="button"
          className={`${styles.button} ${styles.primary}`}
        >
          초점 이동
        </button>
      </div>

      <div className={styles.scrollContainer}>
        <div className={styles.buttonGroup}>
          <button 
            type="button"
            className={styles.button}
            aria-disabled={false}
          >
            맨 위로 ▲
          </button>
          <button
            type="button"
            className={styles.button}
            aria-disabled={true}
          >
            맨 아래로 ▼
          </button>
        </div>

        <div className={styles.scrollBox}>
          <div className={styles.scrollContent}>
            <p>📜 스크롤 테스트 영역입니다.</p>
            <p>내용이 아주 길어서 스크롤바가 생겼습니다.</p>
            <p>내용이 아주 길어요...</p>
            <p>Ref를 사용하면</p>
            <p>특정 DOM 요소의</p>
            <p>스크롤 위치를</p>
            <p>자유롭게 조절할 수 있습니다.</p>
            {scrollItems.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
            <p>마지막 줄에 도달했습니다! 🏁</p>
            <p>Ref를 통해 여기까지 한 번에 이동할 수 있습니다.</p>
          </div>
        </div>
      </div>

      <p className={styles.info}>
        명령적으로 DOM을 조작해야 할 때(포커스, 스크롤, 애니메이션 등) 
        Ref를 사용합니다.
      </p>
    </section>
  )
}

const scrollItems = Array.from(
  { length: SCROLL_ITEMS_COUNT },
  (_, i) => `항목 ${i + 1}: 스크롤 위치 확인용 긴 텍스트`,
)