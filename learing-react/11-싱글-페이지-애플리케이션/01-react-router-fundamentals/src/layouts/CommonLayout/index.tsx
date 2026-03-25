import Navbar from '../../components/Navbar'
import S from './style.module.css'

export default function CommonLayout() {
  return (
    <div className={S.layout}>
      <Navbar />
      <main className={S.main}>
        {/* 하위 라우트 컴포넌트가 렌더링되는 위치 */}
        <p>여기에 하위 라우트 컴포넌트가 렌더링됩니다.</p>
      </main>
      <footer className={S.footer} lang="en">
        <p>© 2024 Movie Router Study</p>
      </footer>
    </div>
  )
}
