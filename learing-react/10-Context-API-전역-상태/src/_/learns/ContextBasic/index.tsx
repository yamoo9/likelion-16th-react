import { useState } from 'react'

import { FamilyContext } from '@/contexts/FamilyContext/context'
import GrandFather from './parts/GrandFather'
import S from './style.module.css'

// --------------------------------------------------------------------------

export default function ContextBasic() {
  const [name, setName] = useState('박하루')
  const [email, setEmail] = useState('haru@child.family')
  const [checked, setChecked] = useState(false)
  
  // 3. 컨텍스트 프로바이더를 통해 컨텍스트 값 공급하기
  const familyContextValue = {
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
