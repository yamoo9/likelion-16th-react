import { createContext, use } from 'react'
import type { Movie } from '../db/movies'

interface MovieContextValue {
  movies: Movie[]
}

export const MovieContext = createContext<null | MovieContextValue>(null)

export const useMovie = () => {
  const contextValue = use(MovieContext)

  if (!contextValue) {
    throw new Error('useMovie는 MovieContext 내부에서만 사용 가능합니다.')
  }

  return contextValue
}
