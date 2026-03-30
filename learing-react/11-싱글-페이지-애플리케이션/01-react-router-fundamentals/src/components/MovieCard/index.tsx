import { Link } from 'react-router-dom'
import type { Movie } from '@/db/movies'
import S from './style.module.css'

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const { id, title, year } = movie

  return (
    <Link to={`/movies/${id}`} className={S.card}>
      <div className={S.poster}>🎬</div>
      <div className={S.info}>
        <h3>{title}</h3>
        <span>{year}</span>
      </div>
    </Link>
  )
}
