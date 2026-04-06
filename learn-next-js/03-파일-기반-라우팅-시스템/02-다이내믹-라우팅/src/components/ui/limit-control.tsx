import Link from 'next/link'
import { cn } from '@/utils'

/**
 * [타입 정의] LimitControlProps
 * @param currentLimit - 현재 적용된 페이지당 아이템 개수
 * @param searchParams - 현재 URL의 모든 쿼리 파라미터 객체
 * @param limitOptions - 선택 가능한 개수 옵션 배열 (기본값: [9, 15, 30])
 */
interface LimitControlProps {
  currentLimit: number
  searchParams: Record<string, string | string[] | undefined>
  limitOptions?: number[]
}

/**
 * [UI 컴포넌트] LimitControl
 * 사용자가 한 페이지에 보여줄 도서 카드의 개수를 선택할 수 있게 합니다.
 * 선택 시 URL의 'limit' 파라미터를 업데이트하며, 페이지 번호는 1로 초기화합니다.
 */
export default function LimitControl({
  currentLimit,
  searchParams,
  limitOptions = [9, 15, 30],
}: LimitControlProps) {
  
  /**
   * [함수] createLimitHref
   * 새로운 limit 값이 적용된 URL 경로를 생성합니다.
   */
  const createLimitHref = (newLimit: number) => {
    const params = new URLSearchParams()
    
    // [파라미터 복사] 기존의 모든 쿼리(검색어, 정렬 등)를 유지합니다.
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        // 배열 형태일 경우 첫 번째 값을, 아닐 경우 문자열로 변환하여 세팅
        params.set(key, Array.isArray(value) ? value[0] : (value as string))
      }
    })
    
    // [파라미터 갱신] 새로운 limit을 설정하고, 데이터 일관성을 위해 1페이지로 리셋합니다.
    params.set('limit', newLimit.toString())
    params.set('page', '1')
    
    return `?${params.toString()}`
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      {/* 라벨 영역 */}
      <span className="font-medium text-zinc-500 dark:text-zinc-400">
        보기:
      </span>

      {/* [컨트롤러 바] 버튼들을 감싸는 배경 컨테이너 */}
      <div className="flex items-center rounded-lg p-1 bg-zinc-100 dark:bg-zinc-800">
        {limitOptions.map((option) => {
          const isActive = currentLimit === option
          
          return (
            <Link
              key={option}
              href={createLimitHref(option)}
              // 페이지 이동 시 스크롤 위치를 유지하여 사용자 경험(UX) 향상
              scroll={false} 
              className={cn(
                'rounded-md px-3 py-1 font-medium transition-all duration-200',
                // [활성 상태] 라이트: 흰색 배경/그림자 | 다크: 진회색 배경
                isActive
                  ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200',
              )}
            >
              {option}
            </Link>
          )
        })}
      </div>
    </div>
  )
}