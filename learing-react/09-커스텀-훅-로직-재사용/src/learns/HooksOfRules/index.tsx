/* eslint-disable react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */

import { useState, useEffect, useCallback, useMemo } from 'react'
import ErrorMessage from './parts/ErrorMessage'
import S from './style.module.css'

/**
 * "리액트 개발자가 하지 말아야 할 모든 것"이 들어있습니다.
 * - 먼저 코드를 실행하고 카운트를 6까지 올려보세요.
 * - 입력창에 글자를 타이핑해보세요.
 * - 콘솔 패널을 열어보세요.
 */

export default function HooksOfRules() {
  const [count, setCount] = useState(0)
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [text, setText] = useState('')

  // 1. Conditional Hook
  if (count > 5) {
    useEffect(() => {
      console.log('⚠️ 카운트가 5를 초과했습니다!')
    })
  }

  // 2. Stale Closure & Memory Leak
  useEffect(() => {
    setInterval(() => {
      console.log('⏰ 현재 카운트(setInterval):', count)
    }, 2000)
  }, [])

  // 3. Over-optimization
  const handleIncrement = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const toggleError = useMemo(
    () => () => setIsErrorVisible(!isErrorVisible),
    [isErrorVisible],
  )

  // 4. Nested Component
  function ButtonGroup() {
    return (
      <div className={S.group}>
        <div className={S.inputWrapper}>
          <label htmlFor="memo" className={S.label}>
            메모 입력 (포커스 테스트)
          </label>
          <input
            id="memo"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="글자를 입력하면 포커스가 풀릴까요?"
            className={S.input}
          />
        </div>
        <div role="group" className={S.buttonGroup}>
          <button
            type="button"
            onClick={handleIncrement}
            className={S.buttonPrimary}
          >
            카운트 증가
          </button>
          <button
            type="button"
            onClick={toggleError}
            className={S.buttonOutline}
          >
            에러 토글
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2 className={S.title}>Hooks 규칙 & 클로저 문제</h2>
        <p className={S.description}>
          콘솔을 열고 리액트의 동작 원리를 파악해보세요.
        </p>
      </header>

      <div className={S.card}>
        <ButtonGroup />

        <div className={S.display}>
          <span className={S.countLabel}>현재 카운트</span>
          <output className={S.countText} aria-live="polite">
            {count}
          </output>
        </div>

        {/* 5. unnecessary re-render */}
        <ErrorMessage isError={isErrorVisible} />
      </div>
    </section>
  )
}
