import { redirect } from 'next/navigation'

import { createMemoAction } from '@/actions/memo-actions'

interface Props {
  errorMessage?: string | string[]
}

export default async function MemoForm({ errorMessage }: Props) {
  // 오류 원인
  // 일반 서버 컴포넌트 (페이지 컴포넌트가 아님. 검색 매개변수 못 읽음)

  // 오류 해결 방법
  // 1. 서버 컴포넌트: 부모(페이지) 컴포넌트 -> 폼 컴포넌트 error prop 전달 ✅
  // 2. 클라이언트 컴포넌트화 (useSearchParams 훅)

  /**
   * createMemoAction 서버 액션을 정의합니다.
   * createMemoAction 서버 액션을 <form> 요소의 action 속성에 연결합니다.
   * 서버 컴포넌트에서 서버 액션을 처리하도록 구성하고, 생성과 동시에 화면이 업데이트되도록 구성합니다.
   * 클라이언트 컴포넌트에서 각 필드마다 에러 메시지를 표시하도록 구성합니다.
   */

  // 인라인 서버 액션 (Server Action)
  const handleAction = async (formData: FormData) => {
    'use server'

    const result = await createMemoAction(formData)

    if (!result.success) {
      // Next.js의 서버 함수
      // 페이지 리디렉션(redirection)
      redirect(`?error=${encodeURIComponent(result.error)}`)
    } else {
      redirect('/memos-crud')
    }
  }

  return (
    <form action={handleAction} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        aria-label="메모 제목"
        placeholder="메모 제목 (2글자 이상 입력)"
        required
        className="rounded-xl border border-slate-200 px-4 py-2"
      />
      <textarea
        name="content"
        aria-label="메모 내용"
        placeholder="메모 내용 작성 (최대 100글자)"
        required
        rows={3}
        className="min-h-40 rounded-xl border border-slate-200 px-4 py-2"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-xl bg-slate-900 py-2.5 font-bold text-white"
      >
        메모 저장
      </button>
      {errorMessage && errorMessage.length > 0 && (
        <p role="alert" className="px-3 py-1 font-medium text-red-700">
          {decodeURIComponent(errorMessage?.toString())}
        </p>
      )}
    </form>
  )
}
