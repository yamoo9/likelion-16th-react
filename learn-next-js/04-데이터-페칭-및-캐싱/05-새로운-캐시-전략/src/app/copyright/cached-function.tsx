// 차세대 Next.js의 캐시 시스템을 사용해 함수 단위를 캐싱
async function getCachedTime() {
  // 현재 함수를 캐시할 것임을 선언
  'use cache'
  return new Date().getFullYear()
}

export async function Copyright() {
  const currentYear = await getCachedTime()
  return <>© {currentYear} EUID. Copyright all reserved.</>
}
