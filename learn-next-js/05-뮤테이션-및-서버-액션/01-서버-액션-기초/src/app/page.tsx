import { LucideMousePointer2, LucideZap } from 'lucide-react'
import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

/**
 * [Next.js 서버 액션(Server Actions) 기초]
 * 
 * 서버 액션이란?
 * - 서버에서 실행되는 비동기 함수로, 'use server' 지시어로 정의합니다.
 * - 별도의 API 라우트 핸들러(예: POST)를 만들지 않고도 DB 수정, 로그인 등을 처리할 수 있습니다.
 * 
 * 호출 방식의 차이
 * - 서버 사이드: '데이터(Data)' 기반. URL(searchParams)을 통해 상태를 전달하며, 전통적인 웹의 작동 방식을 따릅니다.
 * - 클라이언트 사이드: '상태(State)' 기반. useTransition으로 로딩을 제어하고 클라이언트 메모리에 에러를 담습니다.
 * 
 * 점진적 향상 (Progressive Enhancement)
 * - 서버 사이드 방식은 브라우저의 JavaScript가 로드되지 않거나 꺼져 있는 환경에서도 
 *   <form>과 리디렉션만으로 완벽하게 작동하는 강력한 안정성을 제공합니다.
 * 
 * 서버 액션의 장점
 * - 클라이언트 번들 크기가 감소합니다. (서버 로직이 브라우저로 전송되지 않음)
 * - 데이터 변경 후, 'revalidatePath'를 통한 즉각적인 서버 캐시 갱신 및 UI 업데이트가 가능합니다.
 */

export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section
        className={cn(
          'grid grid-cols-1 gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0'
        )}
      >
        {/* 
          클라이언트 사이드 서버 액션 처리
          - 특징: 인터랙티브한 UI 피드백 (로딩 스피너, 성공 메시지 등) 제공 가능
          - 상태 관리: 클라이언트 측 메모리에서 에러/성공 상태 관리 (useTransition, useState 훅 활용)
        */}
        <LinkCard
          href="/client-side"
          title="클라이언트 사이드"
          actionLabel="클라이언트 측 서버 액션 처리"
          description="클라이언트 컴포넌트에서 상태를 관리하며 호출합니다. 즉각적인 로딩 피드백과 세밀한 UI 인터랙션이 가능합니다."
          icon={LucideMousePointer2}
        />

        {/* 
          서버 사이드 서버 액션 처리
          - 특징: JavaScript가 로드되지 않은 환경에서도 폼 제출이 가능한 강력한 안정성 (점진적 향상)
          - 상태 관리: URL 파라미터를 통한 상태 전달 (서버 리디렉션 후 searchParams를 활용 에러 메시지 표시)
        */}
        <LinkCard
          color="emerald"
          href="/server-side"
          title="서버 사이드"
          actionLabel="서버 측 서버 액션 처리"
          description="서버 컴포넌트에서 직접 서버 액션을 호출합니다. URL 기반의 상태 관리와 강력한 안정성을 제공하는 Next.js의 표준 방식입니다."
          icon={LucideZap}
        />
      </section>
    </div>
  )
}