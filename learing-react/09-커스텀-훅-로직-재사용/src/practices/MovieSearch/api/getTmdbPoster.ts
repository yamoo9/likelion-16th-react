// 구조: 'https://image.tmdb.org/t/p/ + 사이즈(예: w500) + 파일 경로(예: /1E5ba...jpg)'
// - t: Type (또는 Thumbnail)
// - p: Path (또는 Poster)
// 참고: https://developer.themoviedb.org/docs/image-basics

export const getTmdbPoster = (path: string, size = 500) => {
  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/w${size}${path}`
}