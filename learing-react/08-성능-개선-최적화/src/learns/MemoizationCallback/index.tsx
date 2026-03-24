import { useEffect, useState/* , useCallback */ } from 'react'
import { formatTime } from './util/formatTime'
import GrandFather from './parts/GrandFather'
import S from './style.module.css'

export default function MemoizationCallback() {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  
  const [count, setCount] = useState(0)

  // 일반 함수
  // - 매 렌더링(1초마다)마다 새로운 참조값이 생성됨
  // - 자식이 React.memo를 써도 무조건 리렌더링 유발
  // const incrementCount = () => setCount(count + 1)
  
  // useCallback (의존성 포함)
  // - count가 변할 때만 새로 생성됨. 1초마다 흐르는 time에는 영향받지 않음
  // - 하지만 count가 변할 때 자식도 같이 리렌더링되는 구조라면 적절함
  // const incrementCount = useCallback(() => setCount(count + 1), [count])

  // useCallback (의존성 비움)
  // - 의존성 배열이 비어있어 빌드 시점에 단 한 번만 생성됨
  // - 어떤 상태 변화에도 참조값이 변하지 않는 가장 강력한 최적화
  // const incrementCount = useCallback(() => setCount((prev) => prev + 1), [])

  // set 함수
  // - 리액트가 이미 메모이제이션을 보장함
  // - props로 넘길 때 가장 안전하고 깔끔함

  return (
    <div className={S.container}>
      <section className={S.timerSection}>
        <h2 className={S.title}>현재 시간</h2>
        <time dateTime={time.toISOString()} className={S.timeDisplay}>
          {formatTime(time)}
        </time>
      </section>

      <div className={S.counterSection}>
        <GrandFather 
          count={count} 
          setCount={setCount}
          // onIncreament={incrementCount} 
        />
      </div>
    </div>
  )
}