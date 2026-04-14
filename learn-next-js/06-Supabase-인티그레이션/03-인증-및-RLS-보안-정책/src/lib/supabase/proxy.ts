import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

// 환경 변수에서 Supabase 접속 정보 가져오기 (!는 반드시 존재한다는 의미)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

/**
 * 이 함수는 프로젝트 루트의 proxy.ts에서 호출되어 사용자의 '로그인 세션'을 유지시키는 역할을 합니다.
 * 브라우저와 Supabase 사이에서 쿠키를 주고받는 "중계소"라고 생각하면 쉽습니다.
 */
export const createClient = (request: NextRequest) => {
  
  // 1. 우선 사용자의 요청을 그대로 다음 단계로 넘기는 기본 응답 객체를 만듭니다.
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Supabase 서버 클라이언트를 생성합니다. (쿠키 제어권 부여)
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      // [읽기] 브라우저가 보낸 모든 쿠키를 Supabase가 읽을 수 있게 해줍니다.
      getAll() {
        return request.cookies.getAll()
      },
      // [쓰기] Supabase가 세션 연장 등을 위해 쿠키를 새로 구워주면(갱신하면) 실행됩니다.
      setAll(cookiesToSet) {
        // (A) 현재 요청(Request) 객체에 쿠키를 심어줍니다. (서버 내부용)
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        )
        
        // (B) 새로운 응답 객체를 생성하여 변경된 쿠키를 반영합니다.
        supabaseResponse = NextResponse.next({
          request,
        })
        
        // (C) 최종적으로 브라우저(Client)에게 "이 쿠키 저장해!"라고 응답에 담아 보냅니다.
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // [디버깅용] 세션이 있는지 확인하는 로그
  ;(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('현재 세션 유효 여부:', !!session)
  })()

  /**
   * 중요: 여기서 반환하는 것은 'supabase' 객체가 아니라 'supabaseResponse'입니다.
   * 즉, 쿠키가 최신화된 "응답(Response)"을 반환하여 Proxy가 이를 브라우저에 전달하게 합니다.
   */
  return supabaseResponse
}
