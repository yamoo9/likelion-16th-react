import { createContext, use } from 'react'
import type { Movie } from '@/db/movies'

interface MoviesContextValue {
  movies: Movie[]
}

export const MoviesContext = createContext<null | MoviesContextValue>(null)

export const useMovies = () => {
  const contextValue = use(MoviesContext)

  if (!contextValue) {
    throw new Error('useMovie는 MovieContext 내부에서만 사용 가능합니다.')
  }

  return contextValue
}
