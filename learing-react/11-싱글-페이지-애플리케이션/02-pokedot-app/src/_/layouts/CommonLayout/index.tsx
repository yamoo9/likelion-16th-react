import Navbar from '../../components/Navbar'
import S from './style.module.css'

export default function CommonLayout() {
  return (
    <div className={S.container}>
      <Navbar />

      <main>
        {/* 배출구(outlet)를 통해 자식 라우트들이 이 자리에 렌더링됩니다. */}
      </main>

      <footer lang="en" className={S.footer}>
        <p>© 2026 Movie App. All rights reserved.</p>
      </footer>
    </div>
  )
}