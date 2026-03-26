/**
 * 가변 인자 처리를 위한 기본 타입
 */
type Args = unknown[]

/**
 * 사용자가 직접 작성할 커스텀 검증 로직 함수의 타입
 * @param value - 검증할 입력 값
 * @param args - 추가로 필요한 인자들 (예: 비밀번호 확인 시 비밀번호 원본 등)
 * @returns 에러 메시지 문자열 (에러가 없으면 빈 문자열 '')
 * 
 * @example
 * const emailCheck: CustomValidator = (value) => 
 *   value.includes('@') ? '' : '이메일 형식이 올바르지 않습니다.'
 * 
 * @example
 * const passwordMatch: CustomValidator<[string]> = (value, target) => 
 *   value === target ? '' : '비밀번호가 일치하지 않습니다.'
 */
export type CustomValidator<T extends Args = []> = (
  value: string,
  ...args: T
) => string

/**
 * createValidator가 최종적으로 반환하는 함수의 타입
 * @returns [에러메시지, 에러표시여부] 형태의 읽기 전용 튜플
 * 
 * @example
 * const [message, showError] = validator(value, isTouched, ...args)
 */
export type ResultValidator<T extends Args = []> = (
  value: string,
  isTouched: boolean,
  ...args: T
) => readonly [string, boolean]

/**
 * [고차 함수: createValidator]
 * 공통적인 유효성 검사 흐름(필수 값 체크, 터치 여부 확인)을 자동화하고, 
 * 실제 검증 로직(customValidator)만 주입받아 새로운 검증 함수를 생성합니다.
 * 
 * @template T - 커스텀 검증 함수가 추가로 받을 인자들의 타입 (배열 형태)
 * @param requiredMessage - 값이 비어있을 때 표시할 에러 메시지
 * @param customValidator - 실제 유효성 검증 로직을 담은 함수
 * 
 * @example
 * // 1. 단순 검증 (추가 인자 없음)
 * const validateEmail = createValidator(
 *   '이메일을 입력해주세요.',
 *   (value) => value.includes('@') ? '' : '올바른 형식이 아닙니다.'
 * );
 * const [msg, show] = validateEmail(email, touched);
 * 
 * @example
 * // 2. 복합 검증 (추가 인자 필요)
 * const validateConfirm = createValidator<[string]>(
 *   '비밀번호 확인을 입력해주세요.',
 *   (value, password) => value === password ? '' : '비밀번호가 다릅니다.'
 * );
 * const [msg, show] = validateConfirm(confirmValue, touched, passwordValue)
 */
export function createValidator<T extends Args = []>(
  requiredMessage: string,
  customValidator: CustomValidator<T>,
): ResultValidator<T> {
  return (value, isTouched, ...args) => {
    // 아직 입력창을 건드리지 않았다면 에러를 보여주지 않습니다.
    if (!isTouched) return ['', false] as const

    // 필수 값이 누락되었다면 설정된 공통 메시지를 반환합니다.
    if (!value || value.trim() === '') return [requiredMessage, true] as const

    // 주입받은 커스텀 로직을 실행하여 구체적인 에러를 체크합니다.
    const error = customValidator(value, ...args)

    // 에러 메시지가 비어있지 않다면 에러가 있는 것으로 간주합니다.
    const showError = error !== ''

    return [error, showError] as const
  }
}