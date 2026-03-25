import { NotFound, Title } from '@/components'

/**
 * [404 Not Found 페이지]
 * - 사용자가 정의되지 않은 경로(URL)로 접근했을 때 보여주는 페이지입니다.
 * - React Router의 Route 설정에서 path="*"를 통해 이 컴포넌트로 연결됩니다.
 */
export default function NotFoundPage() {
  return (
    <>
      {/* 페이지 타이틀 설정 (브라우저 탭 제목, 접근성) */}
      <Title>페이지 없음</Title>

      {/* 
        [공통 UI 컴포넌트 활용]
        - '페이지를 찾을 수 없습니다'라는 메시지와 홈으로 돌아가는 버튼 등 
        - 에러 상황에 필요한 UI가 집약된 NotFound 컴포넌트를 렌더링합니다.
      */}
      <NotFound />
    </>
  )
}