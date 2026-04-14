'use server'

import { revalidatePath } from 'next/cache'

import { getErrorMessage } from '@/utils'
import { createSupabase } from '@/lib/supabase/helpers'
import z from 'zod'

/* DB 테이블 이름 및 갱신할 페이지 경로 정의 ------------------------------------------- */

const DB_NAME = 'memolist'
const REVALIDATE_PATH = '/memos-crud'

/* 타입 정의 (Types) ------------------------------------------------------------ */

export type Memo = {
  id: string
  created_at: string
  updated_at: string
  title: string
  content: string
}

// 생성 시 필요한 타입 (id, 날짜 제외)
export type MemoInsert = Pick<Memo, 'title' | 'content'>

// 수정 시 필요한 타입 (옵셔널 title, content)
export type MemoUpdate = Partial<MemoInsert>

// 액션 응답 반환 공통 타입
export type ActionResponse<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }

/* 메모 생성 스키마 --------------------------------------------------------------- */

const MemoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, '메모 제목은 최소 2글자 이상 입력해야 합니다.')
    .max(16, '메모 제목은 최대 16글자까지만 입력 가능합니다.'),
  content: z
    .string()
    .trim()
    .min(5, '메모 내용은 최소 5글자 이상 입력해야 합니다.')
    .max(100, '메모 내용은 최대 100글자로 작성해야 합니다.'),
})

// 메모 생성 폼의 상태 타입
export type MemoFormState = z.infer<typeof MemoSchema>

/* 서버 액션 (Actions) ---------------------------------------------------------- */

/**
 * [CREATE] 새로운 메모를 생성합니다.
 * @param formData 폼 데이터 { title, content }
 */
export const createMemoAction = async (
  formData: FormData,
): Promise<ActionResponse<Memo>> => {
  // 사용자가 입력한 폼 데이터 값 추출
  const title = formData.get('title')?.toString().trim()
  const content = formData.get('content')?.toString().trim()
  
  // 서버 측 유효성 검사: 예측 가능한 에러 (사용자 실수)
  // Zod를 사용한 입력 값 검증(Safe Parse -> Validation)
  const result = MemoSchema.safeParse({ title, content })

  // Supabase 데이터베이스에 연결할 필요없이 바로 실패 응답 결과 반환
  if (!result.success) {
    
    // 각 필드마다 에러를 표시하고자 할 경우 (클라이언트 화면용)
    // const treeifyError = z.treeifyError(result.error)
    // console.log(treeifyError)

    // 전체 에러 메시지를 화면에 표시할 경우 (서버 터미널 디버깅용)
    const prettifyError = z.prettifyError(result.error)

    return {
      success: false,
      error: prettifyError,
    }
  }

  try {
    const supabase = await createSupabase()
    const newMemo: MemoInsert = result.data

    const { error, data } = await supabase
      .from(DB_NAME) // DB에서
      .insert([newMemo]) // 새 메모 추가
      .select('*')
      .single()

    // 예측할 수 없는 로직 또는 API 에러 발생 시, catch 절로 던짐
    if (error) throw error

    // Next.js 서버의 라우트 캐시 재검증
    // (Supabase의 생성 결과 바로 화면에 반영)
    revalidatePath(REVALIDATE_PATH)

    // 클라이언트에 성공 응답 반환
    return {
      success: true,
      data: data as Memo,
    }
  } catch (error) {
    // 서버 디버깅용 로그
    console.log(`메모 생성 실패`, getErrorMessage(error))

    // 클라이언트에 실패 응답 반환
    return {
      success: false,
      error: '메모를 생성하지 못했습니다.',
    }
  }
}

/**
 * [READ] 메모 리스트를 가져옵니다. (단순 조회용)
 * @param limit 가져올 메모의 개수
 */
export const readMemoAction = async (
  limit = 10,
): Promise<ActionResponse<Memo[]>> => {
  try {
    // Supabase 인스턴스 생성 (서버용)
    const supabase = await createSupabase()

    // Supabase 'memolist' 데이터베이스에서 데이터 가져오기
    const { error, data } = await supabase
      .from(DB_NAME)
      .select('*')
      .order('created_at', { ascending: false }) // decending 최신순 정렬
      .limit(limit) // 개수 제한

    if (error) throw error // 에러가 있을 경우, 에러 던짐 (catch 절에서 처리)

    // 응답 성공 시, 반환 값
    return {
      success: true,
      data: (data as Memo[]) ?? [],
    }
  } catch (error) {
    // 서버 디버깅 로그용
    console.error('메모 리스트 가져오기 실패', getErrorMessage(error))

    // 응답 실패 시, 반환 값
    return {
      success: false,
      error: '메모 리스트 데이터 가져오기에 실패했습니다.',
    }
  }
}

// [UPDATE] 기존 메모의 내용을 수정합니다.
export const updateMemoAction = async (memoId: Memo['id'], updateMemo: MemoUpdate) => {
  // 서버 측 유효성 검사: 예측 가능한 에러 (사용자 실수)
  // Zod를 사용한 입력 값 검증(Safe Parse -> Validation)
  const result = MemoSchema.safeParse(updateMemo)

  // Supabase 데이터베이스에 연결할 필요없이 바로 실패 응답 결과 반환
  if (!result.success) {
    
    // 각 필드마다 에러를 표시하고자 할 경우 (클라이언트 화면용)
    // const treeifyError = z.treeifyError(result.error)
    // console.log(treeifyError)

    // 전체 에러 메시지를 화면에 표시할 경우 (서버 터미널 디버깅용)
    const prettifyError = z.prettifyError(result.error)

    return {
      success: false,
      error: prettifyError,
    }
  }

  try {
    const supabase = await createSupabase()

    const { error, data } = await supabase
      .from(DB_NAME)
      .update(result.data)
      .eq('id', memoId)
      .select('*')
      .single()

    if (error) throw error

    revalidatePath(REVALIDATE_PATH)

    return {
      success: true,
      data: (data as Memo)
    }
  } catch(error) {
    console.error('메모 수정 실패', getErrorMessage(error))
    return {
      success: false,
      error: '메모 수정에 실패했습니다.'
    }
  }
}

// [DELETE] 특정 메모를 삭제합니다.
export const deleteMemoAction = async () => {
  
}

/* -------------------------------------------------------------------------- */

// [READ] 특정 ID를 가진 메모 하나를 조회합니다.

// [READ] 페이지네이션 처리가 된 메모 목록을 가져옵니다.

// [READ] 제목 또는 내용에 검색어가 포함된 메모를 찾습니다.
