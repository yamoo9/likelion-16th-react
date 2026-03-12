/* eslint-disable @typescript-eslint/no-unused-vars */

import { useId } from 'react'
import S from '../SmartForm.module.css'

const MAX_NICKNAME = 10
const PROFANITY_PATTERN = '바보 멍청이 또라이'.split(' ').join('|')
const PROFANITY_SUBSTITUTION = '???'

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function NicknameField(props: Props) {
  const fieldId = useId()

  const handleChange = () => {
  
    // TODO 1: [글자 수 제한] 
    // 입력값이 MAX_NICKNAME을 넘으면 잘라내고 리턴하세요.

    // TODO 2: [조합 중(IME) 처리]
    // 한글이 조립 중(isComposing)일 때는 필터링을 건너뛰고 상태만 업데이트하세요.

    // TODO 3: [영문/숫자/조합 완료 시 필터링]
    // replace와 정규식을 사용해 비속어를 '??'로 치환하세요.

  }

  const handleCompositionEnd = () => {
    // TODO 4: [최종 확정 필터링]
    // 한글 조합이 완전히 끝나는 시점에 다시 한번 비속어를 걸러주세요.
  }

  return (
    <div className={S.field}>
      <div className={S.labelWrapper}>
        <label htmlFor={fieldId} className={S.label}>닉네임</label>
        <span className={S.counter}>{/* 입력 글자 */''.length}/{MAX_NICKNAME}</span>
      </div>
      <input
        id={fieldId}
        className={S.input}
        placeholder="닉네임을 입력하세요"
      />
    </div>
  )
}
