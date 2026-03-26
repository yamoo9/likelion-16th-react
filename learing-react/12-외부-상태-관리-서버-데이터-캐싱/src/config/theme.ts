/**
 * [테마 설정 저장 키: THEME_KEY]
 * 사용자의 테마 설정(light, dark, system)을 브라우저에 저장할 때 사용하는 식별자입니다.
 * 
 * @example
 * localStorage.setItem(THEME_KEY, JSON.stringify('dark'))
 * const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY) || '"system"')
 */
export const THEME_KEY = '@pokedot/theme'