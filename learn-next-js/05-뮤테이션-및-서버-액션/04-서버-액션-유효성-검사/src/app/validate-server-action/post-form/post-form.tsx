'use client'

import { cn } from '@/utils'
import { CreaetPostButton } from './create-post-button'
import { ValidateStatus } from './validate-status'
import { PostTextarea } from './post-textarea'
import { PostInput } from './post-input'

/**
 * [초기 상태 정의]
 * 폼이 처음 렌더링될 때 사용할 기본값을 정의하세요.
 */


export default function PostForm() {

  /**
   * [useActionState 훅 사용]
   * 첫 번째 인자: 실행할 서버 액션 함수 (createPostAction)
   * 두 번째 인자: 폼의 초기 상태값 (initialState)
   * 반환값: [현재 상태(state), 실행할 액션 함수(formAction)]
   */

  return (
    <div
      className={cn(
        'w-full max-w-md rounded-[40px] bg-white p-8',
        'border border-blue-100 shadow-[0_20px_50px_rgba(0,100,255,0.05)]',
      )}
    >
      {/* 
          form 태그의 action 속성에 useActionState에서 받은 formAction을 연결합니다. 
          제출 시 자동으로 서버 액션이 호출되며 state가 업데이트됩니다.
      */}
      <form className="space-y-6">

        <PostInput
          label="제목"
          name="title"
          placeholder="3~20자 사이로 입력해주세요"
        />

        <PostTextarea 
          label="내용"
          name="content"
          placeholder="상세 내용을 입력해주세요. (최대 100자 입력 가능)"
        />

        {/* 폼 상태를 전달해 서버의 응답을 화면에 표시합니다. */}
        <ValidateStatus />

        {/* 폼 전송 상태를 컴포넌트 내부에서 처리해보세요. */}
        <CreaetPostButton />

      </form>
    </div>
  )
}