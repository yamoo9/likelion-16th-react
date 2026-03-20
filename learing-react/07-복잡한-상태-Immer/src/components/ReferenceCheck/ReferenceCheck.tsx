/* eslint-disable react-hooks/immutability */
import { useState } from 'react'
import S from './ReferenceCheck.module.css'

const INITIAL_USER = {
  name: '이두나',
  age: 21,
  profile: {
    city: '서울',
    postcode: '014572',
  },
}

type User = typeof INITIAL_USER

export default function ReferenceCheck() {
  const [user, setUser] = useState<User>({
    ...INITIAL_USER,
    profile: {
      ...INITIAL_USER.profile,
    },
  })

  const handleWrongUpdate = () => {
    // ❌ Mutation: 데이터는 바뀌지만 참조가 같음
    user.name = '강하영 (변경됨)'
    user.profile.postcode = '91920 (변경됨)'

    const nextUser = user
    setUser(nextUser)

    console.error('뮤테이션')
    console.table(nextUser)
  }

  const handleRightUpdate = () => {
    // ✅ Immutability: 새로운 객체 생성 (새로운 참조 주소)

    const nextUser: User = {
      ...user, // 객체의 속성을 전개 (객체 합성)
      name: '주성천 (변경됨)',
      profile: {
        ...user.profile,
        city: '부산 (변경됨)',
      },
    }

    setUser(nextUser)

    console.log('%c✅ 불변성 유지:', 'color: #04a200;')
    console.table(nextUser)
  }

  const handleReset = () => {
    // ⚠️ Mutation: 예상치 못한 결과 확인(참조형 데이터 오염)
    // console.warn('참조형 데이터 오염')
    setUser({
      ...INITIAL_USER,
      profile: {
        ...INITIAL_USER.profile,
      },
    })
  }

  return (
    <div className={S.container}>
      <section className={S.card}>
        <header className={S.header}>
          <h2 className={S.title}>참조형 데이터 업데이트</h2>
          <p className={S.description}>
            불변성을 지켰을 때만 화면이 반응합니다.
          </p>
        </header>

        <div className={S.content}>
          <dl className={S.infoBox}>
            <div className={S.infoRow}>
              <dt className={S.label}>이름</dt>
              <dd className={`${S.value} ${S.valueActive}`}>{user.name}</dd>
            </div>
            <div className={S.infoRow}>
              <dt className={S.label}>나이</dt>
              <dd className={S.value}>{user.age}세</dd>
            </div>
            <div className={S.infoRow}>
              <dt className={S.label}>도시</dt>
              <dd className={S.badge}>{user.profile.city}</dd>
            </div>
            <div className={S.infoRow}>
              <dt className={S.label}>우편번호</dt>
              <dd className={S.value}>{user.profile.postcode}</dd>
            </div>
          </dl>
        </div>

        <footer className={S.footer}>
          <div className={S.buttonGroup}>
            <button
              type="button"
              className={`${S.btn} ${S.btnWrong}`}
              onClick={handleWrongUpdate}
            >
              직접 수정
            </button>
            <button
              type="button"
              className={`${S.btn} ${S.btnRight}`}
              onClick={handleRightUpdate}
            >
              새 객체 생성
            </button>
            <button
              type="button"
              className={`${S.btn} ${S.btnReset}`}
              onClick={handleReset}
            >
              초기화
            </button>
          </div>
          <p className={S.helperText}>
            * 직접 수정 후 새 객체 생성을 눌러 변화를 비교해보세요.
          </p>
        </footer>
      </section>
    </div>
  )
}
