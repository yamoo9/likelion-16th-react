'use server'

import { revalidatePath } from 'next/cache'

import { createSupabase } from '@/lib/supabase/helpers'
import { getErrorMessage } from '@/utils'

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

// 수정 시 필요한 타입 (일부 필드만 수정 가능하도록 Partial 사용)
export type MemoUpdate = Partial<MemoInsert & { 'updated_at': string }>

// 서버 액션의 공통 응답 구조 (성공 여부에 따른 유니온 타입)
export type ActionResponse<T> = 
  | { success: true, data: T }
  | { success: false, error: string }

// 페이지네이션 응답을 위한 타입
export type MemoPagination = {
  items: Memo[]
  totalCount: number
  currentPage: number
  totalPages: number
  hasNextPage: boolean
}

/* 서버 액션 (Actions) ---------------------------------------------------------- */

/**
 * [CREATE] 새로운 메모를 생성합니다.
 * @param formData - 제목(title)과 내용(content)이 담긴 폼 데이터
 */
export const createMemoAction = async (formData: FormData): Promise<ActionResponse<Memo>> => {
  
  // 사용자 입력 가져오기
  const title = formData.get('title')?.toString().trim()
  const content = formData.get('content')?.toString().trim()
  
  // 유효성 검사 (사용자 실수: 예상 가능한 오류는 return으로 처리)
  if (!title || !content) {
    return { success: false, error: '메모 제목 또는 내용을 입력해야 합니다.' }
  }

  try {
    const newMemo: MemoInsert = { title, content }
    const supabase = await createSupabase()

    // DB Insert 실행
    const { error, data } = await supabase
      .from(DB_NAME)
      .insert([newMemo])
      .select('*')
      .single() // 생성된 데이터 1건을 즉시 반환받음
    
    if (error) throw error
    
    // 캐시 갱신 (목록 페이지에 즉시 반영)
    revalidatePath(REVALIDATE_PATH)

    return { success: true, data: data as Memo }
  } catch(error) {
    console.error(`${DB_NAME} 생성 실패:`, getErrorMessage(error))
    return { success: false, error: '메모 생성 중 오류가 발생했습니다.' }
  }
}

/**
 * [READ] 메모 목록을 가져옵니다. (단순 조회용)
 * @param limit - 가져올 데이터 개수 제한
 */
export const readMemoAction = async (limit = 10): Promise<ActionResponse<Memo[]>> => {
  try {
    const supabase = await createSupabase()

    const { error, data } = await supabase
      .from(DB_NAME)
      .select('*')
      .order('created_at', { ascending: false }) // 최신순 정렬
      .limit(limit)

    if (error) throw error

    return { success: true, data: data as Memo[] }
  } catch(error) {
    console.error(`${DB_NAME} 목록 조회 실패:`, getErrorMessage(error))
    return { success: false, error: '메모 리스트를 가져오지 못했습니다.' }
  }
}

/**
 * [READ] 특정 ID를 가진 메모 하나를 조회합니다.
 */
export const readMemoByIdAction = async (id: Memo['id']): Promise<ActionResponse<Memo|null>> => {
  try {
    const supabase = await createSupabase()

    const { error, data } = await supabase
      .from(DB_NAME)
      .select('*')
      .eq('id', id)
      .maybeSingle() // 데이터가 없어도 에러를 던지지 않고 null 반환

    if (error) throw error

    return { success: true, data: (data as Memo) ?? null }
  } catch (error) {
    console.error(`${DB_NAME} ID 조회 실패 (${id}):`, getErrorMessage(error))
    return { success: false, error: '메모를 찾을 수 없습니다.' }
  }
}

/**
 * [READ] 페이지네이션 처리가 된 메모 목록을 가져옵니다.
 * @param page - 현재 페이지 번호 (1부터 시작)
 * @param limit - 한 페이지에 보여줄 개수
 */
export const paginateMemoAction = async (page = 1, limit = 10): Promise<ActionResponse<MemoPagination>> => {
  
  // Supabase의 range 인덱스 기준: 0
  const from = (page - 1) * limit
  const to = from + limit - 1

  try {

    const supabase = await createSupabase()

    // count: 'exact' 옵션으로 전체 데이터 개수를 함께 가져옴
    const { error, data, count } = await supabase
      .from(DB_NAME)
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    const totalCount = count ?? 0
    const totalPages = Math.ceil(totalCount / limit)

    return {
      success: true,
      data: {
        items: (data as Memo[]) ?? [],
        totalCount,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
      }
    }
  } catch(error) {
    console.error(`${DB_NAME} 페이지네이션 실패:`, getErrorMessage(error))
    return { success: false, error: '페이지 데이터를 불러오지 못했습니다.' }
  }
}

/**
 * [READ] 제목 또는 내용에 검색어가 포함된 메모를 찾습니다.
 * @param search - 검색 키워드
 * @param order - 정렬 순서 (desc: 최신순, asc: 오래된순)
 */
export const searchMemoAction = async (search: string, order: 'desc' | 'asc' = 'desc'): Promise<ActionResponse<Memo[]>> => {
  const trimmedSearch = search.trim()

  try {
    const supabase = await createSupabase()
    let query = supabase.from(DB_NAME).select('*')
  
    // 검색어가 있는 경우에만 필터 조건 추가
    if (trimmedSearch.length > 0) {
      const searchTerm = `%${trimmedSearch}%`
      // title 또는 content 컬럼 중 하나라도 포함되면 결과에 포함 (OR 조건)
      query = query.or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`)
    }

    const { error, data } = await query.order('created_at', { ascending: order === 'asc' })

    if (error) throw error

    return { success: true, data: data as Memo[] }
  } catch(error) {
    console.error(`${DB_NAME} 검색 실패 ("${trimmedSearch}"):`, getErrorMessage(error))
    return { success: false, error: '검색 중 오류가 발생했습니다.' }
  }
}

/**
 * [UPDATE] 기존 메모의 내용을 수정합니다.
 * @param id - 수정할 메모의 고유 ID
 * @param formData - 수정할 제목과 내용이 담긴 폼 데이터
 */
export const updateMemoAction = async (id: Memo['id'], formData: FormData): Promise<ActionResponse<Memo>> => {
  
  // 사용자 입력 가져오기
  const title = formData.get('title')?.toString().trim()
  const content = formData.get('content')?.toString().trim()

  // 유효성 검사 (사용자 실수: 예상 가능한 오류는 return으로 처리)
  if (!id) return { success: false, error: '수정할 메모 ID가 필요합니다.' }
  if (!title || !content) return { success: false, error: '메모 제목과 내용 모두 입력해야 합니다.' }

  try {

    // 비즈니스 로직 및 DB 작업 (예상치 못한 오류가 발생할 수 있는 구간)
    const updateMemo: MemoUpdate = {
      title,
      content,
      updated_at: new Date().toISOString() // 수정 시각 명시적 업데이트
    }
    
    const supabase = await createSupabase()

    const { error, data } = await supabase
      .from(DB_NAME)
      .update(updateMemo)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error

    // 데이터가 변경되었으므로 관련 페이지 캐시 무효화
    revalidatePath(REVALIDATE_PATH)

    return { success: true, data: data as Memo }
  } catch(error) {
    console.error(`${DB_NAME} 수정 실패:`, getErrorMessage(error))
    return { success: false, error: '메모 데이터 수정에 실패했습니다.' }
  }
}

/**
 * [DELETE] 특정 메모를 삭제합니다.
 * @param id - 삭제할 메모의 고유 ID
 */
export const deleteMemoAction = async (id: Memo['id']): Promise<ActionResponse<null>> => {
  
  // 유효성 검사 (사용자 실수: 예상 가능한 오류는 return으로 처리)
  if (!id) return { success: false, error: '삭제할 ID가 필요합니다.' }

  try {
    
    const supabase = await createSupabase()

    const { error } = await supabase
      .from(DB_NAME)
      .delete()
      .eq('id', id)

    if (error) throw error    

    // 삭제 후 목록 페이지 갱신
    revalidatePath(REVALIDATE_PATH)

    return { success: true, data: null }
  } catch(error) {
    console.error(`${DB_NAME} 삭제 실패:`, getErrorMessage(error))
    return { success: false, error: '메모 데이터 삭제에 실패했습니다.' }
  }
}