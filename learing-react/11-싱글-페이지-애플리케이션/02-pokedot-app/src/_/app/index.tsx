import S from './style.module.css'

export default function LearingReactRouter() {
  return (
    <div className={S.layout}>
      <header>
        <h1>🚀 우주 탐사 라우터</h1>
      </header>
      
      <main className={S.content}>

        {/* 라우트(Routes) 구성 */}
        {/* `/` → Home */}
        {/* `/abount` → About */}
        {/* `/login` → Login */}
        {/* `/movies/:movieId` → MovieDetail */}
        {/* `*` → NotFound (와일드 카드 = '매칭되지 않은 모든 경로') */}

      </main>
    </div>
  )
}