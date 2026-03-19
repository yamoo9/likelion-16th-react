import React from 'react'
import S from '../RefStudy.module.css'

interface Props {
  children?: React.ReactNode
}

interface State {
  count: number
}

class CounterComparisonClass extends React.Component<Props, State> {
  // 생성자
  constructor(props: Props) {
    // Props 할당 (this 멤버 구성)
    super(props) // 컴포넌트 외부에서 전달된 props 객체를 this.props에 설정

    // 상태 (클래스 컴포넌트 → 인스턴스 생성 → 생성된 인스턴스 === this)
    this.state = { count: 0 }

    // 이벤트 핸들러 (this 바인딩)
    this.handleIncreamentState = this.handleIncreamentState.bind(this)
    this.handleIncrementInstance = this.handleIncrementInstance.bind(this)
  }

  // 이벤트 핸들러
  // (이 함수는 this 바인딩이 필요)
  handleIncreamentState() {
    // 상태 업데이트 (렌더 트리거)
    const nextState = {
      count: this.state.count + 1,
    }

    this.setState(
      nextState,
      this.updateLogState,
    )

    console.log(`this.setState() 이후에 state.count 값 = ${this.state.count}`)
  }
  
  // 상태 업데이트 후, 콜백되는 함수
  // (이 함수는 this 바인딩이 필요하지 않음)
  updateLogState() {
    console.log(`this.state.count = ${this.state.count}`)
  }

  // 라이프 사이클 메서드
  // 컴포넌트가 업데이트될 때마다 실행
  componentDidMount() {
    this.updateLogState()
  }

  // ----------------------------------------------------------------------

  // 클래스 인스턴스의 멤버
  count = 0 // 10

  // 클래스 인스턴스 값을 업데이트하는 이벤트 핸들러
  // (이 함수는 this 바인딩이 필요)
  handleIncrementInstance() {
    console.log(`this.count = ${this.count}`)
    this.count++
  }

  // ----------------------------------------------------------------------

  render() {
    // 렌더 메서드의 지역 변수
    let countVariable = 0

    // 렌더 메서드의 지역 함수 (이벤트 핸들러)
    const handleIncrementVariable = () => {
      console.log(`countVariable = ${countVariable}`)
      countVariable++
    }

    return (
      <section className={S.section}>
        <h3 className={S.title}>클래스의 상태 vs 인스턴스 멤버 비교</h3>
        <div className={S.display}>
          <div>
            <dfn>State</dfn> 렌더링 <span aria-label="처리">⭕️</span>{' '}
            <strong>{this.state.count}</strong>
          </div>
          <div>
            <dfn>Variable</dfn> 렌더링 <span aria-label="안함">❌</span>{' '}
            <strong>{countVariable}</strong>
          </div>
          <div>
            <dfn>Instance Member</dfn> 렌더링 <span aria-label="안함">❌</span>{' '}
            <strong>{this.count}</strong>
          </div>
        </div>
        <div role="group" className={S.inputGroup}>
          <button
            type="button"
            className={S.button}
            onClick={this.handleIncreamentState}
          >
            State 증가 ({this.state.count})
          </button>
          <button
            type="button"
            className={S.button}
            onClick={handleIncrementVariable}
          >
            Variable 증가 ({countVariable})
          </button>
          <button
            type="button"
            className={S.button}
            onClick={this.handleIncrementInstance}
          >
            Instance 증가 ({this.count})
          </button>
        </div>
      </section>
    )
  }
}

export default CounterComparisonClass