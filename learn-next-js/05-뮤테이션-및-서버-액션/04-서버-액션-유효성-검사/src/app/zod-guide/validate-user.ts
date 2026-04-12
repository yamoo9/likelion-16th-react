interface UserValid {
  name: string
  age: number
  email: string
  phoneNumber: string
  github: string
  role: string
}

/**
 * Vanilla JS 검증의 한계점
 * - 가독성 저하 : 필드가 많아질수록 if 조건문이 기하급수적으로 늘어납니다.
 * - 타입 불일치 : 자바스크립트 검증은 통과해도, 이후 코드에서 이 데이터가 어떤 타입인지 TypeScript가 자동으로 알지 못합니다.
 * - 재사용성 부족 : 이메일이나 전화번호 검증 로직을 매번 함수 내부에 작성하거나 별도의 유틸리티 함수로 분리해야 하는 번거로움이 있습니다.
 */
export const validateUser = <T extends UserValid>(user: T) => {
  const errors: string[] = []

  // 이름 검증 (문자열, 2자 이상)
  if (typeof user.name !== 'string' || user.name.length < 2) {
    errors.push('이름은 2글자 이상의 문자열이어야 합니다.')
  }

  // 나이 검증 (숫자, 양수, 19-59 사이 값)
  if (typeof user.age !== 'number' || Number.isNaN(user.age)) {
    errors.push('나이는 number 타입이어야 하고 NaN은 허용되지 않습니다.')
  } else if (user.age <= 0) {
    errors.push('나이는 0보다 큰 숫자여야 합니다.')
  } else if (user.age < 19) {
    errors.push('나이는 19세 이상이어야 합니다.') 
  } else if (user.age >= 60) {
    errors.push('나이는 59세 이하여야 합니다.')
  }

  // 이메일 검증 (정규표현식)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(user.email)) {
    errors.push('유효한 이메일 형식이 아닙니다.')
  }

  // 전화번호 검증 (정규표현식)
  const phoneRegex = /^010-\d{4}-\d{4}$/
  if (!phoneRegex.test(user.phoneNumber)) {
    errors.push('전화번호 형식이 올바르지 않습니다. (예: 010-0000-0000)')
  }

  // 깃허브 URL 검증
  if (!user.github.startsWith('https://')) {
    errors.push('GitHub 주소는 https://로 시작해야 합니다.')
  }

  // 역할(Role) 검증 (Enum 흉내)
  const validRoles = ['admin', 'member', 'guest']
  if (!validRoles.includes(user.role)) {
    errors.push('권한은 admin, member, guest 중 하나여야 합니다.')
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors
    }
  }

  return {
    success: true,
    data: user,
    errors,
  }
}
