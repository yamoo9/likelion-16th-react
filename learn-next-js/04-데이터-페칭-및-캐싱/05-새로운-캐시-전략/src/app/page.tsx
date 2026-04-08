import { LucideShieldCheck, LucideZap } from 'lucide-react'
import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

/**
 * [Next.js 15/16 새로운 캐시 전략]
 * 
 * 'use cache' 지시어 (cache-directive)
 * - 함수나 파일 상단에 선언하여 해당 로직의 결과값을 캐싱합니다.
 * - 기존의 복잡한 fetch 옵션이나 unstable_cache를 대체하는 직관적인 방식입니다.
 * 
 * 정교한 캐시 제어 (cache-control)
 * - cacheLife: 캐시의 유효 기간을 프로필(seconds, minutes, days 등) 기반으로 설정합니다.
 * - cacheTag: 특정 태그를 부여하여 나중에 정밀하게 캐시를 무효화(revalidate) 가능합니다.
 */

export default function NewCacheStrategyPage() {
  return (
    <section className="w-full py-12">
      <header className="mx-auto mb-12 max-w-4xl px-6 text-center">
        <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Next.js 16의 새로운 캐시 전략
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          기존의 복잡한 캐싱 설정을 넘어, 선언적이고<br className="hidden md:block" />
          직관적인 차세대 캐싱 시스템을 학습합니다.
        </p>
      </header>

      <div
        className={cn(
          'mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 p-6',
          'md:grid-cols-2 md:p-0',
        )}
      >
        {/* 
          'use cache' 지시어 활용 
          - 라우트: /cache-directive
          - 특징: 함수 단위 캐싱으로 코드 가독성 및 재사용성 극대화
        */}
        <LinkCard
          href="/cache-directive"
          title="'use cache' 디렉티브"
          actionLabel="디렉티브 기반 캐싱 실습"
          description="함수 상단에 디렉티브를 추가하여 복잡한 설정 없이 데이터를 캐싱하는 방법을 배웁니다."
          icon={LucideZap}
        />

        {/* 
          정교한 캐시 제어 (Life & Tag)
          - 라우트: /cache-control
          - 특징: 캐시 수명 정의 및 특정 조건 기반 무효화
        */}
        <LinkCard
          color="emerald"
          href="/cache-control"
          title="캐시 수명 및 태그 제어"
          actionLabel="정밀한 캐시 관리 실습"
          description="cacheLife()와 cacheTag()를 사용하여 캐시 유효 기간과 무효화 시점을 정교하게 제어합니다."
          icon={LucideShieldCheck}
        />
      </div>
    </section>
  )
}