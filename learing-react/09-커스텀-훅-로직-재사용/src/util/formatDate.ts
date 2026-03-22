export const formatDate = (
  dateString: Date | string,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}
