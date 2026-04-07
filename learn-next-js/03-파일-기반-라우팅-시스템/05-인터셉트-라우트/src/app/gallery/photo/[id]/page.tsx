import Link from 'next/link'
import { ChevronLeft, MapPin, Calendar, Maximize2 } from 'lucide-react'

import { cn } from '@/utils'
import { PHOTO_DATA } from '@/app/gallery/_resouces/data'
import { InfoItem } from '@/app/gallery/_resouces/components'
import { ScrollToTop } from '@/app/gallery/_resouces/scroll-to-top'


export default async function PhotoPage(props: PageProps<'/gallery/photo/[id]'>) {
  const { id } = await props.params
  const data = PHOTO_DATA[id] ?? PHOTO_DATA['1']

  return (
    <section className={cn('bg-slate-50')}>
      <ScrollToTop />

      {/* 상단 네비게이션 바 */}
      <nav
        className={cn(
          'sticky top-0 z-10 flex items-center justify-between p-6',
          'border-b border-slate-100 bg-white/80 backdrop-blur-md',
        )}
      >
        <Link
          href="/gallery"
          className={cn(
            'flex items-center gap-2 font-bold transition-colors',
            'text-slate-600 hover:text-blue-600',
          )}
        >
          <ChevronLeft className="h-5 w-5" /> 갤러리로 돌아가기
        </Link>
        <div
          lang="en"
          className={cn(
            'text-sm font-bold tracking-widest uppercase',
            'text-slate-400',
          )}
        >
          Photo Detail
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 pt-12">
        {/* 메인 이미지 카드 */}
        <div
          className={cn(
            'aspect-video overflow-hidden rounded-[40px] md:aspect-21/9',
            'bg-black shadow-2xl shadow-slate-200',
          )}
        >
          <img
            src={`https://picsum.photos/seed/${id}/1600/900`}
            alt={data.title}
            className="h-full w-full object-cover opacity-90"
          />
        </div>

        {/* 텍스트 정보 영역 */}
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_300px]">
          <section className="space-y-8">
            <header className="space-y-4">
              <div
                lang="en"
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase',
                  'bg-blue-50 text-blue-600',
                )}
              >
                <Maximize2 className="h-3.5 w-3.5" /> High Resolution
              </div>
              <h1
                className={cn(
                  'text-4xl leading-tight font-black tracking-tighter md:text-6xl',
                  'text-slate-900',
                )}
              >
                {data.title}
              </h1>
            </header>

            <p
              className={cn(
                'text-xl leading-relaxed font-medium',
                'text-slate-500',
              )}
            >
              {data.description}
            </p>
          </section>

          <aside
            className={cn(
              'h-fit space-y-6 rounded-3xl p-8',
              'border border-slate-100 bg-white shadow-sm',
            )}
          >
            <h3 className="text-lg font-bold text-slate-900">사진 정보</h3>
            <div className="space-y-4">
              {/* components.tsx에서 추출한 InfoItem 재사용 */}
              <InfoItem icon={<MapPin />} text={data.location} />
              <InfoItem icon={<Calendar />} text={data.date} />
            </div>
            <div className="h-px w-full bg-slate-100" />
            <button
              type="button"
              aria-disabled="true"
              className={cn(
                'cursor-not-allowed',
                'w-full rounded-2xl py-4 font-bold transition-all active:scale-95',
                'bg-slate-900 text-white shadow-lg shadow-slate-100 hover:bg-blue-600',
              )}
            >
              원본 다운로드
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}
