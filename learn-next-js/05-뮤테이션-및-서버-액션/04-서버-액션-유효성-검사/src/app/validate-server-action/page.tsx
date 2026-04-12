import { LucideShieldCheck } from 'lucide-react'

import { cn } from '@/utils'
import PostForm from './post-form/post-form'

/**
 * [서버-액션-유효성-검사 (Server Action Validation)]
 * 
 * 개념
 *   - 클라이언트에서 넘어온 데이터를 서버 액션 내부에서 Zod 스키마를 통해 검증합니다.
 *   - Zod는 TypeScript 우선의 스키마 선언 및 유효성 검사 라이브러리입니다.
 *   - 입력 데이터가 서버로 전송되기 전/후에 규칙(길이, 타입 등)을 지켰는지 검증합니다.
 *   - 보안과 데이터 무결성을 위해 서버 측 검증은 필수적입니다.
 * 
 * z.prettifyError() 활용
 *   - 기존의 flatten()이나 format() 대신 권장되는 최신 에러 포맷팅 방식입니다.
 *   - 복잡한 ZodError 객체를 사람이 읽기 쉬운(Human-readable) 문자열로 즉시 변환합니다.
 *   - "✖ [에러내용] → at [필드명]" 형태의 직관적인 피드백을 제공합니다.
 * 
 * 구현 단계
 *   1. [Schema] z.object()로 입력 데이터의 규칙을 정의합니다.
 *   2. [Action] safeParse()로 검증을 실행하고, 실패 시 z.prettifyError() 결과를 반환합니다.
 *   3. [UI] useActionState()로 에러 메시지를 받아 화면에 <pre> 태그로 렌더링합니다.
 * 
 * 주요 장점
 *  - 개발자 생산성 향상: 복잡한 에러 매핑 로직을 직접 짤 필요가 없습니다.
 *  - 사용자 경험 개선: 어떤 필드에서 어떤 문제가 발생했는지 명확하게 전달합니다.
 * 
 * 주요 활용 사례
 *  - 회원가입/로그인 폼 검증, 게시글 작성 시 글자 수 제한, API 파라미터 유효성 체크 등
 */

export default function PostsPage() {
  return (
    <main className={cn('flex grow flex-col items-center px-4 py-16')}>
      <div className={cn('mb-12 text-center')}>

        <div
          className={cn(
            'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl',
            'bg-blue-600 text-white shadow-lg shadow-blue-200',
          )}
        >
          <LucideShieldCheck size={32} />
        </div>

        <h1
          className={cn(
            'mb-3 text-4xl font-black tracking-tight text-slate-900',
          )}
        >
          서버 액션 유효성 검사
        </h1>

        <p className={cn('mx-auto max-w-md leading-normal text-slate-500')}>
          Zod 라이브러리를 사용하여 서버 액션의 입력값을 <br />
          <span className={cn('font-semibold text-blue-600')}>
            안전하고 직관적으로 검증
          </span>
          하는 방법을 학습합니다.
        </p>
      </div>

      <PostForm />
    </main>
  )
}
