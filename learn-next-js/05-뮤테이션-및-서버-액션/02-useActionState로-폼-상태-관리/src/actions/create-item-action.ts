'use server'

import { wait } from '@/utils'
import { revalidatePath } from 'next/cache'

export interface FormState {
  success: boolean
  message?: string
  error?: string
}

// 리듀서 액션 함수 (useActionState에 전달될 서버 함수)
export async function createItemAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = formData.get('title')?.toString().trim()

  try {
    if (!title) {
      return {
        ...prevState,
        success: false,
        error: '내용을 입력해주세요.',
      }
    }

    if (title.length < 2) {
      return {
        ...prevState,
        success: false,
        error: '아이템 이름은 최소 2글자 이상이어야 합니다.',
      }
    }

    if (/바보|멍청이|또라이/.test(title)) {
      return {
        ...prevState,
        success: false,
        error: '부적절한 단어가 포함되어 있습니다.',
      }
    }

    await wait(1200)

    if (Math.random() > 0.8) {
      throw new Error('데이터베이스 연결에 실패했습니다.')
    }

    console.log(`[서버 액션 실행] 생성된 아이템: ${title}`)

    revalidatePath('/server-side')
    revalidatePath('/client-side')
  } catch (error) {
    console.error('서버 액션 에러:', error)
    return {
      ...prevState,
      success: false,
      error: '서버에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
    }
  }

  return {
    ...prevState,
    success: true,
    message: `"${title}" 아이템이 성공적으로 생성되었습니다.`,
  }
}
