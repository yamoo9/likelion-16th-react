import { useRef, useState } from 'react'
import styles from '../RefStudy.module.css'

// ---------------------------------------------------------------------
// 실습 가이드
// ---------------------------------------------------------------------
// 1. inputRef 참조 생성 (input 요소 포커스 제어용) ✅
// 2. handleFocusInput 핸들러 로직 작성 (input에 포커스 및 텍스트 선택) ✅
// 3. scrollBoxRef 참조 생성 (스크롤 박스 DOM 조작용) ✅
// 4. scrollToTop 함수 로직 작성 (스크롤 위치를 0으로 이동) ✅
// 5. scrollToBottom 함수 로직 작성 (스크롤 위치를 맨 아래로 이동) ✅
// 6. handleScroll 핸들러 로직 작성 (버튼 비활성화를 위한 상태 갱신) ✅
//    - isTop 상태 생성 (scrollTop === 0) ✅
//    - isBottom 상태 생성 (scrollTop + clientHeight >= scrollHeight - 1) ✅
// 7. 스크롤 이벤트가 발생하는 주기를 조정해 성능 최적화 (쓰로틀링 활용) ✅
// ---------------------------------------------------------------------

const SCROLL_ITEMS_COUNT = 200 // 스크롤 아이템 개수
const THROTTLE_TIME = 600 // 쓰로틀(조정) 타임(ms)

export default function DomFocusControl() {
  // 렌더링과 상관없이 특정(JavaScript 데이터 또는 DOM 객체) 값을
  // 기억할 수 있으려면 Ref 객체를 사용한다. (RefObject의 필요성)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFocusInput = () => inputRef.current?.select()

  // 스크롤 위/아래 이동 제어
  const scrollBoxRef = useRef<HTMLDivElement>(null)

  // 목적지로 스크롤하는 이동 함수
  const scrollTo = (position: 'top' | 'bottom') => {
    // 스크롤 박스 요소의 scrollTo(옵션) 실행
    const scrollBox = scrollBoxRef.current

    scrollBox?.scrollTo({
      top: position === 'bottom' ? scrollBox.scrollHeight : 0,
      behavior: 'smooth',
    })
  }

  // 이벤트 핸들러
  const handleScrollTop = () => scrollTo('top')
  const handleScrollBottom = () => scrollTo('bottom')

  // 스크롤 높이 위치에 따른 비활성 제어를 위한 상태
  const [isTop, setIsTop] = useState(true)
  const [isBottom, setIsBottom] = useState(false)

  // 쓰로틀(Throttle)
  // 현재 시간과 마지막 실행 시간의 차이를 계산하여 
  // 특정 시간(예: 3~400ms)이 지났을 때만 로직을 실행

  // 마지막 실행 시간 (값 참조(Ref) : 리렌더링이 발생하더라도 값을 기억)
  const lastRunRef = useRef(0) // RefObject { current: 0 }
  
  // 스크롤 박스 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 스크롤링 횟수
    console.log('%c스크롤링', 'color: #da70d6')

    // 스크롤링 하는 현재 시간(ms)
    const now = Date.now()

    // 조건 현재 시간 - 마지막 실행 시간 > 조정(throttle) 시간 (리액트 렌더링 해!)
    if (now - lastRunRef.current > THROTTLE_TIME) {
      console.log('%c쓰로틀링(조정)', 'color: #0571bd; font-weight: 800')
      
      const scrollBox = scrollBoxRef.current
      
      if (scrollBox) {
        const { scrollTop, clientHeight, scrollHeight } = scrollBox
        setIsTop(scrollTop === 0)
        setIsBottom(scrollTop + clientHeight >= scrollHeight - 1)
      }

      // 현재 시간을 마지막 실행 시간으로 업데이트
      lastRunRef.current = now
    }

  }

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>3. DOM 직접 제어 (Focus & Scroll)</h3>

      {/* 포커스 제어 영역 */}
      <div className={styles.inputGroup}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          aria-label="초점 이동 테스트"
          placeholder="여기에 초점이 이동됩니다."
        />
        <button
          type="button"
          className={`${styles.button} ${styles.primary}`}
          onClick={handleFocusInput}
        >
          초점 이동
        </button>
      </div>

      <div className={styles.scrollContainer}>
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.button}
            onClick={handleScrollTop}
            aria-disabled={isTop}
          >
            맨 위로 ▲
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleScrollBottom}
            aria-disabled={isBottom}
          >
            맨 아래로 ▼
          </button>
        </div>

        <div
          ref={scrollBoxRef}
          className={styles.scrollBox}
          onScroll={handleScroll}
        >
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
        명령적으로 DOM을 조작해야 할 때(포커스, 스크롤, 애니메이션 등) Ref를
        사용합니다.
      </p>
    </section>
  )
}

const scrollItems = Array.from(
  { length: SCROLL_ITEMS_COUNT },
  (_, i) => `항목 ${i + 1}: 스크롤 위치 확인용 긴 텍스트`,
)
