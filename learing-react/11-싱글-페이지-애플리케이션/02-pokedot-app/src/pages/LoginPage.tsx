/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useEffect } from 'react'

import { useModal } from '@/contexts/ModalContext'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm, Title } from '@/components'

export default function LoginPage() {
  const { login } = useAuth()
  const { openModal, closeModal, isClosing } = useModal()

  /* 
    [페이지 이동 함수]
    - useNavigate: 프로그래밍 방식으로 페이지를 전환할 때 사용하는 훅입니다.
    - 예: 로그인 성공 후 메인 페이지로 강제 이동시킬 때 사용합니다.
    - 참고: https://reactrouter.com/api/hooks/useNavigate
  */
  const navigate = undefined

  /* 
    [현재 위치 및 상태 정보]
    - useLocation: 현재 브라우저의 URL 정보와 이전 페이지에서 전달한 state를 가져옵니다.
    - 접근 권한이 없는 페이지에서 로그인 페이지로 튕겨났을 때, 원래 가려던 주소(from)를 기억해두는 용도입니다.
    - 참고: https://reactrouter.com/api/hooks/useLocation
  */
  const location = undefined

  /* 
    [로그인 후 리다이렉트 경로 설정]
    - 사용자가 원래 방문하려던 페이지(from)가 있다면 그곳으로, 없다면 홈('/')으로 보냅니다.
  */
  const locationState = undefined
  const from = locationState || '/'

  /* 
    [로그인 실행 로직]
    - 사용자가 입력한 정보를 바탕으로 인증을 시도합니다.
    - 인증 성공 시 바로 페이지를 이동시키지 않고, 먼저 모달을 닫는 과정을 거칩니다.
  */
  const handleLogin = useCallback(
    async (userId: string, password: string) => {
      await login(userId, password)
      // 모달 시스템의 닫기 애니메이션 등을 위해 isClosing 상태를 true로 먼저 전환합니다.
      closeModal() 
    },
    [closeModal, login],
  )

  /* 
    [화면 진입 시 모달 자동 실행]
    - LoginPage는 별도의 UI 없이 모달을 띄우는 역할만 수행합니다.
    - 컴포넌트가 마운트될 때 즉시 로그인 폼을 모달로 엽니다.
  */
  useEffect(() => {
    openModal(
      '로그인',
      <LoginForm
        onLogin={handleLogin}
        defaultUserId="yamoo9"
        defaultPassword="Qwerty@1"
      />,
    )

    /* 
      [클린업 함수]
      - 사용자가 로그인하지 않고 브라우저 뒤로가기 등을 눌러 페이지를 벗어날 때,
      - 화면에 남아있을 수 있는 로그인 모달을 깨끗하게 정리(닫기)합니다.
    */
    return () => closeModal()
  }, [closeModal, handleLogin, openModal])

  /* 
    [최종 페이지 전환 로직]
    - 모달의 닫힘 상태(isClosing)가 감지되면 실제로 페이지를 이동시킵니다.
    - replace: true 옵션은 히스토리에 '로그인 페이지' 기록을 남기지 않아, 
      로그인 후 뒤로가기를 눌렀을 때 다시 로그인 폼이 뜨는 현상을 방지합니다.
  */
  useEffect(() => {
    if (isClosing) {
      // 여기에서 navigate 함수를 실행합니다.
      // ← 로직 추가
    }
  }, [isClosing])

  /* 
    이 컴포넌트는 실제 UI 렌더링보다는 모달 제어와 
    페이지 흐름을 관리하는 '컨트롤러' 성격의 컴포넌트입니다.
  */
  return (
    <>
      <Title>로그인</Title>
    </>
  )
}
