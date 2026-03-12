import { useState, type SubmitEvent } from 'react'
import type { ResetEvent } from '@/types'
import S from './style.module.css'

// 인터페이스(Interface) = 객체 형태의 타입 선언

// 타입 별칭(Type Alias)
type UserRole = 'user' | 'admin' | ''

export default function UserForm() {
  console.log('UserForm 렌더링')

  // [상태] 사용자 이름
  const [name, setName] = useState('')
  // [상태] 이메일
  const [email, setEmail] = useState('')
  // [상태] 역할
  const [role, setRole] = useState<UserRole>('')

  const userRoleKR = role === 'admin' ? '관리자' : '일반 사용자'

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('사용자가 입력한 폼 데이터 확인')

    // [리액트에 의해 제어되지 않는 상황]
    // 브라우저에 의해 제어되고 있는 네이티브 컨트롤의 경우
    // 브라우저의 폼 데이터 객체를 통해 확인
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    console.log(Object.fromEntries(formData))

    // [리액트에 의해 제어되는 상황]
    // 제어되고 있는 컨트롤(입력 필드, 셀렉트 박스)에 연결된 상태 값을 확인
    console.log({ name, email, role })
  }

  const handleReset = (e: ResetEvent) => {
    console.log('사용자가 입력한 폼 데이터 초기화')

    // [리액트에 의해 제어되지 않는 상황]
    // 브라우저에 의해 제어되고 있는 네이티브 컨트롤의 경우
    // 브라우저의 기본 초기화 기능으로 처리 가능
    const formElement = e.currentTarget
    formElement.reset()

    // [리액트에 의해 제어되는 상황]
    // 제어되고 있는 컨트롤(입력 필드, 셀렉트 박스)의 초기값을 리액트의 방식으로 처리
    setName('')
    setEmail('')
    setRole('')
  }

  return (
    <form className={S.container} onSubmit={handleSubmit} onReset={handleReset}>
      <fieldset>
        <legend>사용자 정보 입력</legend>

        {/* `이름` 입력 필드 */}
        <div className={S.fieldGroup}>
          <label htmlFor="username">이름</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            id="username"
            placeholder="예: 황주연"
          />
        </div>

        {/* `이메일` 입력 필드 */}
        <div className={S.fieldGroup}>
          <label htmlFor="useremail">이메일</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            id="useremail"
            placeholder="예: react@learing.dev"
          />
        </div>

        {/* `역할` 셀렉트 메뉴 */}
        <div className={S.fieldGroup}>
          <label htmlFor="userrole">역할</label>
          <select
            name="role"
            id="userrole"
            value={role}
            onChange={(e) => {
              const value = e.target.value as UserRole
              setRole(value)
            }}
          >
            <option value="">역할을 선택하세요.</option>
            <option value="user">일반 사용자</option>
            <option value="admin">관리자</option>
          </select>
        </div>

        <div
          // hidden
          role="group"
          style={{ marginBlockStart: 8, display: 'flex', gap: 8 }}
        >
          <button type="submit">제출</button>
          <button type="reset">초기화</button>
        </div>
      </fieldset>

      <output className={S.preview}>
        <strong>현재 입력 값:</strong> {name || '없음'} / {email || '없음'} (
        {userRoleKR})
      </output>
    </form>
  )
}
