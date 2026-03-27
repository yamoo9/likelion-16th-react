import { createContext, useState, type Dispatch, type SetStateAction } from 'react'

import GrandFather from './parts/GrandFather'
import S from './style.module.css'

// 컨텍스트 데이터(값) 타입 정의
export interface FamilyContextValue {
  // 상태
  name: string
  email: string
  checked: boolean

  // 액션(함수)
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setChecked: Dispatch<SetStateAction<boolean>>
}

// 리액트 컨텍스트 생성
// eslint-disable-next-line react-refresh/only-export-components
export const FamilyContext = createContext<FamilyContextValue|undefined>(undefined)

export default function ContextBasic() {
  const [name, setName] = useState('박하루')
  const [email, setEmail] = useState('haru@child.family')
  const [checked, setChecked] = useState(false)

  const familyContextValue: FamilyContextValue = {
    name, email, checked,
    setName, setEmail, setChecked
  }

  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      {/* 컨텍스트 공급자(Context.Provider) : 데이터(값) 공급 */}
      <FamilyContext.Provider value={familyContextValue}>
        <GrandFather />
      </FamilyContext.Provider>
    </section>
  )
}
