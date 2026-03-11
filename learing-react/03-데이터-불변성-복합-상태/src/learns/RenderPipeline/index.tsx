import { useEffect, useState } from 'react'
import S from './style.module.css'

// 리액트가 작동하는 원리 (공식 문서)
// 1. 트리거 (개발자가 상태 리액트에 업데이트 요청)
// 2-1. 렌더 (리액트에 의해 함수 컴포넌트 다시 실행)
// 2-2. 재조정 (리액트 DOM 트리 재구성 후, 이전 DOM 트리와 비교해 차이점 찾기)
// 3. 커밋 (리액트가 어떤 부분을 변경해야할지 브라우저에게 알려줌)
// 4. 페인팅 (실제 화면에 변경되는 부분, 브라우저 렌더링이지만 페인팅으로 구분지음)

// 리액트의 상태(State)는 일종의 스냅샷(Snapshot) 같은 데이터이다.
// 영화 필름의 일부분을 스냅샷을 받았을 때 그 스냅샷을 훼손했다고 해서 영화 필름은 망가지지 않는다.
// 스냅샵 렌더링 시점에서 변하지 않는다(Immutable).

// 리액트의 [Trigger] 상태(State) 업데이트 2가지 방법
// 1. set 함수에 nextState 전달하기
// 2. set 함수에 updater 함수 전달하기 ((prevState) => nextState)

// React 렌더 파이프라인(Render Pipeline)
// 1. 트리거(trigger) -> 2. 렌더(render) -> 3. 커밋(commit)

// 리액트 스토어(Store)
// orderCount = 0
// [1] RenderPipeline 컴포넌트 실행 <- orderCount 스냅샷 (0) 불변(변경 ❌)
// orderCount = 1 (리액트가 상태 변경)
// [2] RenderPipeline 컴포넌트 실행 <- orderCount 스냅샷 (1) 불변(변경 ❌)

// 개발자 렌더 트리거(render trigger) nextOrderCount = 1

export default function RenderPipeline() {
  // 상태 선언
  const [orderCount, setOrderCount] = useState(0)

  // 2. 렌더(Render)
  //    트리거된 이후, 상태 업데이트 하고나서 컴포넌트를 다시 실행 (re-render)
  console.log(
    `[Render] 리액트 주방에서 주문받은 요리(주문 번호: ${orderCount}) 중...`,
  )

  // 상태 업데이트 로직이 포함된 핸들러 작성
  const handleOrder = () => {
    // 1. 트리거(Trigger)
    //    리액트에게 상태 업데이트 요청
    setOrderCount((oc) => oc + 1)
    console.log('[Trigger] 리액트 주방에 주문하기')
    // const nextOrderCount = orderCount + 1
    // setOrderCount(nextOrderCount)
  }

  // 3. 커밋(Commit)
  //    컴포넌트 렌더 결과(JSX 반환 = 리액트 DOM 트리(Tree) 재구성) -> 실제 DOM 반영
  useEffect(() => {
    console.log('[Commit] 실제 DOM에 반영해 화면을 업데이트하기')
  })

  return (
    <section className={S.container}>
      <h2 className={S.title}>리액트 주방 (파이프라인)</h2>

      <div className={S.display}>
        <p className={S.text}>
          현재 주문 번호: <strong>{orderCount}</strong>
        </p>
      </div>

      <button type="button" className={S.button} onClick={handleOrder}>
        [Trigger] 새 요리 주문하기
      </button>
    </section>
  )
}
