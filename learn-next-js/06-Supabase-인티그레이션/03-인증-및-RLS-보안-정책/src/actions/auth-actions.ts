'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 상태 타입 정의
export type AuthState = {
  success: boolean
  message?: string
  errors?: {
    email?: string[]
    password?: string[]
  }
} | null

const authSchema = z.object({
  email: z.string().trim().email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z.string().min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
})

/**
 * 가입 액션
 */
export async function signUpAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  
  const rawData = Object.fromEntries(formData.entries())
  const validatedFields = authSchema.safeParse(rawData)

  // 검증 실패 시 개별 에러 반환
  if (!validatedFields.success) {
    return {
      success: false,
      message: '입력 정보를 확인해주세요.',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { email, password } = validatedFields.data

  // 서버용 Supabase 클라이언트 생성

  // 검증된 email, password 정보로 회원가입(auth.signUp) 시도
  console.log({ email, password })
  const error = new Error('Supabase 회원가입 기능 설정이 필요합니다.')
  
  if (error) return { success: false, message: error.message }

  revalidatePath('/auth-basic')
  redirect('/auth-basic')
}

/**
 * 로그인 액션
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

  // 서버용 Supabase 클라이언트 생성

  // 검증된 email, password 정보로 로그인(auth.signInWithPassword) 시도
  console.log({ email, password })
  const error = new Error('Supabase 로그인 기능 설정이 필요합니다.')
  
  if (error) return { success: false, message: error.message }

  revalidatePath('/auth-basic')
  redirect('/auth-basic')
}

/**
 * 로그아웃 액션
 */
export async function signOutAction() {

  // 서버용 Supabase 클라이언트 생성
  // 로그아웃(auth.signOut) 시도
  
  revalidatePath('/auth-basic')
}