import 'server-only'
import { type SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createClient } from './server'

/**
 * Supabase Client 생성 헬퍼 함수 (서버용)
 * @returns {SupabaseClient} Supabase Client 인스턴스
 */
export const createSupabase = async (): Promise<SupabaseClient> => {
  const cookieStore = await cookies()
  return createClient(cookieStore)
}
