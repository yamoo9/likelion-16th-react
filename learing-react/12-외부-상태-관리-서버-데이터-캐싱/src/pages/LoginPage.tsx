import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useIsModalClosing, useModalActions } from '@/stores/modalStore'
import { useAuthActions } from '@/stores/authStore'
import { LoginForm, Title } from '@/components'

interface LocationState {
  from?: {
    pathname: string
  }
}

export default function LoginPage() {
  const { login } = useAuthActions()
  const { openModal, closeModal } = useModalActions()
  const isClosing = useIsModalClosing()

  const navigate = useNavigate()
  const location = useLocation()

  // 로그인 성공 후 사용자를 돌려보낼 목적지 경로 (기본값: 홈 '/')
  const locationState = location.state as LocationState
  const from = locationState?.from?.pathname || '/'

  // [로그인 실행 함수]
  // 성공 시 모달 닫기만 수행하며, 실제 이동은 아래 isClosing 감지 로직에서 처리
  const handleLogin = useCallback(
    async (userId: string, password: string) => {
      await login(userId, password)
      closeModal() // 모달 시스템의 닫기 상태(isClosing)를 true로 전환
    },
    [closeModal, login],
  )

  // 컴포넌트 마운트 시 로그인 모달을 즉시 실행
  useEffect(() => {
    openModal(
      '로그인',
      <LoginForm
        onLogin={handleLogin}
        defaultUserId="yamoo9"
        defaultPassword="Qwerty@1"
      />,
    )

    // [클린업]
    // 사용자가 뒤로가기나 주소창 조작으로 페이지를 이탈할 경우 열려있는 모달을 강제로 닫음
    return () => closeModal()
  }, [closeModal, handleLogin, openModal])

  // 모달의 닫힘 상태(isClosing)를 감시하여 페이지 전환 수행
  // 로그인 성공, ESC 키 입력, 배경 클릭 등 모든 모달 닫힘 케이스에 대응
  useEffect(() => {
    if (isClosing) {
      // replace: true를 통해 로그인 페이지 진입 기록을 히스토리에서 제거
      navigate(from, { replace: true })
    }
  }, [isClosing, navigate, from])

  // 이 컴포넌트는 UI를 직접 렌더링하지 않고 모달 제어 로직만 담당하는 컨트롤러 역할
  return (
    <>
      <Title>로그인</Title>
    </>
  )
}
