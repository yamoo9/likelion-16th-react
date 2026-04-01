import { Star, ShieldCheck, Truck, Info, ExternalLink } from 'lucide-react'
import { cn, wait } from '@/utils'

const product = {
  id: 'GM0024112633266',
  name: '프리미엄 에센셜 울 블렌드 코트',
  description: `전체적으로 여유있게 떨어지는 오버사이즈 실루엣과 롱한 기장이 어우러져 스타일리시한 무드를 자아내는 코트입니다. 어깨 내부에 패드를 더해 부드럽게 각이지는 실루엣을 연출하며, 서로 다른 컬러를 은은하게 믹스한 멜란지 컬러감과 와이드한 노치드 라펠 디자인으로 섬세하게 완성했습니다. 뒤 밑단에 슬릿으로 활동성을 높여주었습니다.`,
  images: [
    'https://img.eqlstore.com/cont/web/attach_img/temp/731289788924597.jpg',
    'https://img.eqlstore.com/cont/web/attach_img/temp/731290576306913.jpg',
  ],
  link: 'https://m.eqlstore.com/product/GM0024112633266/detail',
  features: ['천연 울 80% 함유', '정교한 테일러링', '안감 정전기 방지 처리'],
  price: 1080000,
  rating: 4.8,
  reviews: 124,
}

export default async function Product() {
  await wait(400)

  return (
    <article
      className={cn(
        'animate-in fade-in slide-in-from-bottom-4 duration-700',
        'mx-auto flex max-w-2xl flex-col gap-8',
      )}
      aria-labelledby="product-title"
    >
      {/* 상품 이미지 섹션 */}
      <section className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-inner">
        <div className={cn('flex relative w-1/2 rounded-2xl')}>
          {product.images.map((src) => (
            <img
              key={src}
              src={src}
              alt={`${product.name} 착용 컷 - 멜란지 컬러의 오버사이즈 실루엣`}
              className={cn(
                'object-cover',
                'transition-transform duration-700 group-hover:scale-105',
              )}
            />
          ))}
        </div>

        {/* 이미지 위 배지 */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            lang="en"
            className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black tracking-tighter text-slate-900 uppercase shadow-sm backdrop-blur-md"
          >
            Premium Edition
          </span>
        </div>
      </section>

      <div className="space-y-8 px-1">
        {/* 상품 기본 정보 */}
        <header className="space-y-4">
          <div className="space-y-2">
            <h2
              id="product-title"
              className="text-3xl leading-[1.1] font-black tracking-tight text-slate-900"
            >
              {product.name}
            </h2>
            <p className="text-[11px] font-medium tracking-widest text-slate-400 uppercase">
              상품 ID — {product.id}
            </p>
          </div>

          <div className="flex items-end justify-between border-b border-slate-100 pb-6">
            <div className="flex flex-col gap-1">
              <span className="sr-only">판매 가격:</span>
              <div className="flex items-baseline gap-1.5">
                <strong className="text-3xl font-black text-slate-900">
                  {product.price.toLocaleString()}
                </strong>
                <span className="text-lg font-bold text-slate-500">원</span>
              </div>
            </div>

            <div
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2"
              aria-label={`평점 5점 만점에 ${product.rating}점, 리뷰 ${product.reviews}개`}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < Math.floor(product.rating)
                        ? 'fill-teal-500 text-teal-500'
                        : 'text-slate-300',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span
                className="text-sm font-black text-slate-700"
                aria-hidden="true"
              >
                {product.rating}
              </span>
              <span
                className="border-l pl-2 text-[10px] font-bold text-slate-400"
                aria-hidden="true"
              >
                REVIEWS {product.reviews}
              </span>
            </div>
          </div>
        </header>

        {/*  상품 상세 설명 */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Info className="h-4 w-4 text-teal-600" />
            상품 상세 설명
          </h3>
          <p
            className={cn(
              'text-[15px] leading-relaxed font-medium text-slate-600',
              'rounded-2xl border border-slate-100/50 bg-slate-50/50 p-6',
            )}
          >
            {product.description}
          </p>
        </section>

        {/* 주요 특징 및 배송 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <section className="space-y-4 rounded-3xl border border-teal-100/50 bg-teal-50/30 p-6">
            <h3 className="text-xs font-black tracking-widest text-teal-800 uppercase">
              Specifications
            </h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <ShieldCheck
                    className="h-4 w-4 shrink-0 text-teal-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-teal-400" aria-hidden="true" />
              <h3 className="text-xs font-black tracking-widest uppercase">
                Shipping Info
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold">무료 익일 배송</p>
              <p className="text-[11px] leading-normal text-slate-400">
                지금 결제 시 내일 도착 보장.
                <br />
                프리미엄 회원 전용 무료 반품 포함.
              </p>
            </div>
          </section>
        </div>

        {/* 외부 링크 */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-4',
            'border-2 border-slate-900 bg-white text-sm font-black text-slate-900',
            'transition-all duration-300 hover:bg-slate-900 hover:text-white',
            'focus:outline-foreground'
          )}
        >
          공식 스토어에서 보기
          <ExternalLink className="h-4 w-4" aria-label="(새 창 열림)" />
        </a>
      </div>
    </article>
  )
}
