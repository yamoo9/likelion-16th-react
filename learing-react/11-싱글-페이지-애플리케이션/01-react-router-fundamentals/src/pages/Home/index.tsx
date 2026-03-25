import MovieCardList from '../../components/MovieCardList'
import S from './style.module.css'

export default function Home() {
  return (
    <div className={S.container}>
      <header className={S.header}>
        <h2 className={S.title}>인기 영화 목록</h2>
        <p className={S.subtitle}>지금 가장 핫한 영화들을 만나보세요.</p>
      </header>

      <section className={S.content}>
        <MovieCardList />
      </section>
    </div>
  )
}
