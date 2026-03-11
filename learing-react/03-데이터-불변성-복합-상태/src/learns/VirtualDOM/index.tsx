import { useState } from 'react'
import S from './style.module.css'

/**
 * 리액트 렌더 파이프라인
 * - Trigger → Render → Commit
 *
 * 브라우저 페인팅(렌더링)
 * - Painting
 *
 * 리액트 상태(State)
 * - 스냅샵(Snaphost)과 유사
 * - 렌더링 시, 불변(Immutable)
 * - 배칭(Batching): 업데이트 큐(Queue)
 *
 * 리액트 제어(Controlled)
 * - 리액트 제어
 * - 상태 기반 Input 제어
 * - 선언적 프로그래밍
 *
 * 리액트 비제어(Uncontrolled)
 * - 브라우저 제어
 * - 웹 표준 기반 Input 제어
 * - 명령적 프로그래밍
 */

export default function VirtualDOM /* React Element Tree (Memory) */() {
  const [count, setCount] = useState(0)

  const [content, setContent] = useState('')

  // 바닐라 JS 방식
  // 리액트의 가상 DOM을 무시하고 실제 DOM을 직접 갈아끼움
  const handleVanillaUpdate = () => {
    const nextCount = count + 1
    setCount(nextCount) // 상태 업데이트. 하지만...

    // ----------------------------------------------------------------

    // 직접 DOM 노드를 찾아가서 전체 HTML을 덮어버림 (강제 조작)
    const vanillaArea = document.getElementById('vanilla-area')

    if (vanillaArea) {
      vanillaArea.innerHTML = /* html */ `
        <p class="${S.countDisplay}">
          직접 조작 카운트: <strong>${nextCount}</strong>
        </p>
        <input 
          type="text" 
          aria-label="DOM 조작 방식"
          class="${S.inputField}" placeholder="내용을 작성하고 버튼을 누르세요." 
        />
      `
    }

    const vanillaDesc = document.querySelector('[data-vanilla-desc]')
    if (vanillaDesc) {
      vanillaDesc.innerHTML = /* html */ `
      <p data-vanilla-desc class="${S.desc}">
        ⚠️ <strong>전체 HTML이 교체</strong>되어 입력값이 사라졌습니다!
      </p>
    `
    }
  }

  return (
    <section className={S.container}>
      <h2 className={S.heading}>
        가상{' '}
        <dfn>
          <abbr title="Document Object Model">DOM</abbr>
        </dfn>
        의 존재 이유
      </h2>

      <div className={S.comparisonGrid}>
        {/* 리액트 방식 (가상 DOM으로 관리) */}
        <article className={S.box}>
          <h3>React 방식</h3>
          <div className={S.countDisplay}>
            리액트 카운트: <strong>{count}</strong>
          </div>
          <input
            type="text"
            className={S.inputField}
            aria-label="리액트 방식"
            placeholder="내용을 작성하고 버튼을 누르세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="button"
            className={`${S.button} ${S.reactBtn}`}
            onClick={() => setCount((c) => c + 1)}
          >
            리액트 업데이트
          </button>
          <p className={S.desc}>
            가상 DOM이 <strong>숫자만</strong> 바꿉니다. 입력창은 그대로
            유지됩니다.
          </p>
        </article>

        {/* 직접 조작 방식 (가상 DOM을 거치지 않음) */}
        <article className={S.box}>
          <h3>
            직접{' '}
            <dfn>
              <abbr>DOM</abbr>
            </dfn>{' '}
            조작 방식
          </h3>
          <div id="vanilla-area">
            <p className={S.countDisplay}>
              직접 조작 카운트: <strong>{count}</strong>
            </p>
            <input
              type="text"
              className={S.inputField}
              placeholder="내용을 작성하고 버튼을 누르세요."
            />
          </div>
          <button
            type="button"
            className={`${S.button} ${S.vanillaBtn}`}
            onClick={handleVanillaUpdate}
          >
            직접 <abbr>DOM</abbr> 업데이트
          </button>
          <p data-vanilla-desc className={S.desc}>
            아직 버튼을 누르기 전입니다.
          </p>
        </article>
      </div>
    </section>
  )
}
