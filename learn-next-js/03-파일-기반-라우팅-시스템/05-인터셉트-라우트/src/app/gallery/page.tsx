import { cn } from '@/utils'
import { ArrowRight, Layout } from 'lucide-react'
import Link from 'next/link'

const PHOTOS = [
  {
    id: '1',
    title: '얼반 아키텍처',
    desc: '도시의 선과 면이 만나는 지점',
  },
  { id: '2', title: '미니멀 인테리어', desc: '공간의 미학을 담은 인테리어' },
  { id: '3', title: '네이처 텍스처', desc: '자연이 만들어낸 섬세한 질감' },
]

export default function GalleryPage() {
  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 space-y-16 duration-1000',
      )}
    >
      <header className={cn('space-y-3')}>
        <h1 className={cn('text-5xl font-black tracking-tight text-slate-900')}>
          갤러리
        </h1>
        <p className={cn('text-xl font-medium text-slate-400')}>
          Next.js의 인터셉트 라우트 개념을 학습합니다.
        </p>
      </header>

      <div
        className={cn('grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3')}
      >
        {PHOTOS.map((photo) => (
          /* 카드 전체를 Link로 감싸기 */
          <Link
            key={photo.id}
            href={`/gallery/photo/${photo.id}`}
            className={cn(
              'group block rounded-[56px] border border-slate-100 bg-white p-12 shadow-sm outline-none',
              'transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/10',
              'focus-visible:ring-4 focus-visible:ring-blue-500/20',
            )}
          >
            <div
              className={cn(
                'mb-10 flex h-20 w-20 items-center justify-center rounded-[28px] bg-blue-50 transition-colors group-hover:bg-blue-600',
              )}
            >
              <Layout
                className={cn(
                  'h-10 w-10 text-blue-600 transition-colors group-hover:text-white',
                )}
              />
            </div>

            <div className={cn('mb-12 space-y-4')}>
              <h2 className={cn('text-2xl font-bold text-slate-900')}>
                {photo.title}
              </h2>
              <p
                className={cn(
                  'text-sm tracking-wider leading-relaxed font-medium text-slate-400',
                )}
              >
                {photo.desc} 개념을 학습합니다.
              </p>
            </div>

            <div
              className={cn(
                'inline-flex items-center gap-2 text-lg font-bold text-blue-600 transition-all group-hover:gap-4',
              )}
            >
              갤러리 모달 보기 <ArrowRight className="h-6 w-6" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
