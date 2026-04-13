'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

const DB_NAME = 'memolist'

export type Memo = {
  id: string
  created_at: string
  updated_at: string
  title: string
  content: string
}

// [READ]
export const readMemoAction = async (): Promise<Memo[]> => {
  // 쿠키 스토어 가져오기
  const cookieStore = await cookies()
  // SupabaseClient 인스턴스 생성 (서버용)
  const supabase = createClient(cookieStore)
  // 데이터베이스에서 데이터 가져오기
  const { error, data } = await supabase
    .from(DB_NAME)
    .select()
    .order('created_at', { ascending: false }) // 최신순 정렬

  if (error) {
    throw new Error(`${DB_NAME} 데이터 가져오기 실패:`, error)
  }

  return data
}

// [CREATE]
export const createMemoAction = async () => {}

// [UPDATE]
export const updateMemoAction = async () => {}

// [DELETE]
export const deleteMemoAction = async () => {}
