import { createBrowserClient } from '@supabase/ssr'
import { supabaseConfig } from './config'

// 브라우저용 Supabase Client 객체 생성 함수
// 브라우저에 이미 쿠키가 설정되어 있어, 별도로 쿠키 설정 없어도 됨
export const createClient = () => {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.key)
}
