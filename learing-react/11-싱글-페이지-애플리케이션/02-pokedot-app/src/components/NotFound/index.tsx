import styles from './style.module.css'

/**
 * [공통 UI: NotFound 컴포넌트]
 * - 존재하지 않는 경로로 접근했을 때 사용자에게 보여줄 에러 화면입니다.
 * - 사용자 경험(UX)을 위해 홈으로 돌아갈 수 있는 경로를 제공합니다.
 */
export default function NotFound() {
  return (
    <main className={styles.container}>
      <article className={styles.content}>
        
        {/* 에러 코드 및 제목 표시 */}
        <h2 className={styles.title} lang="en">404 Not Found</h2>
        <h3 className={styles.subtitle}>페이지를 찾을 수 없습니다</h3>
        
        {/* 사용자 안내 문구 */}
        <p className={styles.message}>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        {/* 
          [Link 컴포넌트]
          - 'Link'는 브라우저의 전체 페이지를 새로고침하지 않고(SPA 방식), 
            필요한 컴포넌트만 갈아끼워 페이지를 전환합니다.
          - 일반 <a> 태그 대신 'Link'를 사용해야 앱의 상태(State)가 유지됩니다.
          - 'to' 속성에는 이동하고자 하는 경로를 작성합니다.
        */}
        <a href="/" className={styles.homeButton}>
          홈으로 돌아가기
        </a>
      </article>
    </main>
  )
}