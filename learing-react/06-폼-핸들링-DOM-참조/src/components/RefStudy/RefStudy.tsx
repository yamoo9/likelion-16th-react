import CounterComparison from './parts/CounterComparison'
import TimerIdentifier from './parts/TimerIdentifier'
import DomFocusControl from './parts/DomFocusControl'
import styles from './RefStudy.module.css'

export default function RefStudy() {
  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>useRef 훅 함수 활용</h2>
      <CounterComparison />
      <TimerIdentifier />
      <DomFocusControl />
    </div>
  )
}
