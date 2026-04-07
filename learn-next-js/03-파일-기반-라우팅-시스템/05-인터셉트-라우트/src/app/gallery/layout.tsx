import { cn } from '@/utils'

export default function GalleryLayout({ children, modal }: LayoutProps<'/gallery'>) {
  return (
    <>
      {/* 메인 콘텐츠 영역 */}
      <div className={cn('mx-auto max-w-7xl px-6 py-16 md:py-24')}>
        {children}
      </div>
      {/* 인터셉트 라우트 모달 슬롯 */}
      {modal}
    </>
  )
}
