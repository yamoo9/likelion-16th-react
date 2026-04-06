'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * [1] 태그 기반 정밀 재검증 (On-demand Tag Revalidation)
 * 특정 태그가 부여된 fetch 요청만 선택적으로 무효화합니다.
 * Next.js 15/16에서는 두 번째 인자로 캐시 프로필(Profile)을 명시할 수 있습니다.
 */
export async function revalidatePokemonTag() {
  // 'pokemons' 태그를 가진 모든 데이터 캐시를 즉시 무효화
  revalidateTag('pokemons', 'default')

  return { 
    success: true, 
    timestamp: Date.now(),
    message: '태그 기반 캐시가 성공적으로 무효화되었습니다.' 
  }
}

/**
 * [2] 경로 기반 전체 재검증 (Path Revalidation)
 * 특정 URL 경로에 포함된 모든 데이터와 페이지 레이아웃 캐시를 무효화합니다.
 * 해당 페이지의 모든 fetch 요청이 다음 접속 시 새로 수행됩니다.
 */
export async function revalidatePokemonPath() {
  revalidatePath('/time-based-revalidation')
  
  console.log('[/time-based-revalidation] 경로의 모든 캐시가 무효화되었습니다.')
  return { success: true }
}

/**
 * [3] 하이브리드 재검증 (Hybrid Revalidation)
 * 경로(Path)와 태그(Tag)를 동시에 무효화하여 데이터 일관성을 극대화합니다.
 * 시간 기반(ISR)으로 작동 중인 페이지를 수동으로 즉시 갱신할 때 가장 확실한 방법입니다.
 * 
 * @param path 무효화할 페이지 경로
 * @param tag  무효화할 데이터 태그
 */
export async function revalidateHybrid(path: string, tag: string) {
  // 1. 페이지 전체 레이아웃 및 정적 결과물 갱신
  revalidatePath(path)
  
  // 2. 페이지 내 특정 API 데이터(태그) 정밀 갱신
  revalidateTag(tag, 'default')
  
  console.log(`[Hybrid] Path: ${path}, Tag: ${tag} 재검증 완료`);
  return { success: true, timestamp: Date.now() }
}