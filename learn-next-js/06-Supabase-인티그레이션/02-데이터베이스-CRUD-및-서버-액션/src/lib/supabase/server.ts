import 'server-only'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseConfig } from './config'

/**
 * [서버 전용] Supabase 클라이언트 생성 함수
 * 
 * 사용처: 
 * 1. 서버 컴포넌트 (Server Components)
 * 2. 서버 액션 (Server Actions)
 * 3. 라우트 핸들러 (Route Handlers / API)
 * 
 * 특징:
 * - Next.js의 `cookies` API를 사용하여 사용자의 인증 상태(세션)를 유지합니다.
 * - 서버 측에서 DB에 직접 접근하거나 인증 상태를 확인할 때 사용합니다.
 */
export async function createClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(supabaseConfig.url, supabaseConfig.key, {
    cookies: {
      // 모든 쿠키를 가져와서 Supabase 클라이언트에 전달 (인증 유지용)
      getAll() {
        return cookieStore.getAll()
      },
      // Supabase가 쿠키를 설정해야 할 때(로그인 등) 호출됨
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          /**
           * [중요] 서버 컴포넌트(Server Component) 내에서는 쿠키를 직접 수정할 수 없습니다.
           * 하지만 Server Actions나 Route Handlers에서는 정상적으로 작동하므로 
           * 에러를 무시하도록 처리하여 범용적으로 사용합니다.
           */
        }
      },
    },
  })
}

/**
 * [쿠키 정보 요약]
 *   쿠키 - 브라우저 저장되는 '사용자를 증명하는 메모'
 *   클라이언트 - 메모를 보관함에 넣고 서버에 갈 때마다 자동으로 꺼내 보여줌
 *   서버 - 메모를 읽어서 사용자를 알아보고, 필요하면 새 메모를 써줌
 *   코드의 목적 - 서버가 브라우저인 척 수동으로 보관함을 뒤져(getAll) 
 *              Supabase에게 사용자가 보낸 메모야, 데이터 주렴 말하기 위함
 * 
 * 
 * [쿠키란 무엇인가요?]
 * 
 * - 서버가 사용자를 기억하기 위해 사용자의 브라우저에 저장해두는 작은 메모장
 * 
 * - 식당 방문 (예시)
 *   1. 처음 방문 - 점원은 여러분이 누구인지 모름 (로그인 안 된 상태)
 *   2. 주문 후 - 점원이 여러분을 '3번' 테이블로 안내 (쿠키 발급)
 *   3. 다시 주문 - 점원이 테이블 번호를 보고 바로 알아챔 (쿠키 전송)
 * 
 * 
 * [클라이언트와 서버 사이에서 어떻게 움직이나요?]
 * 
 * - 서버 -> 클라이언트 (Set-Cookie)
 *   로그인 성공 시, 서버는 응답에 쿠키를 동봉해 보냄
 *   서버: '로그인 성공! 여기 session_id=abc123 쿠키를 보낼께. 네 브라우저에 잘 보관해'
 * 
 * - 클라이언트 -> 서버 (Cookie Header)
 *   브라우저는 해당 서버에 요청을 보낼 때마다, 보관함에서 쿠키를 꺼내 자동 추가
 *   브라우저: '서버님, session_id=abc123 쿠키 정보 여기 있어요. 저 누군지 아시죠?'
 * 
 * 
 * [Next.js(Supabase) 코드에서 왜 복잡하게 설정하나요?]
 * - Next.js의 App Router 방식이 독특하기 때문
 *   
 * - 서버 컴포넌트의 상황
 *   서버 컴포넌트는 '서버 안에서 이미 모든 요리를 다 해서 브라우저로 보내주는 방식'
 *   브라우저가 아직 편지를 받기 전이라도, 서버 안에서 스스로 쿠키를 읽고(getAll) 써야(setAll) 함
 *   하지만 서버 컴포넌트는 읽기 전용 성격이 강해서, 요리 도중 손님 팔찌(쿠키)를 새로 채워주는 것(setAll)이 금지됨
 *   그래서 코드에 try...catch로 에러를 무시하는 부분이 포함된 것
 * 
 * - 클라이언트 컴포넌트의 상황
 *   브라우저가 이미 켜져 있는 상태
 *   브라우저는 똑똑해서 '쿠키 보관함'을 스스로 관리함.
 *   그래서 사용자가 복잡하게 getAll, setAll을 코딩할 필요 없이 
 *   createBrowserClient 한 줄이면 끝나는 것.
 */