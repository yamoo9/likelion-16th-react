// -----------------------------------------------------------
// `T extends unknown[] = []` 해설
// -----------------------------------------------------------
// T : 타입을 나중에 정할 수 있는 상자
// extends unknown[] : (제약조건) 이 상자는 무조건 배열만 들어올 수 있음
// = [] : (기본값) 상자에 아무 것도 안들어오면 빈 배열을 기본값으로 사용
// -----------------------------------------------------------
// 추가로 받을 인자들의 타입(T)을 정해줘. 단, 무조건 배열 형태여야 해!
// 만약 아무것도 안 적으면 추가 인자가 없는 것([])으로 칠게.
// -----------------------------------------------------------

// 유효성 검사 함수에 전달될 인자 타입
type Args = unknown[]

// 사용자 정의 유효성 검사 함수 타입
type CustomValidator<T extends Args = []> = (
  value: string, // 검사할 값
  ...args: T     // 추가 인자 배열
) => string      // 검사 결과 반환 값

// createValidator 함수의 반환값 타입
type ResultValidator<T extends Args = []> = (
  value: string,                // 검사할 값
  isTouched: boolean,           // 사용자 터치 여부
  ...args: T                    // 추가 인자 배열
) => readonly [string, boolean] // [error, showError] 튜플 반환

export function createValidator<T extends Args = []>(
  requiredMessage: string,
  customValidator: CustomValidator<T>,
): ResultValidator<T> {
  return (value, isTouched, ...args) => {
    if (!isTouched) return ['', false]
    if (!value) return [requiredMessage, true]
    const error = customValidator(value, ...args)
    const showError = error !== ''
    return [error, showError]
  }
}
