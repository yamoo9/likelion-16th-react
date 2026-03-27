import { createContext, useState } from 'react'

import GrandFather from './parts/GrandFather'
import S from './style.module.css'

// 2. 컨텍스트 값 타입 정의하기
interface FamilyContextValue {
  name: string
  email: string
  checked: boolean
  setName: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

// --------------------------------------------------------------------------
// 코드 작성 흐름
// --------------------------------------------------------------------------
// 1. 컨텍스트 생성하기
// 2. 컨텍스트 값 타입 정의하기
// 3. 컨텍스트 프로바이더를 통해 컨텍스트 값 공급하기
// 4. 컨텍스트를 통해 컨텍스트 값 꺼내쓰기
// --------------------------------------------------------------------------


// 1. 컨텍스트 생성하기
export const FamilyContext = createContext<FamilyContextValue|null>(null)


// --------------------------------------------------------------------------

export default function ContextBasic() {
  const [name, setName] = useState('박하루')
  const [email, setEmail] = useState('haru@child.family')
  const [checked, setChecked] = useState(false)
  
  // 3. 컨텍스트 프로바이더를 통해 컨텍스트 값 공급하기
  const familyContextValue: FamilyContextValue = {
    name, email, checked,
    setName, setEmail, setChecked
  }

  return (
    <FamilyContext.Provider value={familyContextValue}>
      <section className={`${S.box} ${S.container}`}>
        <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
          <GrandFather />
      </section>
    </FamilyContext.Provider>
  )
}
