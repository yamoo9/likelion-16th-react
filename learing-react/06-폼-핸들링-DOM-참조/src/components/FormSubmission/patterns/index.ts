
// 비속어 정규식 패턴
export const PROFANITY_PATTERN = '바보 멍청이 또라이'.split(' ').join('|')
export const PROFANITY_SUBSTITUTION = '???'

// 이메일 정규식 패턴
export const EMAIL_PATTERN = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'

// 패스워드 정규식 패턴
export const PW_PATTERN = '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'