import { createClient } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

/**
 * [Next.js 16 Proxy 함수]
 * 사용자가 페이지에 접속할 때 가장 먼저 실행되는 '보초' 역할을 합니다.
 * 모든 요청을 가로채서 로그인 세션을 체크하고 쿠키를 업데이트합니다.
 */
export async function proxy(request: NextRequest) {
  
  // 1. 우리가 미리 만들어둔 lib/supabase/proxy.ts의 로직을 실행합니다.
  // 2. 이 과정에서 브라우저 쿠키를 읽고, 필요하다면 Supabase 세션을 연장합니다.
  // 3. 최종적으로 '최신 쿠키 정보'가 담긴 응답(Response) 객체를 받아 반환합니다.
  return createClient(request)
}

/**
 * [Proxy 설정 (Matcher)]
 * 어떤 주소로 접속했을 때 이 proxy를 실행할지 결정합니다.
 * 성능을 위해 불필요한 파일(이미지, 아이콘 등) 요청은 제외하고 실제 페이지 요청만 가로챕니다.
 */
export const config = {
  matcher: [
    /*
     * 아래 경로들을 제외한 모든 경로에서 proxy를 실행합니다.
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - 각종 이미지 확장자 (svg, png, jpg 등)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
