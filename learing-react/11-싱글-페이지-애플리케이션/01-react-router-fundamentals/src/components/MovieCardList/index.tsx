import { useMovie } from '../../contexts/MovieContext'
import MovieCard from '../MovieCard'
import S from './style.module.css'

export default function MovieCardList() {
  const { movies } = useMovie()

  return (
    <div className={S.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
