'use server'

import { wait } from '@/utils'
import z from 'zod'

// 오류 메시지 한글화 (국제화 i19n)
// import { ko } from 'zod/locales'
// z.config(ko())

/**
 * Zod 라이브러리를 설치하고 스키마를 정의합니다.
 * 정의된 스키마를 사용하는 게시글 생성 서버 액션을 정의하세요.
 */

const PostSchema = z.object({
  title: z
    .string('포스트 제목은 문자여야 합니다.')
    .min(3, '포스트 제목은 3글자 이상 입력하세요.')
    .max(20, '포스트 제목은 최대 20글자까지 입력 가능합니다.'),
  content: z
    .string('포스트 내용은 문자여야 합니다.')
    .min(3, '포스트 내용은 최소 3글자 이상 입력해야 합니다.')
    .max(100, '포스트 내용은 최대 100글자까지 작성 가능합니다.'),
})

export type Post = z.infer<typeof PostSchema>

export interface FormState {
  success: boolean // 성공 또는 실패
  errors?: string // 실패 메시지
  message?: string // 성공 메시지
}

// 포스트 작성 서버 액션 함수
export const createPostAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  
  await wait(1000)

  // const title = formData.get('title')?.toString()
  // const content = formData.get('content')?.toString()

  const rawFormData = Object.fromEntries(formData)
  // { title: '...', content: '...' }

  // PostSchema 스키마를 사용해 유효성 검증
  const result = PostSchema.safeParse(rawFormData)

  if (result.success) {
    return {
      success: true,
      message: '포스트 생성에 성공했습니다! 😃',
    }
  } else {
    return {
      success: false,
      errors: z.prettifyError(result.error),
    }
  }
}
