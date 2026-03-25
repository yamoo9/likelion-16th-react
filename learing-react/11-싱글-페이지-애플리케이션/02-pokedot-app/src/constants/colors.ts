/**
 * [포켓몬 속성별 컬러 매핑: COLORS]
 * 각 속성(Type)에 해당하는 CSS 변수명을 매핑한 객체입니다.
 * 
 * - 'as const': 이 객체의 값들이 단순한 string이 아니라, 
 *   정해진 '리터럴 값'임을 선언하여 타입 추론을 엄격하게 만듭니다.
 * - CSS 변수 사용: 실제 색상값(#ffffff 등) 대신 var(--)를 사용하여 
 *   다크모드 대응이나 테마 변경이 용이하도록 설계되었습니다.
 */
export const COLORS = {
  불꽃: 'var(--color-type-fire)',
  물: 'var(--color-type-water)',
  풀: 'var(--color-type-grass)',
  전기: 'var(--color-type-electric)',
  노말: 'var(--color-type-normal)',
  비행: 'var(--color-type-flying)',
  독: 'var(--color-type-poison)',
  땅: 'var(--color-type-ground)',
  에스퍼: 'var(--color-type-psychic)',
  벌레: 'var(--color-type-bug)',
  바위: 'var(--color-type-rock)',
  격투: 'var(--color-type-fighting)',
  고스트: 'var(--color-type-ghost)',
  얼음: 'var(--color-type-ice)',
  드래곤: 'var(--color-type-dragon)',
  강철: 'var(--color-type-steel)',
  페어리: 'var(--color-type-fairy)',
  어둠: 'var(--color-type-dark)',
} as const

/**
 * [컬러 타입 정의: Colors]
 * COLORS 객체의 키(Key)들인 '불꽃', '물' 등을 추출하여 타입으로 만듭니다.
 * 이렇게 하면 새로운 속성이 추가되어도 타입이 자동으로 업데이트됩니다.
 */
export type Colors = keyof typeof COLORS

/**
 * [속성별 색상 추출 함수: getTypeColor]
 * 포켓몬의 속성을 입력받아 그에 맞는 CSS 컬러 변수를 반환합니다.
 * 
 * @param type - 포켓몬 속성 (예: '불꽃')
 * @returns 해당 속성의 CSS 변수명 (없을 경우 기본 회색 반환)
 */
export const getTypeColor = (type: Colors) => COLORS[type] || 'var(--color-gray-500)'