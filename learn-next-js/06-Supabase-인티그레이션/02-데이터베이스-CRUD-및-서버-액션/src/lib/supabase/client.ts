import { createBrowserClient } from "@supabase/ssr"
import { supabaseConfig } from "./config"

/**
 * [클라이언트 전용] Supabase 클라이언트 생성 함수
 * 
 * 사용처:
 * - 파일 상단에 'use client'가 선언된 클라이언트 컴포넌트
 * 
 * 특징:
 * - 브라우저 환경에서 작동하며, 브라우저의 쿠키를 자동으로 사용하여 세션을 관리합니다.
 * - 서버 사이드 렌더링(SSR) 시에도 안전하게 호출됩니다. (그래서 import 'client-only' 사용하면 안됨)
 * - 실시간 구독(Realtime), 소셜 로그인(OAuth) 등 브라우저 이벤트가 필요한 경우 사용합니다.
 */
export function createClient() {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.key)
}