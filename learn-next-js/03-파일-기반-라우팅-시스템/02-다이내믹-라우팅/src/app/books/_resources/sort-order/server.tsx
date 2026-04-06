import { cn } from "@/utils"
import Link from "next/link"
import type { OrderBy, SortKey } from "../data"

interface Props {
  sortKey: SortKey
  orderBy: OrderBy
}

/* 이름순, 출판일순, ISBN순 정렬(오름차순,내림차순) 기능 구현 */
function SortOrder({ sortKey, orderBy }: Props) {

  return (
    <div className="flex gap-5 rounded-xl border border-slate-400 p-5">
      {/* 링크? (서버 측 제어) 버튼? (클라이언트 측 제어) */}
      {/* 서버 컴포넌트는 사용자와 상호작용할 수 없다. */}
      {/* 서버 컴포넌트는 Link 컴포넌트를 통해 소프트 내비게이션이 가능 (전체가 아닌, 부분만 교체) */}
      <Link
        className={cn(
          'text-foreground/70 hover:text-foreground',
          sortKey.includes('title') &&
            orderBy.includes('asc') &&
            'font-black text-blue-600',
        )}
        href="?sortKey=title&orderBy=asc"
      >
        이름순 정렬 (오름차순)
      </Link>
      <Link
        className={cn(
          'text-foreground/70 hover:text-foreground',
          sortKey.includes('title') &&
            orderBy.includes('desc') &&
            'font-black text-blue-600',
        )}
        href="?sortKey=title&orderBy=desc"
      >
        이름순 정렬 (내림차순)
      </Link>
    </div>
  )
}

export default SortOrder
