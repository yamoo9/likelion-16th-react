/**
 * [실습] 동적 세그먼트 (Dynamic Segment) 활용 및 데이터 바인딩
 * 
 * 핵심 학습 목표
 * - URL 경로에 포함된 동적 파라미터(isbn, title 등) 추출 방법 습득
 * - 추출한 파라미터를 인자로 사용하여 특정 도서 정보(Service) 조회
 * - 서버 컴포넌트에서 비동기(Async)로 데이터를 불러와 화면에 렌더링
 * 
 * 다루는 주요 데이터 (Dynamic Params)
 * - props.params: URL 경로 `/book/[isbn]`에서 `isbn` 값을 읽어옴
 * - Next.js 15+ 환경에서는 `await props.params`로 비동기 처리 필요
 * 
 * 실습 미션
 * - 전달받은 ISBN 번호를 이용해 도서(book) 찾기
 * - 존재하지 않는 ISBN으로 접속 시 에러 처리 또는 '도서 없음' 메시지 표시
 * - 조회된 도서의 제목(title), 이미지(image), 설명(description) 등을 화면에 출력
 */

export default function BookDetailPage() {

  return null
}
