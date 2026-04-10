/**
 * [타입 가드: isErrorObject]
 * 전달받은 객체가 JavaScript의 표준 Error 인스턴스인지 확인합니다.
 * TypeScript에서 catch 문의 error(unknown) 타입을 안전하게 좁히는 데 사용됩니다.
 *
 * @param error - 검사할 대상 (보통 catch 문의 인자)
 * @returns 대상이 Error 객체이면 true, 아니면 false를 반환하며 타입을 Error로 확정(Narrowing)합니다.
 *
 * @example
 * // 1. try-catch 문에서의 표준적인 활용
 * try {
 *   throw new Error('문제가 발생했습니다!')
 * } catch (err) {
 *   if (isErrorObject(err)) {
 *     // 이 블록 안에서 err는 Error 타입으로 추론되어 .message에 안전하게 접근 가능합니다.
 *     console.error(err.message)
 *   } else {
 *     // 에러가 문자열이거나 다른 형태일 경우에 대한 처리
 *     console.error('알 수 없는 에러 발생', String(err))
 *   }
 * }
 *
 * @example
 * // 2. 필터링 로직에서의 활용
 * const results = [new Error('에러1'), { data: '성공' }, new Error('에러2')]
 * const onlyErrors = results.filter(isErrorObject) // Error[] 타입으로 추출됨
 */
export const isErrorObject = (error: unknown): error is Error => {
  return error instanceof Error
}
