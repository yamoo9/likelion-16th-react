import { cn } from '@/utils'

/**
 * [타입 정의] PageSectionTitleProps
 * @param title - 섹션의 메인 제목
 * @param description - 제목 아래에 표시될 부연 설명
 * @param className - 외부에서 추가적인 스타일(여백 등)을 주입하기 위한 속성
 */
interface Props {
  title: string
  description: string
  className?: string
}

/**
 * [UI 컴포넌트] PageSectionTitle
 * 페이지의 주요 섹션 상단에 위치하여 제목과 설명을 표시합니다.
 */
export default function PageSectionTitle({ title, description, className }: Props) {
  return (
    <header
      className={cn(
        // [레이아웃] 세로 배열, 간격, 왼쪽 굵은 테두리(6px) 및 여백
        'flex flex-col gap-3 border-l-6 pl-6 transition-colors duration-500',
        // [색상] 테두리 색상을 현재 글자색(foreground)과 일치시킴
        'border-foreground',
        className
      )}
    >
      <h2
        className={cn(
          'text-5xl font-black tracking-tighter uppercase md:text-6xl',
          'text-foreground',
        )}
      >
        {title}
      </h2> 
      <p className="text-foreground/50 text-lg font-medium tracking-tight">
        {description}
      </p>
    </header>
  )
}