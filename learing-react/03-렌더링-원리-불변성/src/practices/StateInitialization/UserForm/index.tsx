import { useState } from 'react'
import S from './style.module.css'

// 인터페이스(Interface) = 객체 형태의 타입 선언

// 타입 별칭(Type Alias)
type UserRole = 'user' | 'admin' | ''

export default function UserForm() {
  // 사용자 이름(name), 이메일(email), 역할(role)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('')

  const userRoleKR = role === 'admin' ? '관리자' : '일반 사용자'

  return (
    <form className={S.container} onSubmit={(e) => e.preventDefault()}>
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
      </fieldset>

      <output className={S.preview}>
        <strong>현재 입력 값:</strong> {name || '없음'} / {email || '없음'} (
        {userRoleKR})
      </output>
    </form>
  )
}
