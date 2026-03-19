// import CounterComparisonClass from './parts/CounterComparison.class'
import CounterComparison from './parts/CounterComparison'
import TimerIdentifier from './parts/TimerIdentifier'
import DomFocusControl from './parts/DomFocusControl'
import S from './RefStudy.module.css'

export default function RefStudy() {
  return (
    <div className={S.container}>
      <h2 className={S.mainTitle}>useRef 훅 함수 활용</h2>
      {/* <CounterComparisonClass /> */}
      <CounterComparison />
      <TimerIdentifier />
      <DomFocusControl />
    </div>
  )
}
