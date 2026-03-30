import { useMovies } from '@/contexts'
import MovieCard from '../MovieCard'
import S from './style.module.css'

export default function MovieCardList() {
  const { movies } = useMovies()

  return (
    <div className={S.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
