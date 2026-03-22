// 참고: https://developer.themoviedb.org/reference/movie-popular-list
//      https://developer.themoviedb.org/reference/search-movie

const { VITE_TMDB_URL, VITE_TMDB_READ_ACCESS_TOKEN } = import.meta.env

export const tmdbFetchOptions = {
  headers: {
    Authorization: `Bearer ${VITE_TMDB_READ_ACCESS_TOKEN}`,
    accept: 'application/json',
  },
}

export const getTmdbQuery = (query?: string, language = 'ko-KR') => {
  const searchQuery = query?.trim()
  if (!searchQuery) return `${VITE_TMDB_URL}/movie/popular?language=${language}`
  return `${VITE_TMDB_URL}/search/movie?query=${encodeURIComponent(searchQuery)}&language=${language}`
}
