'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createSupabase } from '@/lib/supabase/helpers'
import { isErrorObject } from '@/utils'

/* 타입 정의 (Types) ------------------------------------------------------------ */

export type AuthState = {
  success: boolean
  message?: string
  errors?: {
    email?: string[]
    password?: string[]
  }
} | null

/* 유효성 검사 스키마 ----------------------------------------------------------- */

const authSchema = z.object({
  email: z.string().trim().email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z.string().min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
})

/* 헬퍼 함수 (Helpers) ---------------------------------------------------------- */

/**
 * 발생한 에러 객체에서 메시지 문자열을 안전하게 추출합니다.
 */
const getErrorMessage = (error: unknown) => {
  return isErrorObject(error) ? error.message : String(error)
}

const REVALIDATE_PATH = '/auth-basic'


/* 서버 액션 (Actions) ---------------------------------------------------------- */

/**
 * [CREATE] 회원가입 액션
 */
export async function signUpAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  
  // 입력 데이터 추출 및 유효성 검사
  const rawData = Object.fromEntries(formData.entries())
  const validatedFields = authSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: '입력 정보를 확인해주세요.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Supabase 클라이언트 생성 및 가입 시도
    const supabase = await createSupabase()
    const { error } = await supabase.auth.signUp({ email, password })
    
    // Supabase에서 반환한 에러 처리 (예: 이미 가입된 이메일 등)
    if (error) throw error

    // 성공 시 캐시 갱신
    revalidatePath(REVALIDATE_PATH)
    
  } catch (error) {
    // 예외 발생 시 로그 기록 및 에러 메시지 반환
    console.error('회원가입 실패:', getErrorMessage(error))
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '회원가입 중 예상치 못한 오류가 발생했습니다.' 
    }
  }

  // 리다이렉트는 try-catch 블록 밖에서 수행 (Next.js 권장사항)
  redirect(REVALIDATE_PATH)
}

/**
 * [READ/CREATE] 로그인 액션 (세션 생성)
 */
export async function signInAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  
  const rawData = Object.fromEntries(formData.entries())
  const validatedFields = authSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: '입력한 정보가 올바르지 않습니다.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { email, password } = validatedFields.data

  try {
    const supabase = await createSupabase()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) throw error

    revalidatePath(REVALIDATE_PATH)
  } catch (error) {
    console.error('로그인 실패:', getErrorMessage(error))
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.' 
    }
  }

  redirect(REVALIDATE_PATH)
}

/**
 * [DELETE] 로그아웃 액션 (세션 삭제)
 */
export async function signOutAction(): Promise<void> {
  try {
    const supabase = await createSupabase()
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
    
    revalidatePath(REVALIDATE_PATH)
  } catch (error) {
    console.error('로그아웃 실패:', getErrorMessage(error))
    // 로그아웃 실패 시 대개 페이지 새로고침 등으로 대응하거나 무시할 수 있음
  }
}
