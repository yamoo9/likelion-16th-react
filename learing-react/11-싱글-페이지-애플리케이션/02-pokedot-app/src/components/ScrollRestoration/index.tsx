import { useEffect } from 'react'

/**
 * [스크롤 복구 컴포넌트: ScrollRestoration]
 * - SPA(Single Page Application)는 페이지가 바뀌어도 브라우저의 스크롤 위치가 유지되는 특성이 있습니다.
 * - 새로운 페이지로 이동했을 때 스크롤을 최상단(0, 0)으로 초기화해주는 역할을 합니다.
 *
 * [참고] React Router 6.4+ 버전부터는 내장 <ScrollRestoration /> 컴포넌트가 제공되지만,
 * 이 컴포넌트는 수동으로 구현하여 동작 원리를 익히기에 좋은 예제입니다.
 */
export default function ScrollRestoration() {
  /* 
    [위치 감지]
    - useLocation: 현재 URL 경로(pathname)와 쿼리 스트링(search) 정보를 가져옵니다.
    - 브라우저의 globalThis.location 대신 이 훅을 사용해야 리액트의 렌더링 사이클 내에서 정확히 감지됩니다.
  */
  // 코드 작성

  useEffect(() => {
    /* 
      [브라우저 API: scrollTo]
      - 페이지의 경로(pathname)나 검색 조건(search)이 바뀔 때마다 실행됩니다.
      - 창의 스크롤 위치를 왼쪽 상단 끝(0, 0)으로 즉시 이동시킵니다.
    */
    // 코드 작성

  }, []) // 경로가 바뀌거나 검색 필터가 바뀔 때마다 효과 실행

  // 이 컴포넌트는 화면에 아무것도 그리지 않고 로직만 수행합니다.
  return null
}
