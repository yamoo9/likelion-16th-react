import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import S from './style.module.css'

export default function CommonLayout() {
  return (
    <div className={S.layout}>
      <Navbar />
      <main className={S.main}>
        {/* 하위 라우트 컴포넌트가 렌더링되는 위치 */}
        <Outlet />
      </main>
      <footer className={S.footer} lang="en">
        <p>© {new Date().getFullYear()} Movie Router Study</p>
      </footer>
    </div>
  )
}
