/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ChangeEvent } from 'react'
import S from './style.module.css'

const REG_EMAIL_CHECK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function RegisterForm() {
  // 리액트에 화면을 그리도록 요청하기 위해 상태 선언
  const [formState, setFormState] = useState({
    name: '지훈',
    email: 'yamoo9@naver.com',
    job: '강사',
    location: '서울',
    hobby: ['강의'],
  })

  // 폼 상태 데이터를 업데이트할 수 있는 단 하나의 핸들러 함수 활용
  const handleChangeFormState = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // set 함수 사용법 
    // 방법 1. nextState 값으로 설정하기
    // setFormState({
    //   ...formState,
    //   [name]: value.trim(),
    // })

    // 방법 2. 업데이트 함수 사용해 이전 값으로 기반으로 상태 값 설정하기
    setFormState((formState) => ({
      ...formState,
      [name]: value.trim(),
    }))

  }

  // 폼 상태의 개별 속성을 제어하는 핸들러 함수 작성 예시
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const nextFormState = {
      ...formState,
      name: value.trim(),
    }

    setFormState(nextFormState)
  }

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    const nextFormState = {
      ...formState,
      email: value.trim(),
    }

    setFormState(nextFormState)
  }

  return (
    <form className={S.form} onSubmit={(e) => e.preventDefault()}>
      <div className={S.field}>
        <label htmlFor="username" className={S.label}>
          이름
        </label>
        <input
          id="username"
          name="name"
          type="text"
          className={S.input}
          placeholder="이름을 입력해주세요."
          value={formState.name}
          onChange={handleChangeFormState}
        />
      </div>

      <div className={S.field}>
        <label htmlFor="useremail" className={S.label}>
          이메일
        </label>
        <input
          id="useremail"
          name="email"
          type="email"
          className={S.input}
          placeholder="user@company.io"
          value={formState.email}
          onChange={handleChangeFormState}
        />
      </div>

      <button type="submit" className={S.button}>
        제출
      </button>

      <p className={S.preview}>
        <b>폼 데이터</b>: {formState.name} / {formState.email}
      </p>
    </form>
  )
}
