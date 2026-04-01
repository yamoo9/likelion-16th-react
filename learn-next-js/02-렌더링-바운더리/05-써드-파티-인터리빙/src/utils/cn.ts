import { clsx } from 'clsx'
import { twMerge } from 'tw-merge'

/**
 * Tailwind CSS 클래스를 조건부로 결합하고,  
 * 중복된 클래스를 스마트하게 병합하는 유틸리티 함수
 * 
 * 1. clsx: 조건부 클래스 결합 (예: { 'bg-red-500': true, 'p-4': false } -> 'bg-red-500')
 * 2. twMerge: Tailwind 클래스 우선순위 해결 (예: 'p-2 p-4' -> 'p-4')
 * 
 * @param inputs - 결합할 클래스 문자열, 배열, 또는 객체 (clsx가 허용하는 모든 타입)
 * @returns 중복이 제거되고 병합된 최종 클래스 문자열
 * 
 * @example
 * // 1. 기본적인 클래스 결합
 * cn('px-2 py-1', 'bg-blue-500') // => 'px-2 py-1 bg-blue-500'
 * 
 * // 2. 조건부 클래스 사용
 * const isActive = true;
 * cn('base-style', isActive && 'active-style', !isActive && 'hidden') // => 'base-style active-style'
 * 
 * // 3. Tailwind 클래스 충돌 해결 (뒤에 오는 클래스가 우선순위를 가짐)
 * cn('p-2', 'p-4') // => 'p-4' (p-2는 제거됨)
 * 
 * // 4. 객체 형태의 조건부 클래스
 * cn({ 'bg-red-500': true, 'text-white': false }) // => 'bg-red-500'
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  // clsx로 먼저 클래스들을 합친 뒤, twMerge로 Tailwind 전용 병합 처리를 수행합니다.
  return twMerge(clsx(...inputs))
}