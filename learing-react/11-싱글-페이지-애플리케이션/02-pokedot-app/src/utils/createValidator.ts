/**
 * [고차 함수: createValidator]
 * 공통적인 유효성 검사 흐름(필수 값 체크, 터치 여부 확인)을 자동화하고, 
 * 실제 검증 로직(customValidator)만 주입받아 새로운 검증 함수를 생성합니다.
 * 
 * @template T - 커스텀 검증 함수가 추가로 받을 인자들의 타입 (배열 형태)
 * @param {string} requiredMessage - 값이 비어있을 때 표시할 에러 메시지
 * @param {CustomValidator<T>} customValidator - 실제 유효성 검증 로직을 담은 함수
 * 
 * @returns {ResultValidator<T>} 
 * [에러메시지, 에러표시여부]를 반환하는 완성된 검증 함수
 */
export function createValidator<T extends Args = []>(
  requiredMessage: string,
  customValidator: CustomValidator<T>,
): ResultValidator<T> {
  
  // 클로저를 통해 requiredMessage와 customValidator를 기억하는 새로운 함수를 반환합니다.
  return (value, isTouched, ...args) => {
    // 1. 아직 입력창을 건드리지 않았다면 에러를 보여주지 않습니다.
    if (!isTouched) return ['', false]

    // 2. 필수 값이 누락되었다면 설정된 공통 메시지를 반환합니다.
    if (!value) return [requiredMessage, true]

    // 3. 주입받은 커스텀 로직을 실행하여 구체적인 에러를 체크합니다.
    const error = customValidator(value, ...args)
    
    // 4. 에러 메시지가 비어있지 않다면(error !== '') 에러가 있는 것으로 간주합니다.
    const showError = error !== ''
    
    // readonly 튜플 형태로 반환하여 외부에서 값을 수정하지 못하게 보호합니다.
    return [error, showError] as const
  }
}
