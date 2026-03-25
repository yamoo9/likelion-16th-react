/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef } from 'react'

import { useInput, useToggle } from '@/hooks'
import { useAuth } from '@/contexts/AuthContext'
import S from './style.module.css'

interface Props {
  isInCollection: boolean
  isLoading: boolean
  onAddToCollection: (nickname: string) => Promise<void>
}

export default function CollectionActions({
  isInCollection,
  isLoading,
  onAddToCollection,
}: Props) {
  /* 
    [useNavigate]
    - 프로그래밍 방식으로 페이지를 이동시킬 때 사용하는 훅입니다.
    - 예: 버튼 클릭 후 특정 조건에 따라 로그인 페이지나 결과 페이지로 이동.
  */
  const navigate = undefined

  const { isAuthenticated } = useAuth()

  const nicknameIuput = useInput<HTMLInputElement>('')
  const isDisabled = nicknameIuput.props.value.trim().length === 0

  const [showNicknameInput, setShowNicknameInput] = useToggle(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleAddClick = async (e: React.SubmitEvent) => {
    e.preventDefault()

    // [비로그인 사용자 처리]
    if (!isAuthenticated) {
      if (confirm('포켓박스에 담으려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?')) {
        /* 
          [replace 옵션]
          - replace: true를 사용하면 현재 페이지의 히스토리를 덮어씁니다.
          - 뒤로가기를 눌렀을 때 방금 전의 미인증 상태 페이지로 돌아오지 않게 할 때 유용합니다.
          - 이동 경로: `/login`
          - 옵션 설정: replace = true
          - 참고: https://reactrouter.com/api/hooks/useNavigate#replace-the-current-entry-in-the-history-stack
        */
        // navigate 함수 코드 작성
        
      }

      return
    }

    if (isLoading) return

    if (showNicknameInput) {
      try {
        if(isDisabled) return

        // 컬렉션 추가 API 호출
        await onAddToCollection(nicknameIuput.props.value)
        
        setShowNicknameInput(false)
        nicknameIuput.methods.setValue('')

        /* 
          [성공 후 이동]
          - 추가가 완료되면 사용자의 포켓박스 목록 페이지('/my')로 이동시킵니다.
        */
        // navigate 함수 코드 작성

      } catch (err) {
        console.error('컬렉션에 추가하는 데 실패했습니다:', err)
      }
    } else {
      // 별명 입력창 표시 및 포커스 처리
      setShowNicknameInput(true)
      setTimeout(() => nicknameIuput.props.ref.current?.select())
    }
  }

  // ESC 키를 눌렀을 때 입력창 닫기 (웹 접근성 및 UX)
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNicknameInput(false)
        setTimeout(() => buttonRef.current?.focus())
      }
    }

    document.addEventListener('keydown', handleEscKey)

    // [클린업]
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [setShowNicknameInput])

  // 이미 수집된 경우의 UI
  if (isInCollection) {
    return (
      <div role="status" className={S.alreadyCollected}>
        이미 컬렉션에 추가된 포켓몬입니다.
      </div>
    )
  }

  return (
    <section className={S.collectionSection}>
      <h2 className="sr-only">
        컬렉션 액션
      </h2>
      <form onSubmit={handleAddClick}>
        {showNicknameInput ? (
          <div className={S.nicknameInput}>
            <label htmlFor="pokemon-nickname" className="sr-only">
              포켓몬 별명
            </label>
            <input
              id="pokemon-nickname"
              type="text"
              className={S.input}
              placeholder="별명을 입력하세요."
              aria-label="포켓몬 별명 입력"
              {...nicknameIuput.props}
            />
            <button
              type="submit"
              className={S.addButton}
              aria-disabled={isLoading || isDisabled}
              aria-busy={isLoading}
            >
              {isLoading ? '처리 중...' : '컬렉션에 추가'}
            </button>
          </div>
        ) : (
          <button
            type="submit"
            ref={buttonRef}
            className={S.addButton}
            aria-disabled={!isAuthenticated}
          >
            포켓박스에 담기
          </button>
        )}
      </form>
    </section>
  )
}
