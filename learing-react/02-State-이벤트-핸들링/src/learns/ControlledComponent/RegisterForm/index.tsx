import { useState, type ChangeEvent, type InputEvent } from 'react'
import S from './style.module.css'

// (리액트에 의해) 제어된 컴포넌트 (Controlled Component)
// (리액트에 의해) 제어되지 않은 컴포넌트 (Uncontrolled Component)

const REG_EMAIL_CHECK = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function RegisterForm() {
  // 폼 제출 핸들러 작성
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault() // 브라우저 기본 작동 방지

    // form 요소 참조
    const formElement = e.currentTarget
    // formData 객체 생성
    const formData = new FormData(formElement)

    // formData 객체의 get() 메서드 사용해서 사용자 입력 값을 가져올 수 있음
    // const username = formData.get('username')
    // const useremail = formData.get('useremail')
    // console.log(username, useremail)

    // Object.fromEntries() 메서드를 사용해 폼 데이터를 일반 객체화
    const { username, useremail } = Object.fromEntries(formData)
    console.log(username, useremail)

    // 사용자 입력 값을 서버에 전송 (서버에서 응답 받아 화면에 표시)
    // ...
  }

  // 리액트에 의해 제어되지 않는 방식으로 핸들링
  // - 리액트를 사용하지 않고, 전통적인 웹 표준 방식으로 제어하는 것.
  // - 명령적 프로그래밍 방식
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUncontrolled = (e: InputEvent<HTMLInputElement>) => {
    // 개발자가 타입스크립트에게 해당 타입을
    // 확신을 가지고 단언(assertion)해야 한다.
    //
    // 타입스크립트야.
    // input은 EventTarget이 맞는데
    // 더 정확히 말하면 'HTMLInputElement'란다.
    const { value } = e.target as HTMLInputElement
    const trimedValue = value.trim()

    if (trimedValue.length < 2) {
      console.warn('이름 값은 2글자 이상 입력해야 해요!')
    }

    const output = document.querySelector('.' + S.preview + ' span')
    if (output) output.textContent = trimedValue
  }

  // 리액트에 의해 제어되는 방식으로 핸들링
  // - 리액트에 의해 제어된다는 말의 의미는 [ State ]가 필요하다.
  // - 공식 문서의 제목: "State를 사용해 Input 다루기"

  // 상태(State) 선언 (선언적 프로그래밍 방식)
  // - 사용자의 이름, 이메일 등 제어할 것을 상태로 선언한다.

  // 사용자 이름, 이메일 State 선언
  const [username, setUsername] = useState('')
  const [useremail, setUseremail] = useState('')

  const handleControlled = (e: ChangeEvent<HTMLInputElement>) => {
    // 사용자의 입력 값 정리
    const { value } = e.target // 타입스크립트가 제대로 대상의 타입 파악!

    // 유효성 검사
    const trimedValue = value.trim()

    if (trimedValue.length < 2) {
      console.warn('이름 값은 2글자 이상 입력해야 해요!')
    }

    // 리액트가 제어하는 State에 의해 화면 업데이트 됨
    // 리액트로 하여금 화면을 업데이트 하도록 하려면?
    // [ State 업데이트 ] 해야 한다.
    // 상태 업데이트 (리액트에 요청)
    setUsername(trimedValue)
  }

  return (
    <form className={S.form} onSubmit={handleSubmit}>
      <div className={S.field}>
        <label htmlFor="username" className={S.label}>
          이름
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className={S.input}
          placeholder="이름을 입력해주세요."
          // 리액트에 의해 제어되지 않는 방식
          // onInput={handleUncontrolled}

          // 리액트에 의해 제어되는 방식
          value={username}
          onChange={handleControlled}
        />
        {/* 조건부 렌더링 "username 상태 값의 길이(lengh)가 2보다 작다면 오류 메시지를 표시하라." */}
        {username.length < 2 && (
          <span role="alert" className={S.errorMessage}>
            이름 값은 2글자 이상 입력해야 해요!
          </span>
        )}
      </div>

      <div className={S.field}>
        <label htmlFor="useremail" className={S.label}>
          이메일
        </label>
        <input
          id="useremail"
          name="useremail"
          type="email"
          className={S.input}
          placeholder="user@company.io"
          // 리액트에 의해 제어됨
          value={useremail}
          onChange={(e) => {
            const { value } = e.target
            const trimedValue = value.trim()
            setUseremail(trimedValue)
          }}
        />
        {/* 이메일 유효성 검사 */}
        {REG_EMAIL_CHECK.test(useremail) || (
          <span role="alert" className={S.errorMessage}>
            유효한 이메일이 아닙니다.
          </span>
        )}
      </div>

      <button type="submit" className={S.button}>
        제출
      </button>

      <p className={S.preview}>
        {/* 리액트에 의해 제어되는 방식 (선언된 상태(데이터)를 JSX에 바인딩) */}
        출력될 이름: {username}
        {/* 전통적인 웹 표준 방식 (DOM을 통해 요소에 접근/조작) */}
        {/* 출력된 이름: <span>이름 데이터</span> */}
      </p>
    </form>
  )
}
