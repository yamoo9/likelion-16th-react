/**
 * [서버 컴포넌트 (RSC)]
 * 서버에서 실행되며 HTML을 생성하여 전달합니다.
 * DB 직접 접근이 가능하며, 클라이언트 번들 크기에 영향을 주지 않습니다.
 */
export { default as ServerComponent } from './ui/server-component'

/**
 * [클라이언트 컴포넌트 (RCC)]
 * 브라우저에서 실행되며 사용자와 실시간으로 상호작용합니다.
 * useState, useEffect 등 리액트 훅과 이벤트 리스너를 사용할 수 있습니다.
 */
export { default as ClientComponent } from './ui/client-component'
