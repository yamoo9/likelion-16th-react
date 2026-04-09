// 차세대 Next.js의 캐시 시스템을 사용해 컴포넌트 단위를 캐싱
export async function Copyright() {
  'use cache'
  return <>© {new Date().getFullYear()} EUID. Copyright all reserved.</>
}
