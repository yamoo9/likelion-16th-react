import Link from 'next/link'
import { LucideArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  /** 이동할 페이지 경로 */
  href: string
  /** 카드의 메인 제목 */
  title: string
  /** 카드에 대한 부연 설명 */
  description: string
  /** Lucide-react에서 제공하는 아이콘 컴포넌트 */
  icon: LucideIcon
}

/**
 * [공통 컴포넌트] LinkCard
 * 특정 페이지로 이동을 유도하는 카드 형태의 링크 버튼입니다.
 */
export default function LinkCard({ href, title, description, icon: Icon }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        // [레이아웃] 상대 위치(absolute 자식 기준), 플렉스 박스, 넘치는 요소 숨김, 둥근 모서리
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6',
        // [애니메이션] 모든 변화를 0.3초 동안 부드럽게 적용
        'transition-all duration-300',
        // [라이트 모드] 흰색 배경, 연한 회색 테두리, 미세한 그림자
        'bg-white border-zinc-200 shadow-sm text-zinc-900',
        // [다크 모드] 짙은 검정 배경, 짙은 회색 테두리, 그림자 제거
        'dark:bg-zinc-950 dark:border-zinc-800 dark:shadow-none dark:text-zinc-100',
        // [호버 효과] 테두리를 강조하고, 배경색을 살짝 변경하며 그림자를 키움
        'hover:border-zinc-400 hover:shadow-md dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50',
        // [접근성] 탭 키로 포커스 시 나타나는 링 스타일 (아웃라인 제거 후 커스텀 링 적용)
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
        'dark:focus-visible:ring-zinc-300 dark:ring-offset-zinc-950'
      )}
    >
      {/* 상단 콘텐츠 영역: 아이콘, 제목, 설명 */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          {/* 아이콘 + 제목: 호버 시 텍스트 색상이 더 진해짐 */}
          <div className={cn(
            "flex items-center gap-2.5 font-bold transition-colors",
            "group-hover:text-black dark:group-hover:text-white"
          )}>
            {/* 아이콘 배경 박스: 호버 시 색상이 살짝 밝아짐 */}
            <div className={cn(
              "rounded-lg p-2 transition-colors",
              "bg-zinc-100 dark:bg-zinc-800",
              "group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
            )}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="text-lg tracking-tight">{title}</span>
          </div>

          {/* 설명 텍스트: 제목보다 흐린 색상 유지, 호버 시 약간 선명해짐 */}
          <p className={cn(
            "text-sm leading-relaxed pr-8 transition-colors",
            "text-zinc-500 dark:text-zinc-400",
            "group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
          )}>
            {description}
          </p>
        </div>

        {/* 오른쪽 화살표: 호버 시 오른쪽으로 살짝 움직이는 애니메이션 (translate-x-1) */}
        <div className="mt-2 shrink-0">
          <LucideArrowRight
            className={cn(
              "h-5 w-5 transition-all duration-300",
              "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100",
              "group-hover:translate-x-1"
            )}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* 
        [장식 요소] 하단 보더 그라데이션 
        평소에는 투명(opacity-0)하다가 카드에 호버하면 나타납니다.
      */}
      <div 
        className={cn(
          "absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500",
          "bg-linear-to-r from-transparent via-zinc-300 to-transparent",
          "dark:via-zinc-600",
          "group-hover:opacity-100"
        )} 
      />
    </Link>
  )
}
