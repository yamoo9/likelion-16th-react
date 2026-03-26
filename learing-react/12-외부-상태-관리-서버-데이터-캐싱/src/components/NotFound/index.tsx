import { Link } from 'react-router-dom'
import styles from './style.module.css'

export default function NotFound() {
  return (
    <main className={styles.container}>
      <article className={styles.content}>
        <h2 className={styles.title} lang="en">404 Not Found</h2>
        <h3 className={styles.subtitle}>페이지를 찾을 수 없습니다</h3>
        <p className={styles.message}>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link to="/" className={styles.homeButton}>
          홈으로 돌아가기
        </Link>
      </article>
    </main>
  )
}