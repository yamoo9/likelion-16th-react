'use client'

import { use } from 'react'
import { Calendar, ChevronLeft, ChevronRight, MapPin, Maximize2, X } from 'lucide-react'

import { cn } from '@/utils'
import { PHOTO_DATA } from '@/app/gallery/_resouces/data'
import { usePhotoModal } from '@/app/gallery/_resouces/usePhotoModal'
import { NavigationLink, InfoItem } from '@/app/gallery/_resouces/components'

export default function PhotoModal(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params)
  const { modalRef, prevId, nextId, closeModal } = usePhotoModal(id)
  const data = PHOTO_DATA[id] ?? PHOTO_DATA['1']

  return (
    <div
    onClick={(e) => e.target === e.currentTarget && closeModal()}
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12',
        'bg-slate-900/90 backdrop-blur-2xl'
      )}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          'relative flex w-full max-w-6xl flex-col md:flex-row overflow-hidden outline-none',
          'bg-white shadow-2xl rounded-[40px] md:rounded-[64px]'
        )}
      >
        
        <section className={cn(
          'relative w-full overflow-hidden aspect-4/3 md:aspect-auto md:flex-[1.4]',
          'bg-black'
        )}>
          <img
            src={`https://picsum.photos/seed/${id}/1200/800`}
            alt={data.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-4 top-1/2 z-10 flex -translate-y-1/2 justify-between md:inset-x-8">
            <NavigationLink href={`/gallery/photo/${prevId}`} icon={<ChevronLeft />} label="이전" />
            <NavigationLink href={`/gallery/photo/${nextId}`} icon={<ChevronRight />} label="다음" />
          </div>
        </section>

        {/* 정보 상세 섹션 */}
        <section className={cn(
          'relative z-20 flex flex-1 flex-col justify-between p-8 md:p-16 lg:p-20',
          'bg-white'
        )}>
          <div className="space-y-6 md:space-y-8">
            <header className="space-y-3">
              <div className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-bold',
                'bg-blue-50 text-[10px] text-blue-600 md:text-xs'
              )}>
                <Maximize2 className="h-3.5 w-3.5" /> 사진 상세 보기
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight font-black tracking-tighter text-slate-900">
                {data.title}
              </h2>
            </header>

            <div className="space-y-3 md:space-y-4">
              <InfoItem icon={<MapPin />} text={data.location} />
              <InfoItem icon={<Calendar />} text={data.date} />
            </div>

            <div className="h-px w-full bg-slate-100" />
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-medium text-slate-500">
              {data.description}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className={cn(
              'close-trigger mt-8 w-full py-5 md:py-6 font-bold text-lg md:text-xl rounded-3xl md:rounded-4xl',
              'bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200',
              'transition-all active:scale-[0.98]'
            )}
          >
            닫기
          </button>
        </section>

        <button
          type="button"
          onClick={closeModal}
          className={cn(
            'absolute z-30 top-6 right-6 md:top-10 md:right-10 p-3 rounded-full transition-colors',
            'bg-white/50 md:bg-transparent text-slate-400 backdrop-blur-md md:backdrop-blur-none hover:bg-slate-100'
          )}
          aria-label="모달 닫기"
        >
          <X className="h-6 w-6 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}