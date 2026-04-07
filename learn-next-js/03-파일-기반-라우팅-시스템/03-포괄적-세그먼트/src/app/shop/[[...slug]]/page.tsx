import { Fragment } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Laptop,
  Tag,
  Smartphone,
  Watch,
} from 'lucide-react'
import { cn } from '@/utils'

const getShopData = (depth: number, slug: string[]) => {
    if (depth === 0) {
      return [
        {
          title: '전자제품',
          path: '전자제품',
          icon: Laptop,
          desc: '최신 기술이 집약된 디지털 기기',
        },
        {
          title: '패션의류',
          path: '패션의류',
          icon: Tag,
          desc: '당신의 스타일을 완성할 시즌 아이템',
        },
      ]
    }
    if (depth === 1 && slug[0] === '전자제품') {
      return [
        {
          title: '스마트폰',
          path: '스마트폰',
          icon: Smartphone,
          desc: '한 손안의 무한한 가능성',
        },
        {
          title: '워치/밴드',
          path: '워치-밴드',
          icon: Watch,
          desc: '당신의 일상을 기록하는 웨어러블',
        },
      ]
    }
    return []
  }

export default async function ShopPage({ params }: PageProps<'/shop/[[...slug]]'>) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.map((s) => decodeURIComponent(s)) || []
  console.log(slug)

  const depth = slug.length
  const lastTitle = slug.at(-1) || '전체 카테고리'
  const nextCategories = getShopData(depth, slug)

  return (
    <div className="w-full space-y-12">
      {/* 상단 경로 안내 (Breadcrumb) */}
      <nav className="flex h-10 items-center gap-x-1 text-sm font-bold text-slate-400">
        <Link
          href="/shop"
          className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-emerald-600"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Store</span>
        </Link>

        {slug.map((segment, index) => {
          const isLast = index === slug.length - 1
          const href = `/shop/${slug.slice(0, index + 1).join('/')}`
          return (
            <Fragment key={index}>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              <Link
                href={href}
                className={cn(
                  'rounded-full border px-3 py-1 transition-all',
                  isLast
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                    : 'border-transparent hover:bg-emerald-50 hover:text-emerald-600',
                )}
              >
                {segment}
              </Link>
            </Fragment>
          )
        })}
      </nav>

      {/* 페이지 헤더 */}
      <header className="space-y-5">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase md:text-6xl">
          {lastTitle}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed font-medium text-slate-500">
          {depth === 0
            ? '어반립 스토어에서 엄선한 프리미엄 컬렉션을 만나보세요.'
            : `"${lastTitle}" 카테고리의 베스트 상품을 추천해 드립니다.`}
        </p>
      </header>

      {/* 카테고리 카드 또는 상품 리스트 */}
      {nextCategories.length > 0 ? (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {nextCategories.map((item) => (
            <Link
              key={item.path}
              href={`/shop/${slug.length > 0 ? slug.join('/') + '/' : ''}${item.path}`}
              className={cn(
                'group relative overflow-hidden p-10',
                'rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40',
                'transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500',
              )}
            >
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-emerald-50 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex rounded-3xl bg-slate-50 p-4 text-slate-400 transition-all duration-500 group-hover:bg-emerald-600 group-hover:text-white">
                  <item.icon className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed font-medium text-slate-400">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 text-sm font-black text-emerald-600">
                  <span>카테고리 보기</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="group rounded-4xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/30 transition-all hover:-translate-y-1 hover:border-emerald-500"
            >
              <div className="mb-4 aspect-square overflow-hidden rounded-2xl bg-slate-50">
                <div className="h-full w-full bg-linear-to-br from-slate-50 to-slate-100 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">
                  {lastTitle} 상품 {i}
                </h4>
                <p className="text-lg font-black text-emerald-600">
                  1,290,000원
                </p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
