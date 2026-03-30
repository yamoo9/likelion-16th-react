import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  // React Router의 useLocation 훅을 통해 현재 주소 정보 가져오기
  const { pathname, search } = useLocation()

  // URL의 pathname 또는 search 값이 바뀌면
  useEffect(() => {
    // 페이지 상단으로 스크롤 이동
    // 타이머를 사용해 이동 시간을 조금 뒤로 미룸
    const timerId = setTimeout(() => globalThis.scrollTo(0, 0))

    // 클린업 (메모리 누수 방지)
    return () => clearTimeout(timerId)
  }, [pathname, search])

  // null을 반환하면 아무 것도 화면에 렌더링하지 않음
  return null
}
