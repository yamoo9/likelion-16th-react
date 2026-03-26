import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useIsAuthenticated } from '@/stores/authStore'
import { useInput, useToggle } from '@/hooks'
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
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const nicknameIuput = useInput<HTMLInputElement>('')
  const isDisabled = nicknameIuput.props.value.trim().length === 0

  console.log(isDisabled)

  const [showNicknameInput, setShowNicknameInput] = useToggle(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  /**
   * 실제 컬렉션 추가 처리 (Form Submit)
   */
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLoading || isDisabled) return

    try {
      await onAddToCollection(nicknameIuput.props.value)
      setShowNicknameInput(false)
      nicknameIuput.methods.setValue('')
      navigate('/my')
    } catch (err) {
      console.error('컬렉션에 추가하는 데 실패했습니다:', err)
    }
  }

  /**
   * 처음 "포켓박스에 담기" 버튼 클릭 시 핸들러
   */
  const handleInitialClick = () => {
    if (!isAuthenticated) {
      if (confirm('포켓박스에 담으려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?')) {
        // replace: true 대신 현재 위치를 기억할 수 있도록 state를 넘기는 것이 일반적입니다.
        navigate('/login', { state: { from: window.location.pathname } })
      }
      return
    }

    // 로그인 상태라면 입력창 노출
    setShowNicknameInput(true)
    // 입력창이 렌더링된 후 포커스 및 텍스트 선택
    setTimeout(() => {
      nicknameIuput.props.ref.current?.focus()
      nicknameIuput.props.ref.current?.select()
    })
  }

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showNicknameInput) {
        setShowNicknameInput(false)
        setTimeout(() => buttonRef.current?.focus())
      }
    }

    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [showNicknameInput, setShowNicknameInput])

  if (isInCollection) {
    return (
      <div className={S.alreadyCollected} role="status">
        이미 컬렉션에 추가된 포켓몬입니다.
      </div>
    )
  }

  return (
    <section
      className={S.collectionSection}
      aria-labelledby="collection-action-title"
    >
      <h2 id="collection-action-title" className="sr-only">
        컬렉션 액션
      </h2>
      
      {showNicknameInput ? (
        <form onSubmit={handleAddSubmit} className={S.nicknameInput}>
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
        </form>
      ) : (
        <button
          type="button"
          ref={buttonRef}
          className={S.addButton}
          onClick={handleInitialClick}
        >
          포켓박스에 담기
        </button>
      )}
    </section>
  )
}
