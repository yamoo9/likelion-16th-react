import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useIsAuthenticated } from '@/stores/authStore'
import { useInput, useToggle } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import S from './style.module.css'

interface Props {
  isInCollection: boolean
  onAddToCollection: (nickname: string) => Promise<void>
}

export default function CollectionActions({
  isInCollection,
  onAddToCollection,
}: Props) {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const nicknameInput = useInput<HTMLInputElement>('')
  const isDisabled = nicknameInput.props.value.trim().length === 0

  const [showNicknameInput, setShowNicknameInput] = useToggle(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  // useMutation을 사용하여 컬렉션 추가 처리
  const mutation = useMutation({
    mutationFn: async (nickname: string) => {
      await onAddToCollection(nickname)
    },
    onSuccess: () => {
      setShowNicknameInput(false)
      nicknameInput.methods.setValue('')
      navigate('/my')
    },
    onError: (error) => {
      console.error('컬렉션에 추가하는 데 실패했습니다:', error)
    },
  })

  /**
   * 실제 컬렉션 추가 처리 (Form Submit)
   */
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // isPending 또는 isMutating 사용
    if (mutation.isPending || isDisabled) return

    mutation.mutate(nicknameInput.props.value)
  }

  /**
   * 처음 "포켓박스에 담기" 버튼 클릭 시 핸들러
   */
  const handleInitialClick = () => {
    if (!isAuthenticated) {
      if (
        confirm(
          '포켓박스에 담으려면 로그인이 필요합니다. 로그인 페이지로 이동할까요?',
        )
      ) {
        navigate('/login', { state: { from: window.location.pathname } })
      }
      return
    }

    // 로그인 상태라면 입력창 노출
    setShowNicknameInput(true)
    // 입력창이 렌더링된 후 포커스 및 텍스트 선택
    setTimeout(() => {
      nicknameInput.props.ref.current?.focus()
      nicknameInput.props.ref.current?.select()
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
            {...nicknameInput.props}
          />
          <button
            type="submit"
            className={S.addButton}
            aria-disabled={mutation.isPending || isDisabled}
            aria-busy={mutation.isPending}
          >
            {mutation.isPending ? '처리 중...' : '컬렉션에 추가'}
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
