'use client'

import { useActionState } from 'react'

import { cn } from '@/utils'
import { createPostAction, type FormState } from '@/actions/post-actions'
import { CreaetPostButton } from './create-post-button'
import { PostTextarea } from './post-textarea'
import { PostInput } from './post-input'

/**
 * [초기 상태 정의]
 * 폼이 처음 렌더링될 때 사용할 기본값을 정의하세요.
 */

const initialFormState: FormState = {
  success: false,
}

export default function PostForm() {
  const [state, formAction] = useActionState(createPostAction, initialFormState)

  const titleError = state.errors?.title?.errors
  const contentError = state.errors?.content?.errors

  return (
    <div
      className={cn(
        'w-full max-w-lg rounded-[40px] bg-white p-8',
        'border border-blue-100 shadow-[0_20px_50px_rgba(0,100,255,0.05)]',
      )}
    >
      <form action={formAction} className="flex flex-col gap-6">
        <div>
          <PostInput
            label="제목"
            name="title"
            placeholder="3~20자 사이로 입력해주세요"
            aria-invalid={titleError ? 'true' : 'false'}
          />
          {titleError && (
            <span role="alert" className="font-medium text-red-600">
              {titleError.at(0)}
            </span>
          )}
        </div>

        <div>
          <PostTextarea
            label="내용"
            name="content"
            placeholder="상세 내용을 입력해주세요. (최대 100자 입력 가능)"
            aria-invalid={contentError ? 'true' : 'false'}
          />
          {contentError && (
            <span role="alert" className="font-medium text-red-600">
              {contentError.at(0)}
            </span>
          )}
        </div>

        {/* 폼 상태를 전달해 서버의 응답을 화면에 표시합니다. */}
        {/* <ValidateStatus state={state} /> */}

        {state?.message && (
          <p className='text-emerald-700 font-bold'>{state.message}</p>
        )}

        {/* 폼 전송 상태를 컴포넌트 내부에서 처리해보세요. */}
        <CreaetPostButton />
      </form>
    </div>
  )
}
