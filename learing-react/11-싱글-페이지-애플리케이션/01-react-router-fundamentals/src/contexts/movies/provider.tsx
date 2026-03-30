import { useState } from 'react'
import { MoviesContext } from './context'
import { DUMMY_MOVIES, type Movie } from '@/db/movies'

export function MoviesProvider(props: React.PropsWithChildren) {
  // 영화 목록 상태 선언
  const [movies] = useState<Movie[]>(DUMMY_MOVIES)

  // 영화 컨텍스트의 (공급할) 값
  const moviesContextValue = { movies }

  // 영화 컨텍스트를 통해 값을 공급
  return <MoviesContext value={moviesContextValue} {...props} />
}
