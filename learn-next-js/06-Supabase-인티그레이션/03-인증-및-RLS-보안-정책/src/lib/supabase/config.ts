
/**
 * 환경 변수 설정
 * ! 연산자는 해당 변수가 반드시 존재함을 의미합니다. (설정 누락 시 런타임 에러 발생)
 */

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
}