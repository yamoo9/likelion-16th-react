import type { Movie } from './type'

export const getTmdbLink = (movieId: Movie['id'], language = 'ko-KR') => {
  return `${import.meta.env.VITE_TMDB_LINK}/${movieId}?language=${language}`
}
