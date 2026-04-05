import { useCallback, useRef, useState } from 'react'

/** [타입 정의] input과 textarea 요소 모두에 대응할 수 있도록 타입을 통합합니다. */
type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement

/**
 * [커스텀 훅: useInput]
 * 입력 폼(input, textarea)의 상태 관리와 주요 메서드(focus, reset 등)를 통합 제공합니다.
 * 
 * @template T - HTMLInputElement 또는 HTMLTextAreaElement
 * @param {string} initialValue - 초기 입력값 (기본값: '')
 * 
 * @example
 * const { props, methods } = useInput<HTMLInputElement>();
 * 
 * // 스프레드 연산자로 한 번에 주입 가능!
 * <input {...props} placeholder="이름을 입력하세요" />
 * 
 * <button onClick={methods.reset}>초기화</button>
 */
export function useInput<T extends InputOrTextarea>(initialValue = '') {
  // DOM 요소에 직접 접근하기 위한 Ref (focus, select 등에 사용)
  const ref = useRef<T>(null)
  
  // 입력값을 관리하는 상태
  const [value, setValue] = useState(initialValue)

  // 값이 변경될 때 실행될 핸들러 (useCallback으로 최적화)
  const onChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value)
  }, [])

  // 주요 제어 메서드들
  // - reset: 초기값으로 되돌리기
  const reset = useCallback(() => setValue(initialValue), [initialValue])
  
  // - focus: 해당 입력창에 포커스 주기
  const focus = useCallback(() => ref.current?.focus(), [])

  // - select: 입력된 텍스트 전체 선택하기
  const select = useCallback(() => ref.current?.select(), [])

  return { 
    /** 
     * [props 객체] 
     * 엘리먼트에 직접 전달할 속성들입니다. 
     * <input {...props} /> 와 같이 사용하면 코드가 매우 간결해집니다.
     */
    props: { ref, value, onChange }, 
    
    /** 
     * [methods 객체] 
     * 입력창을 수동으로 제어할 때 사용하는 함수들입니다.
     */
    methods: { reset, focus, select, setValue } 
  }
}
