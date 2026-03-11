import React, { useState } from 'react'
import S from './style.module.css'

// User 인터페이스
interface User {
  id: string
  name: string
  role: '어드민' | '마스터' | '프로' | '아마추어' | '게스트'
  age: number
}

// 사용자(user) 생성
const userHan: User = {
  id: 'user-akxci',
  name: '한주혁',
  role: '프로',
  age: 32,
}

const userPack: User = {
  id: 'user-cskes',
  name: '박거상',
  role: '아마추어',
  age: 43,
}

const userJee: User = {
  id: 'user-ciske',
  name: '지상준',
  age: 25,
  role: '어드민',
}

// User 집합(그룹): User[] or Array<User>
const INITIAL_USERS: User[] = [userHan, userPack, userJee]

export default function Reconciliation() {
  // User[] 타입을 사용하는 상태(데이터) 선언
  const [users, setUsers] = useState(INITIAL_USERS)

  const handleShuffle = () => {
    console.log('사용자 순서 섞기')
    const nextUsers = [...users].sort(() => Math.random() - 0.5)
    setUsers(nextUsers) // 유저 셔플링
  }

  return (
    <section className={S.container}>
      <h2 className={S.title}>재조정 및 Key</h2>

      <button type="button" className={S.shuffleButton} onClick={handleShuffle}>
        사용자 순서 섞기
      </button>

      {/* 리스트 렌더링(List Rendering) */}
      <ul className={S.list} style={{ marginBlockStart: 12 }}>
        {users.map((/* user */ { id, name }) => {
          // destructuring assignment
          // 비구조화 할당
          // 구조 분해 할당 (MDN)
          // const { id, name, age, role } = user

          return (
            <li key={id} className={S.item}>
              <label htmlFor={id} className={S.label}>
                {name} 메모
              </label>
              <input
                id={id}
                type="text"
                className={S.inputField}
                placeholder="내용을 작성해주세요."
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}